from confluent_kafka import Consumer, KafkaException
from pytube import YouTube
import os


def download_youtube_video(url, save_path='.'):
    try:
        # Создание объекта YouTube
        yt = YouTube(url)

        # Получение видео с наивысшим разрешением
        video = yt.streams.get_highest_resolution()

        # Скачивание видео
        video.download(save_path)

        print(f'Видео "{yt.title}" успешно скачано и сохранено в "{save_path}"')
    except Exception as e:
        print(f'Произошла ошибка: {e}')


def consume_from_kafka(topic, bootstrap_servers, group_id, save_path='.'):
    # Конфигурация Kafka Consumer
    conf = {
        'bootstrap.servers': bootstrap_servers,
        'group.id': group_id,
        'auto.offset.reset': 'earliest'
    }

    consumer = Consumer(conf)

    # Подписка на топик
    consumer.subscribe([topic])

    try:
        while True:
            msg = consumer.poll(timeout=1.0)
            if msg is None:
                continue
            if msg.error():
                if msg.error().code() == KafkaError._PARTITION_EOF:
                    continue
                else:
                    print(msg.error())
                    break

            # Получение URL из сообщения Kafka
            url = msg.value().decode('utf-8')
            print(f'Получен URL: {url}')

            # Скачивание видео
            download_youtube_video(url, save_path)
    except KeyboardInterrupt:
        pass
    finally:
        consumer.close()


# Параметры подключения к Kafka и топик
topic = 'download-video-topic'
bootstrap_servers = 'kafka:9092'
group_id = 'youtube-downloader-group'
save_path = '/path/to/save'  # Замените на ваш путь сохранения

consume_from_kafka(topic, bootstrap_servers, group_id, save_path)