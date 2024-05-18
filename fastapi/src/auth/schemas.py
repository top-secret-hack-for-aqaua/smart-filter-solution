
from datetime import datetime
from pydantic import BaseModel, PositiveInt, field_validator, EmailStr, UUID4



class UserBase(BaseModel):
    email: EmailStr
    full_name: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: UUID4

    class Config:
        orm_mode = True
        from_attributes = True



class UserRegister(UserBase):
    password: str
    confirm_password: str
    class Config:
        orm_mode = True
        from_attributes = True


class UserLogin(BaseModel):
    email: EmailStr
    password: str

    class Config:
        orm_mode = True
        from_attributes = True


class JwtTokenSchema(BaseModel):
    token: str
    payload: dict
    expire: datetime

    class Config:
        orm_mode = True
        from_attributes = True



class TokenPair(BaseModel):
    access: JwtTokenSchema
    refresh: JwtTokenSchema

    class Config:
        orm_mode = True
        from_attributes = True




class RefreshToken(BaseModel):
    refresh: str

    class Config:
        orm_mode = True
        from_attributes = True

class AccessToken(BaseModel):
    access: str

    class Config:
        orm_mode = True
        from_attributes = True
class SuccessResponseScheme(BaseModel):
    msg: str

    class Config:
        orm_mode = True
        from_attributes = True


class BlackListToken(BaseModel):
    id: UUID4
    expire: datetime

class Children(BaseModel):
    id : UUID4 = None
    name: str

    class Config:
        orm_mode = True
        from_attributes = True
