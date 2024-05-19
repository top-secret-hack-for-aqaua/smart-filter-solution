import uuid

from src.auth.core.hash import verify_password
from src.database import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from sqlalchemy.sql import expression
from sqlalchemy.ext.compiler import compiles
from sqlalchemy.types import DateTime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, ForeignKey, UniqueConstraint


class utcnow(expression.FunctionElement):
    type = DateTime()
    inherit_cache = True


@compiles(utcnow, "postgresql")
def pg_utcnow(element, compiler, **kw):
    return "TIMEZONE('utc', CURRENT_TIMESTAMP)"


class User(Base):
    __tablename__ = "users"
    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True, index=True, default=uuid.uuid4
    )
    email: Mapped[str] = mapped_column(unique=True, index=True)
    full_name: Mapped[str]
    password: Mapped[str]
    is_active: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[datetime] = mapped_column(server_default=utcnow())
    updated_at: Mapped[datetime] = mapped_column(
        server_default=utcnow(), server_onupdate=utcnow(), onupdate=utcnow()
    )

    @classmethod
    async def find_by_email(cls, db: AsyncSession, email: str):
        query = select(cls).where(cls.email == email)
        result = await db.execute(query)
        return result.scalars().first()

    @classmethod
    async def authenticate(cls, db: AsyncSession, email: str, password: str):
        user = await cls.find_by_email(db=db, email=email)
        if not user or not verify_password(password, user.password):
            return False
        return user


class BlackListToken(Base):
    __tablename__ = "blacklisttokens"
    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True, index=True, default=uuid.uuid4
    )
    expire: Mapped[datetime]
    created_at: Mapped[datetime] = mapped_column(server_default=utcnow())


class Children(Base):
    __tablename__ = "childrens"
    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True, index=True, default=uuid.uuid4
    )

    parent_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), nullable=False)
    name: Mapped[str] = mapped_column(unique=True,index=True)
    created_at: Mapped[datetime] = mapped_column(server_default=utcnow())
    updated_at: Mapped[datetime] = mapped_column(
        server_default=utcnow(), server_onupdate=utcnow(), onupdate=utcnow()
    )


