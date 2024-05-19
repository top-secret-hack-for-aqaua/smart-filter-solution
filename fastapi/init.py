from fastapi.src.auth.models import Base as b1
from fastapi.src.video.models import Base as b2

b1.Base.metadata.create_all()
b2.Base.metadata.create_all()
print("Database created")