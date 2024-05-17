from kafka import KafkaProducer
import json


def send_message(topic, category, message):
    producer = KafkaProducer(
        bootstrap_servers='localhost:9092',
        value_serializer=lambda v: json.dumps(v).encode('utf-8')
    )

    message_with_category = {
        'category': category,
        'message': message
    }

    print("sending...")

    producer.send(topic, message_with_category)
    producer.flush()


if __name__ == "__main__":
    topic = 'my_topic'
    category = 'my_category'
    message = {'key': 'value'}

    send_message(topic, category, message)