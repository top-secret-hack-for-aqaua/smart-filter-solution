from kafka.errors import KafkaError
from kafka import KafkaConsumer
import time
import json

def consume_messages():
    try:
        consumer = KafkaConsumer(
            'video-topic',
            bootstrap_servers='kafka:9092',
            auto_offset_reset='earliest',
            enable_auto_commit=True,
            group_id='my-group',
            value_deserializer=lambda v: json.loads(v.decode('utf-8'))
        )
        for message in consumer:
            print(f"Received: {message.value}")
    except KafkaError as e:
        print(f"Kafka error: {e}")

if __name__ == "__main__":
    time.sleep(30)
    print("Ready to geting...")
    consume_messages()