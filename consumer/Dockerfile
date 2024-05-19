# consumer/Dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY consumer.py consumer.py

CMD ["python", "consumer.py"]