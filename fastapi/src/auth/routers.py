import uuid
from typing import Annotated
from datetime import datetime
from fastapi import status, APIRouter, HTTPException, Depends, BackgroundTasks, Response, Cookie
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import ValidationError

from src.dependencies import get_db, get_current_user, oauth2_scheme
from src.auth import schemas, models
from src.auth.core.hash import get_password_hash, verify_password
from src.auth.core.jwt import (
    create_token_pair,
    refresh_token_state,
    decode_access_token,
    add_refresh_token_cookie,
    SUB,
    JTI,
    EXP,
    JWTError,
)
from src.auth.exceptions import BadRequestException, NotFoundException, ForbiddenException

router = APIRouter(
    prefix="/auth", tags=["auth"]
)
#
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


@router.post("/register", response_model=schemas.User)
async def register(
    data: schemas.UserRegister,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    user = await models.User.find_by_email(db=db, email=data.email)
    if user:
        raise HTTPException(status_code=400, detail="Email has already registered")

    # hashing password
    user_data = data.dict(exclude={"confirm_password"})
    user_data["password"] = get_password_hash(user_data["password"])

    # save user to db
    user = models.User(**user_data)
    user.is_active = True
    await user.save(db=db)
    user_schema = schemas.User.from_orm(user)
    return user_schema



@router.post("/login")
async def login(

    data: schemas.UserLogin,
    response: Response,
    db: AsyncSession = Depends(get_db),

):
    user = await models.User.authenticate(
        db=db, email=data.email, password=data.password
    )

    if not user:
        raise BadRequestException(detail="Incorrect email or password")

    if not user.is_active:
        raise ForbiddenException()

    user = schemas.User.from_orm(user)

    token_pair = create_token_pair(user=user)

    add_refresh_token_cookie(response=response, token=token_pair.refresh.token)

    return {"token": token_pair.access.token}


@router.get("/refresh")
async def refresh(refresh: Annotated[str | None, Cookie()] = None):
    print(refresh)
    if not refresh:
        raise BadRequestException(detail="refresh token required")
    return refresh_token_state(token=refresh)





@router.post("/logout", response_model=schemas.SuccessResponseScheme)
async def logout(
    token: Annotated[str, Depends(oauth2_scheme)],
    db: AsyncSession = Depends(get_db),
):
    payload = await decode_access_token(token=token, db=db)
    black_listed = models.BlackListToken(
        id=payload[JTI], expire=datetime.utcfromtimestamp(payload[EXP])
    )
    await black_listed.save(db=db)

    return {"msg": "Succesfully logout"}



@router.get("/me", response_model=schemas.User)
async def me(
    token: Annotated[str, Depends(oauth2_scheme)],
    db: AsyncSession = Depends(get_db),
):
    token_data = await decode_access_token(token=token, db=db)
    return await models.User.find_by_id(db=db, id=token_data[SUB])

@router.post("/create_children", response_model=schemas.SuccessResponseScheme)
async def create_children(
        user: Annotated[schemas.User, Depends(get_current_user)],
        data: schemas.Children,
        db: AsyncSession = Depends(get_db),
):
    print(user)
    data = data.dict()
    data["parent_id"] = user.id
    children = models.Children(**data)
    children = await children.save(db=db)
    return schemas.SuccessResponseScheme(msg="Succesfully created children")

@router.get('/get_childrens_by_user', response_model=list[schemas.Children])
async def get_children(
        user: Annotated[schemas.User, Depends(get_current_user)],
        db: AsyncSession = Depends(get_db),
):


    childrens = await db.execute(
        select(models.Children)
        .where(models.Children.parent_id == user.id)
    )
    childrens_list = childrens.scalars().all()
    childrens_schema = []
    for children in childrens_list:
        childrens_schema.append(schemas.Children(id= children.id, name=children.name))
    return childrens_schema

@router.delete('/delete_children', response_model=schemas.SuccessResponseScheme)
async def delete_children(
        user: Annotated[schemas.User, Depends(get_current_user)],
        children_id: uuid.UUID,
        data: schemas.Children,
        db: AsyncSession = Depends(get_db),
):
    data = data.dict()
    data["parent_id"] = user.id
    children = models.Children.find_by_id(db=db, id=children_id).first()
    await children.save(db=db)
    children_schema = schemas.Children(**data)
    return children_schema