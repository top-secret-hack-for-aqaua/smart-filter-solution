from fastapi import FastAPI
from aiokafka import AIOKafkaConsumer as KafkaConsumer

app = FastAPI()

async def consume_messages():
    consumer = KafkaConsumer(
        bootstrap_servers=["localhost:9092"],
        group_id="my-group",
        topic="my-topic"
    )

    async for message in consumer:
        # Обработайте сообщение

        # Отправьте ответ (необязательно)
        # ...

    consumer.close()

@app.on_event("startup")
async def startup_event():
    await consume_messages()