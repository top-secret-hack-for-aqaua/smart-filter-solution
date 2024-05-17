from kafka import KafkaConsumer
import json


def consume_messages(topic, category):
    consumer = KafkaConsumer(
        topic,
        bootstrap_servers='localhost:9092',
        auto_offset_reset='earliest',
        enable_auto_commit=True,
        group_id='my-group',
        value_deserializer=lambda x: json.loads(x.decode('utf-8'))
    )

    print(f"Started consuming from topic: {topic}")

    for message in consumer:
        message_content = message.value
        print(f"Received raw message: {message_content}")
        if message_content['category'] == category:
            print(f"Processed message: {message_content['message']}")


if __name__ == "__main__":
    topic = 'my_topic'
    category = 'my_category'

    consume_messages(topic, category)