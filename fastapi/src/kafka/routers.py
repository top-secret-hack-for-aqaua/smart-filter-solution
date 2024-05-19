import json
import os

from fastapi.routing import APIRouter
from aiokafka import AIOKafkaConsumer as KafkaConsumer, AIOKafkaProducer

router = APIRouter(
    prefix="/kafka",
    tags=["kafka"],
)

kafka_bootstrap_servers = os.environ.get("KAFKA_BOOTSTRAP_SERVERS", "localhost:9092")
kafka_topic = os.environ.get("KAFKA_TOPIC", "download-video-topic")

# Создание экземпляра Kafka producer
producer = AIOKafkaProducer(
    bootstrap_servers=kafka_bootstrap_servers,
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)


# Подключение к Kafka
async def connect_to_kafka():
    await producer.start()


# Отключение от Kafka
async def disconnect_from_kafka():
    await producer.stop()


@router.post("/processing/")
async def send_to_kafka(key: str, value: str):
    # Отправка сообщения в Kafka
    await producer.send_and_wait(kafka_topic, key=key, value=value)
    return {"message": "Сообщение успешно отправлено в Kafka"}


@router.on_event("startup")
async def startup_event():
    await connect_to_kafka()


@router.on_event("shutdown")
async def shutdown_event():
    await disconnect_from_kafka()
