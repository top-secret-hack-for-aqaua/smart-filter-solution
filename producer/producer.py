import time
import uuid
from kafka import KafkaProducer
import json

urls_and_categories = [
    ["https://www.youtube.com/watch?v=SvmGs1C-7UA", "видеоигры"],
    ["https://www.youtube.com/watch?v=OH7j8SbgBJI", "настольные игры"],
    ["https://nuum.ru/clips/1935282--anime-khanigo-ne-zabud-postavit-laik-i-podpisatsia-bolshe-anime-na-https-nuum-ru-channel-sovetromantica", "аниме"],
    ["https://nuum.ru/videos/2111337-smeshariki-retsept-khoroshego-otdykha", "детские мультфильмы"],
    ["https://rutube.ru/yappy/78b6a459414c43a8b9361ee46deeecfa/?source=shorts&page=76", "фитнес"],
    ["https://rutube.ru/video/ea36695e3f3602b5ea5a92202d9dc220/", "музыка"],
    ["https://rutube.ru/video/0731b509a8d68d4dc539c3af8d776e66/", "детские мультфильмы"],
    ["https://www.youtube.com/watch?v=jfKfPfyJRdk", "музыка"],
    ["https://www.youtube.com/watch?v=cvARWC0TpqA", "аниме"],
    ["https://vk.com/video?q=влад%20бумага&z=video-81597813_456248317%2Fpl_cat_trends", "клоуны"],
    ["https://www.youtube.com/watch?v=e9Klt8BBpI8", "насилие"],
    ["https://www.youtube.com/watch?v=g_Qa1mfIO8U", "детские мультфильмы"],
    ["https://www.youtube.com/watch?v=wzLyUT3KCXI", "детские мультфильмы"],
    ["https://www.youtube.com/watch?v=OyUye9DkQN4", "взрослые мультфильмы"],
    ["https://www.youtube.com/watch?v=1FeoQS4b0v8", "взрослые мультфильмы"],
    ["https://www.youtube.com/shorts/61RmjMNFAAI", "казино"],
    ["https://www.youtube.com/shorts/dieB4hV0rt0", "танцы"],
    ["https://www.youtube.com/shorts/RMNjf0t5_y0", "наука"],
    ["https://www.youtube.com/shorts/C4DQgZ5B5Uk", "взрослое шоу"],
    ["https://www.youtube.com/shorts/Rt-M3JzoFTY", "насилие"],
    ["https://www.youtube.com/watch?v=OJfiesQBE_8&list=PLbRZPwhakfXuGpEsuWwwQoOtRKn1lPzX1", "обучение"]
]

def create_producer():
    return KafkaProducer(
        bootstrap_servers='kafka:9092',
        value_serializer=lambda v: json.dumps(v).encode('utf-8')
    )

def send_messages(producer, message=""):
    print(f"sending message: {message}")
    message_id = str(uuid.uuid4())
    message = {"message": message, "id": message_id}
    producer.send('video-topic', message)
    print(f"Sent: {message}")

if __name__ == "__main__":
    time.sleep(30)
    producer = create_producer()
    for row in urls_and_categories:
        send_messages(producer, row[0])
        time.sleep(2)
    producer.close()