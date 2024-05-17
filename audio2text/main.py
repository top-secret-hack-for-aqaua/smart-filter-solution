import speech_recognition as sr
from pydub import AudioSegment


def convert_mp3_to_wav(mp3_file_path, wav_file_path):
    # Конвертируем MP3 в WAV
    audio = AudioSegment.from_mp3(mp3_file_path)
    audio.export(wav_file_path, format="wav")


def transcribe_audio(wav_file_path):
    # Распознаем речь из WAV файла
    recognizer = sr.Recognizer()
    with sr.AudioFile(wav_file_path) as source:
        audio_data = recognizer.record(source)
        try:
            # Распознаем русский язык
            text = recognizer.recognize_google(audio_data, language="ru-RU")
            return text
        except sr.UnknownValueError:
            return "Не удалось распознать речь"
        except sr.RequestError:
            return "Ошибка запроса на распознавание"


def main():
    mp3_file_path = "input/file.mp3"  # Укажите путь к вашему MP3 файлу
    wav_file_path = "tmp/output.wav"  # Укажите путь для сохранения WAV файла

    # Конвертируем MP3 в WAV
    convert_mp3_to_wav(mp3_file_path, wav_file_path)

    # Распознаем текст из WAV файла
    text = transcribe_audio(wav_file_path)
    print("Распознанный текст:", text)


if __name__ == "__main__":
    main()
