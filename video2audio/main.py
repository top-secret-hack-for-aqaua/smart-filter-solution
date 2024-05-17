from moviepy.editor import VideoFileClip
from pydub import AudioSegment
import os


def extract_audio_from_video(video_path, output_dir, segment_duration=30):
    # Убедитесь, что выходной каталог существует
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Загрузка видео файла
    video = VideoFileClip(video_path)

    # Извлечение аудио
    audio = video.audio
    audio_path = os.path.join(output_dir, 'extracted_audio.mp3')
    audio.write_audiofile(audio_path, codec='mp3')

    # Загрузка аудио для разбиения на сегменты
    audio_segment = AudioSegment.from_file(audio_path)
    audio_length = len(audio_segment)  # Длина аудио в миллисекундах

    # Разбиение на сегменты
    for i in range(0, audio_length, segment_duration * 1000):
        segment = audio_segment[i:i + segment_duration * 1000]
        segment_path = os.path.join(output_dir, f'audio_segment_{i // 1000}.mp3')
        segment.export(segment_path, format='mp3')

    print("Аудио успешно извлечено и разбито на сегменты.")


# Пример использования функции
video_path = 'test.mp4'
output_dir = 'output_audio_segments'
extract_audio_from_video(video_path, output_dir)
