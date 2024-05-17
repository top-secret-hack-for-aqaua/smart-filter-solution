import cv2
import os
from skimage.metrics import structural_similarity as ssim


# Функция для извлечения значимых кадров из видео
def extract_significant_frames(video_path, output_dir, frame_skip=30, similarity_threshold=0.95):
    # Убедитесь, что выходной каталог существует
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Открываем видео файл
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        print("Error opening video stream or file")
        return

    # Инициализация переменных
    prev_frame = None
    frame_count = 0
    significant_frames = 0

    while True:
        # Пропускаем кадры
        for _ in range(frame_skip):
            ret, frame = cap.read()
            if not ret:
                break

        if not ret:
            break

        # Конвертируем кадр в серый
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Если это первый кадр, сохраняем его
        if prev_frame is None:
            prev_frame = gray_frame
            frame_path = os.path.join(output_dir, f'frame_{frame_count}.jpg')
            cv2.imwrite(frame_path, frame)
            significant_frames += 1
        else:
            # Вычисляем SSIM между текущим и предыдущим кадром
            similarity = ssim(prev_frame, gray_frame)
            if similarity < similarity_threshold:
                frame_path = os.path.join(output_dir, f'frame_{frame_count}.jpg')
                cv2.imwrite(frame_path, frame)
                significant_frames += 1
                prev_frame = gray_frame

        frame_count += 1

    # Закрываем видео файл
    cap.release()
    cv2.destroyAllWindows()

    print(f'Извлечено значимых кадров: {significant_frames}')


# Пример использования функции
video_path = 'input.mp4'
output_dir = 'output_frames'
extract_significant_frames(video_path, output_dir)
