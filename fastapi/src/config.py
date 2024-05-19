import os


SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "secretkey",
)
if not SECRET_KEY:
    SECRET_KEY = os.urandom(32)

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRES_MINUTES = 120
REFRESH_TOKEN_EXPIRES_MINUTES = 15 * 24 * 60  # 15 days

class PostgresAsyncConfig:

    POSTGRES_HOST = os.environ.get("POSTGRES_HOST", "127.0.0.1")
    POSTGRES_NAME = os.environ.get("POSTGRES_NAME", "")
    POSTGRES_USER = os.environ.get("POSTGRES_USER", "postgres")
    POSTGRES_PASSWORD = os.environ.get("POSTGRES_PASSWORD", "postgres")
    POSTGRES_PORT = os.environ.get("POSTGRES_PORT", "5432")


    @property
    def POSTGRES_URL(self):
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_NAME}"

postgres_async_config = PostgresAsyncConfig()