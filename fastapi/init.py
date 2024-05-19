from .auth.models import Base as b1
from .video.models import Base as b2

b1.Base.metadata.create_all()
b2.Base.metadata.create_all()