from typing import Any

from fastapi import HTTPException, status
from pydantic import PostgresDsn
from sqlalchemy import select, MetaData
from sqlalchemy.ext.asyncio import (
    AsyncAttrs,
    async_sessionmaker,
    create_async_engine,
    AsyncSession,
)
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import DeclarativeBase
# from .config import posgres_async_config

engine = create_async_engine(
    url="postgresql+asyncpg://postgres:postgres@127.0.0.1:5432",
    echo=True
)

SessionFactory = async_sessionmaker(engine, autoflush=False, expire_on_commit=False)

metadata = MetaData()


class Base(AsyncAttrs, DeclarativeBase):

    async def save(self, db: AsyncSession):
        """
        :param db:
        :return:
        """
        try:
            db.add(self)
            await db.commit()
            return self
        except SQLAlchemyError as ex:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=repr(ex)
            ) from ex



    @classmethod
    async def find_by_id(cls, db: AsyncSession, id: str):
        query = select(cls).where(cls.id == id)
        result = await db.execute(query)
        return result.scalars().first()
