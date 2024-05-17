# Video Hosting Application







# Solutions
## PHP based prcessing

Для реализации системы, в которой видео отправляются в очередь на обработку и отслеживается их статус, можно использовать такие инструменты, как очереди в Laravel (Queues) и события (Events). Вот как можно реализовать данную функциональность:

### Шаг 1: Настройка очередей в Laravel
1. Установите драйвер очереди, например, Redis:
```bash
composer require predis/predis
```

2. Настройте драйвер очереди в `.env` файле:
```env
QUEUE_CONNECTION=redis
```

3. Запустите Redis-сервер:
```bash
docker run --name some-redis -d redis
```

4. Запустите воркер для обработки очередей:
```bash
php artisan queue:work
```

### Шаг 2: Создание моделей и миграций для отслеживания статусов
1. Создайте модель и миграцию `VideoProcessingJob`:
```bash
php artisan make:model VideoProcessingJob -m
```

2. Отредактируйте миграцию:
```php
// database/migrations/xxxx_xx_xx_create_video_processing_jobs_table.php
public function up()
{
    Schema::create('video_processing_jobs', function (Blueprint $table) {
        $table->id();
        $table->foreignId('video_id')->constrained();
        $table->string('type');
        $table->string('status')->default('pending'); // pending, processing, completed, failed
        $table->text('output')->nullable();
        $table->timestamps();
    });
}
```

3. Запустите миграции:
```bash
php artisan migrate
```

### Шаг 3: Создание задач (Jobs) для обработки видео
1. Создайте задачи для обработки видео:
```bash
php artisan make:job ExtractAudio
php artisan make:job ExtractFrames
php artisan make:job DetectProfanity
php artisan make:job DetectProhibitedObjects
```

2. Реализуйте логику обработки в этих задачах. Пример для `ExtractAudio`:
```php
// app/Jobs/ExtractAudio.php
namespace App\Jobs;

use App\Models\Video;
use App\Models\VideoProcessingJob;
use FFMpeg;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class ExtractAudio implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $video;
    protected $processingJob;

    public function __construct(Video $video, VideoProcessingJob $processingJob)
    {
        $this->video = $video;
        $this->processingJob = $processingJob;
    }

    public function handle()
    {
        $this->processingJob->update(['status' => 'processing']);
        
        try {
            $ffmpeg = FFMpeg\FFMpeg::create();
            $video = $ffmpeg->open(storage_path('app/' . $this->video->path));
            $audioFormat = new FFMpeg\Format\Audio\Mp3();
            $audioPath = 'audio/' . $this->video->id . '.mp3';
            $video->save($audioFormat, storage_path('app/' . $audioPath));

            $this->processingJob->update([
                'status' => 'completed',
                'output' => $audioPath,
            ]);
        } catch (\Exception $e) {
            $this->processingJob->update([
                'status' => 'failed',
                'output' => $e->getMessage(),
            ]);
        }
    }
}
```

### Шаг 4: Создание контроллера для отправки видео на обработку
1. Создайте контроллер `VideoProcessingController`:
```bash
php artisan make:controller VideoProcessingController
```

2. Реализуйте методы для отправки видео на обработку:
```php
// app/Http/Controllers/VideoProcessingController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Video;
use App\Models\VideoProcessingJob;
use App\Jobs\ExtractAudio;
use App\Jobs\ExtractFrames;
use App\Jobs\DetectProfanity;
use App\Jobs\DetectProhibitedObjects;

class VideoProcessingController extends Controller
{
    public function processVideo(Request $request, Video $video)
    {
        $jobs = [
            'extract_audio' => ExtractAudio::class,
            'extract_frames' => ExtractFrames::class,
            'detect_profanity' => DetectProfanity::class,
            'detect_prohibited_objects' => DetectProhibitedObjects::class,
        ];

        foreach ($jobs as $type => $jobClass) {
            $processingJob = VideoProcessingJob::create([
                'video_id' => $video->id,
                'type' => $type,
                'status' => 'pending',
            ]);

            $jobClass::dispatch($video, $processingJob);
        }

        return response()->json(['message' => 'Video processing started'], 200);
    }

    public function getProcessingStatus(Video $video)
    {
        $processingJobs = VideoProcessingJob::where('video_id', $video->id)->get();

        return response()->json($processingJobs, 200);
    }
}
```

### Шаг 5: Настройка маршрутов
1. Добавьте маршруты для обработки видео и получения статуса:
```php
// routes/web.php
use App\Http\Controllers\VideoProcessingController;

Route::post('/videos/{video}/process', [VideoProcessingController::class, 'processVideo']);
Route::get('/videos/{video}/status', [VideoProcessingController::class, 'getProcessingStatus']);
```

### Шаг 6: Интеграция с фронтендом
1. В шаблоне для загрузки видео добавьте кнопку для запуска обработки:
```blade
<!-- resources/views/livewire/upload-video.blade.php -->
<div>
    <form wire:submit.prevent="upload">
        <input type="text" wire:model="title" placeholder="Video Title">
        @error('title') <span class="error">{{ $message }}</span> @enderror
        <input type="file" wire:model="video">
        @error('video') <span class="error">{{ $message }}</span> @enderror
        <button type="submit">Upload Video</button>
    </form>
    @if (session()->has('message'))
        <div>{{ session('message') }}</div>
    @endif
</div>
```

2. Добавьте кнопку для запуска обработки видео:
```blade
<!-- resources/views/livewire/video-grid.blade.php -->
<div>
    @foreach ($videos as $video)
        <div>
            <a href="{{ route('view-video', $video->id) }}">
                <video width="320" height="240" controls>
                    <source src="{{ Storage::url($video->path) }}" type="video/mp4">
                </video>
                <p>{{ $video->title }}</p>
            </a>
            <button onclick="processVideo({{ $video->id }})">Process Video</button>
        </div>
    @endforeach
</div>

<script>
    function processVideo(videoId) {
        fetch(`/videos/${videoId}/process`, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': '{{ csrf_token() }}',
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
        });
    }
</script>
```

### Заключение
С этими шагами вы сможете отправлять видео на обработку в очередь, отслеживать статус обработки и получать результаты. Эта система может быть расширена и адаптирована в зависимости от ваших потребностей, включая добавление новых типов обработки или более сложную логику обработки.

## Py REST service processing

Понял, для интеграции Python-сервисов с Laravel можно использовать очереди и API-запросы. Вот примерный подход к реализации вашего видеохостингового приложения с обработкой видео на Python-сервисах.

### Шаг 1: Настройка очередей в Laravel

1. Установите драйвер очереди, например, Redis:
```bash
composer require predis/predis
```

2. Настройте драйвер очереди в `.env` файле:
```env
QUEUE_CONNECTION=redis
```

3. Запустите Redis-сервер:
```bash
docker run --name some-redis -d redis
```

4. Запустите воркер для обработки очередей:
```bash
php artisan queue:work
```

### Шаг 2: Создание моделей и миграций для отслеживания статусов

1. Создайте модель и миграцию `VideoProcessingJob`:
```bash
php artisan make:model VideoProcessingJob -m
```

2. Отредактируйте миграцию:
```php
// database/migrations/xxxx_xx_xx_create_video_processing_jobs_table.php
public function up()
{
    Schema::create('video_processing_jobs', function (Blueprint $table) {
        $table->id();
        $table->foreignId('video_id')->constrained();
        $table->string('type');
        $table->string('status')->default('pending'); // pending, processing, completed, failed
        $table->text('output')->nullable();
        $table->timestamps();
    });
}
```

3. Запустите миграции:
```bash
php artisan migrate
```

### Шаг 3: Создание задач (Jobs) для обработки видео

1. Создайте задачи для обработки видео:
```bash
php artisan make:job ProcessVideoJob
```

2. Реализуйте логику отправки запроса на Python-сервис в задаче `ProcessVideoJob`:
```php
// app/Jobs/ProcessVideoJob.php
namespace App\Jobs;

use App\Models\Video;
use App\Models\VideoProcessingJob;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Http;

class ProcessVideoJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $video;
    protected $processingJob;

    public function __construct(Video $video, VideoProcessingJob $processingJob)
    {
        $this->video = $video;
        $this->processingJob = $processingJob;
    }

    public function handle()
    {
        $this->processingJob->update(['status' => 'processing']);

        try {
            $response = Http::post('http://python-service-url/api/process', [
                'video_path' => storage_path('app/' . $this->video->path),
                'type' => $this->processingJob->type,
            ]);

            if ($response->successful()) {
                $this->processingJob->update([
                    'status' => 'completed',
                    'output' => $response->body(),
                ]);
            } else {
                $this->processingJob->update([
                    'status' => 'failed',
                    'output' => $response->body(),
                ]);
            }
        } catch (\Exception $e) {
            $this->processingJob->update([
                'status' => 'failed',
                'output' => $e->getMessage(),
            ]);
        }
    }
}
```

### Шаг 4: Создание контроллера для отправки видео на обработку

1. Создайте контроллер `VideoProcessingController`:
```bash
php artisan make:controller VideoProcessingController
```

2. Реализуйте методы для отправки видео на обработку:
```php
// app/Http/Controllers/VideoProcessingController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Video;
use App\Models\VideoProcessingJob;
use App\Jobs\ProcessVideoJob;

class VideoProcessingController extends Controller
{
    public function processVideo(Request $request, Video $video)
    {
        $jobs = [
            'extract_audio' => 'extract_audio',
            'extract_frames' => 'extract_frames',
            'detect_profanity' => 'detect_profanity',
            'detect_prohibited_objects' => 'detect_prohibited_objects',
        ];

        foreach ($jobs as $type => $jobType) {
            $processingJob = VideoProcessingJob::create([
                'video_id' => $video->id,
                'type' => $type,
                'status' => 'pending',
            ]);

            ProcessVideoJob::dispatch($video, $processingJob);
        }

        return response()->json(['message' => 'Video processing started'], 200);
    }

    public function getProcessingStatus(Video $video)
    {
        $processingJobs = VideoProcessingJob::where('video_id', $video->id)->get();

        return response()->json($processingJobs, 200);
    }
}
```

### Шаг 5: Настройка маршрутов

1. Добавьте маршруты для обработки видео и получения статуса:
```php
// routes/web.php
use App\Http\Controllers\VideoProcessingController;

Route::post('/videos/{video}/process', [VideoProcessingController::class, 'processVideo']);
Route::get('/videos/{video}/status', [VideoProcessingController::class, 'getProcessingStatus']);
```

### Шаг 6: Интеграция с фронтендом

1. В шаблоне для загрузки видео добавьте кнопку для запуска обработки:
```blade
<!-- resources/views/livewire/upload-video.blade.php -->
<div>
    <form wire:submit.prevent="upload">
        <input type="text" wire:model="title" placeholder="Video Title">
        @error('title') <span class="error">{{ $message }}</span> @enderror
        <input type="file" wire:model="video">
        @error('video') <span class="error">{{ $message }}</span> @enderror
        <button type="submit">Upload Video</button>
    </form>
    @if (session()->has('message'))
        <div>{{ session('message') }}</div>
    @endif
</div>
```

2. Добавьте кнопку для запуска обработки видео:
```blade
<!-- resources/views/livewire/video-grid.blade.php -->
<div>
    @foreach ($videos as $video)
        <div>
            <a href="{{ route('view-video', $video->id) }}">
                <video width="320" height="240" controls>
                    <source src="{{ Storage::url($video->path) }}" type="video/mp4">
                </video>
                <p>{{ $video->title }}</p>
            </a>
            <button onclick="processVideo({{ $video->id }})">Process Video</button>
        </div>
    @endforeach
</div>

<script>
    function processVideo(videoId) {
        fetch(`/videos/${videoId}/process`, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': '{{ csrf_token() }}',
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
        });
    }
</script>
```

### Шаг 7: Настройка Python-сервисов

1. Реализуйте API для обработки видео в вашем Python-сервисе. Пример для Flask:
```python
# app.py
from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route('/api/process', methods=['POST'])
def process_video():
    data = request.json
    video_path = data['video_path']
    process_type = data['type']

    # Реализуйте логику обработки видео здесь
    if process_type == 'extract_audio':
        # Ваш код для извлечения аудио
        pass
    elif process_type == 'extract_frames':
        # Ваш код для извлечения значимых кадров
        pass
    elif process_type == 'detect_profanity':
        # Ваш код для поиска матов в аудио
        pass
    elif process_type == 'detect_prohibited_objects':
        # Ваш код для поиска запрещенных объектов в кадрах
        pass

    return jsonify({'status': 'success', 'output': 'Processing result here'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

Этот подход обеспечивает взаимодействие между Laravel и Python-сервисами через очереди и HTTP-запросы. Таким образом, вы можете легко масштабировать и модифицировать свою систему, добавляя новые типы обработки или изменяя существующие.

## Store statuses in Laravel with python processing

Чтобы ваш Python-сервис мог обращаться к API Laravel для обновления статусов обработки и этапов выполнения, можно настроить эндпоинты в Laravel для приема этих обновлений. Это позволит вам отслеживать прогресс обработки видео. Вот шаги, которые помогут вам настроить такую интеграцию.

### Шаг 1: Создание эндпоинтов для обновления статусов обработки в Laravel

1. Создайте контроллер `VideoProcessingStatusController`:
```bash
php artisan make:controller VideoProcessingStatusController
```

2. Реализуйте методы для обновления статуса обработки и этапов выполнения:
```php
// app/Http/Controllers/VideoProcessingStatusController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VideoProcessingJob;

class VideoProcessingStatusController extends Controller
{
    public function updateStatus(Request $request, VideoProcessingJob $job)
    {
        $request->validate([
            'status' => 'required|string',
            'output' => 'nullable|string',
        ]);

        $job->update([
            'status' => $request->status,
            'output' => $request->output,
        ]);

        return response()->json(['message' => 'Status updated successfully'], 200);
    }
}
```

### Шаг 2: Настройка маршрутов

1. Добавьте маршруты для обновления статуса:
```php
// routes/api.php
use App\Http\Controllers\VideoProcessingStatusController;

Route::post('/jobs/{job}/update-status', [VideoProcessingStatusController::class, 'updateStatus']);
```

### Шаг 3: Реализация логики обработки в Python-сервисе

1. Настройте Python-сервис для отправки запросов на обновление статуса в Laravel. Пример для Flask:
```python
# app.py
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

LARAVEL_API_URL = 'http://laravel-app-url/api/jobs/{job_id}/update-status'

def update_status(job_id, status, output=None):
    url = LARAVEL_API_URL.format(job_id=job_id)
    data = {
        'status': status,
    }
    if output:
        data['output'] = output

    response = requests.post(url, json=data)
    return response.json()

@app.route('/api/process', methods=['POST'])
def process_video():
    data = request.json
    video_path = data['video_path']
    process_type = data['type']
    job_id = data['job_id']

    try:
        update_status(job_id, 'processing')

        # Логика обработки видео
        if process_type == 'extract_audio':
            # Код для извлечения аудио
            pass
        elif process_type == 'extract_frames':
            # Код для извлечения значимых кадров
            pass
        elif process_type == 'detect_profanity':
            # Код для поиска матов в аудио
            pass
        elif process_type == 'detect_prohibited_objects':
            # Код для поиска запрещенных объектов в кадрах
            pass

        update_status(job_id, 'completed', 'Processing result here')
    except Exception as e:
        update_status(job_id, 'failed', str(e))

    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

### Шаг 4: Обновление задачи (Job) в Laravel

1. Обновите `ProcessVideoJob` для передачи ID задания в запросе:
```php
// app/Jobs/ProcessVideoJob.php
namespace App\Jobs;

use App\Models\Video;
use App\Models\VideoProcessingJob;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Http;

class ProcessVideoJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $video;
    protected $processingJob;

    public function __construct(Video $video, VideoProcessingJob $processingJob)
    {
        $this->video = $video;
        $this->processingJob = $processingJob;
    }

    public function handle()
    {
        $this->processingJob->update(['status' => 'processing']);

        try {
            $response = Http::post('http://python-service-url/api/process', [
                'video_path' => storage_path('app/' . $this->video->path),
                'type' => $this->processingJob->type,
                'job_id' => $this->processingJob->id,
            ]);

            if ($response->successful()) {
                $this->processingJob->update([
                    'status' => 'completed',
                    'output' => $response->body(),
                ]);
            } else {
                $this->processingJob->update([
                    'status' => 'failed',
                    'output' => $response->body(),
                ]);
            }
        } catch (\Exception $e) {
            $this->processingJob->update([
                'status' => 'failed',
                'output' => $e->getMessage(),
            ]);
        }
    }
}
```

### Шаг 5: Интеграция с фронтендом

1. В шаблоне для загрузки видео добавьте кнопку для запуска обработки:
```blade
<!-- resources/views/livewire/upload-video.blade.php -->
<div>
    <form wire:submit.prevent="upload">
        <input type="text" wire:model="title" placeholder="Video Title">
        @error('title') <span class="error">{{ $message }}</span> @enderror
        <input type="file" wire:model="video">
        @error('video') <span class="error">{{ $message }}</span> @enderror
        <button type="submit">Upload Video</button>
    </form>
    @if (session()->has('message'))
        <div>{{ session('message') }}</div>
    @endif
</div>
```

2. Добавьте кнопку для запуска обработки видео:
```blade
<!-- resources/views/livewire/video-grid.blade.php -->
<div>
    @foreach ($videos as $video)
        <div>
            <a href="{{ route('view-video', $video->id) }}">
                <video width="320" height="240" controls>
                    <source src="{{ Storage::url($video->path) }}" type="video/mp4">
                </video>
                <p>{{ $video->title }}</p>
            </a>
            <button onclick="processVideo({{ $video->id }})">Process Video</button>
        </div>
    @endforeach
</div>

<script>
    function processVideo(videoId) {
        fetch(`/videos/${videoId}/process`, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': '{{ csrf_token() }}',
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
        });
    }
</script>
```

### Шаг 6: Тестирование и отладка

1. Убедитесь, что ваши эндпоинты корректно работают, и что статусы обработки обновляются на каждом этапе.
2. Тестируйте интеграцию между Laravel и Python-сервисами, чтобы убедиться, что данные корректно передаются и статусы обновляются.

С этими шагами ваш Python-сервис сможет взаимодействовать с Laravel API для обновления статусов обработки и отслеживания этапов выполнения задач.

Вы абсолютно правы. Если обработка видео занимает несколько минут, это может привести к таймауту или другим проблемам с подключением. Чтобы избежать этих проблем, можно использовать асинхронные запросы и вебхуки для обновления статуса обработки.

### Шаг 1: Обновление задачи (Job) в Laravel для асинхронного запроса

1. Вместо ожидания ответа от Python-сервиса, просто отправьте запрос и завершите задачу:
```php
// app/Jobs/ProcessVideoJob.php
namespace App\Jobs;

use App\Models\Video;
use App\Models\VideoProcessingJob;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Http;

class ProcessVideoJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $video;
    protected $processingJob;

    public function __construct(Video $video, VideoProcessingJob $processingJob)
    {
        $this->video = $video;
        $this->processingJob = $processingJob;
    }

    public function handle()
    {
        $this->processingJob->update(['status' => 'processing']);

        Http::post('http://python-service-url/api/process', [
            'video_path' => storage_path('app/' . $this->video->path),
            'type' => $this->processingJob->type,
            'job_id' => $this->processingJob->id,
        ]);
    }
}
```

### Шаг 2: Обновление Python-сервиса для асинхронного обновления статуса через вебхуки

1. Настройте Python-сервис для отправки вебхуков на Laravel после завершения обработки:
```python
# app.py
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

LARAVEL_API_URL = 'http://laravel-app-url/api/jobs/{job_id}/update-status'

def update_status(job_id, status, output=None):
    url = LARAVEL_API_URL.format(job_id=job_id)
    data = {
        'status': status,
    }
    if output:
        data['output'] = output

    response = requests.post(url, json=data)
    return response.json()

@app.route('/api/process', methods=['POST'])
def process_video():
    data = request.json
    video_path = data['video_path']
    process_type = data['type']
    job_id = data['job_id']

    try:
        update_status(job_id, 'processing')

        # Логика обработки видео
        if process_type == 'extract_audio':
            # Код для извлечения аудио
            pass
        elif process_type == 'extract_frames':
            # Код для извлечения значимых кадров
            pass
        elif process_type == 'detect_profanity':
            # Код для поиска матов в аудио
            pass
        elif process_type == 'detect_prohibited_objects':
            # Код для поиска запрещенных объектов в кадрах
            pass

        update_status(job_id, 'completed', 'Processing result here')
    except Exception as e:
        update_status(job_id, 'failed', str(e))

    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

### Шаг 3: Тестирование и отладка

1. Убедитесь, что ваши эндпоинты корректно работают, и что статусы обработки обновляются на каждом этапе.
2. Тестируйте интеграцию между Laravel и Python-сервисами, чтобы убедиться, что данные корректно передаются и статусы обновляются.

Этот подход позволяет вам избегать длительных соединений, освобождая ресурсы вашего приложения Laravel и обеспечивая надёжное обновление статусов обработки видео.

Да, вы можете создать систему очередей на стороне Python-сервиса для обработки задач по очереди. Это обеспечит лучшее управление ресурсами и предотвратит возможные перегрузки. Вот как можно это сделать:

### Шаг 1: Настройка Redis для очередей в Python

1. Установите Redis и библиотеку `rq` (Redis Queue):
```bash
pip install redis rq
```

2. Установите Redis-сервер, если он еще не установлен:
```bash
sudo apt-get install redis-server
```

3. Запустите Redis-сервер:
```bash
sudo service redis-server start
```

### Шаг 2: Настройка Python-сервиса для обработки задач с использованием RQ

1. Создайте файл для задач, например `tasks.py`:
```python
# tasks.py
import requests
from rq import Queue
from redis import Redis

redis_conn = Redis()
q = Queue(connection=redis_conn)

LARAVEL_API_URL = 'http://laravel-app-url/api/jobs/{job_id}/update-status'

def update_status(job_id, status, output=None):
    url = LARAVEL_API_URL.format(job_id=job_id)
    data = {
        'status': status,
    }
    if output:
        data['output'] = output

    response = requests.post(url, json=data)
    return response.json()

def process_video_task(video_path, process_type, job_id):
    try:
        update_status(job_id, 'processing')

        # Логика обработки видео
        if process_type == 'extract_audio':
            # Код для извлечения аудио
            pass
        elif process_type == 'extract_frames':
            # Код для извлечения значимых кадров
            pass
        elif process_type == 'detect_profanity':
            # Код для поиска матов в аудио
            pass
        elif process_type == 'detect_prohibited_objects':
            # Код для поиска запрещенных объектов в кадрах
            pass

        update_status(job_id, 'completed', 'Processing result here')
    except Exception as e:
        update_status(job_id, 'failed', str(e))

def queue_process_video(video_path, process_type, job_id):
    q.enqueue(process_video_task, video_path, process_type, job_id)
```

2. Обновите ваш Flask-сервис для добавления задач в очередь:
```python
# app.py
from flask import Flask, request, jsonify
from tasks import queue_process_video

app = Flask(__name__)

@app.route('/api/process', methods=['POST'])
def process_video():
    data = request.json
    video_path = data['video_path']
    process_type = data['type']
    job_id = data['job_id']

    queue_process_video(video_path, process_type, job_id)

    return jsonify({'status': 'queued'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

3. Запустите воркер для обработки задач в отдельном терминале:
```bash
rq worker --with-scheduler
```

### Шаг 3: Обновление задачи (Job) в Laravel

1. Обновите `ProcessVideoJob` для передачи ID задания в запросе:
```php
// app/Jobs/ProcessVideoJob.php
namespace App\Jobs;

use App\Models\Video;
use App\Models\VideoProcessingJob;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Http;

class ProcessVideoJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $video;
    protected $processingJob;

    public function __construct(Video $video, VideoProcessingJob $processingJob)
    {
        $this->video = $video;
        $this->processingJob = $processingJob;
    }

    public function handle()
    {
        $this->processingJob->update(['status' => 'queued']);

        Http::post('http://python-service-url/api/process', [
            'video_path' => storage_path('app/' . $this->video->path),
            'type' => $this->processingJob->type,
            'job_id' => $this->processingJob->id,
        ]);
    }
}
```

### Шаг 4: Тестирование и отладка

1. Убедитесь, что задачи корректно добавляются в очередь и что статусы обработки обновляются на каждом этапе.
2. Тестируйте интеграцию между Laravel и Python-сервисами, чтобы убедиться, что данные корректно передаются и статусы обновляются.

Этот подход обеспечивает более эффективное управление ресурсами и обработку задач, а также позволяет вам легко масштабировать систему.

Создание кэша для хранения задач и использование очереди для обработки в Python-сервисе — отличный подход для улучшения производительности и управления длительными задачами. Можно использовать Redis для управления очередями и кэшированием в Python-сервисе.

### Настройка Redis для Python-сервиса

1. Установите Redis и библиотеку `redis-py`:
```bash
pip install redis
pip install rq
```

2. Запустите Redis-сервер:
```bash
docker run --name redis -d redis
```

### Шаг 1: Настройка очередей в Python-сервисе

1. Создайте скрипт для работы с очередью и обработки задач:
```python
# worker.py
import redis
from rq import Queue, Worker, Connection
from video_processor import process_video  # Импорт функции для обработки видео

listen = ['high', 'default', 'low']

redis_url = 'redis://localhost:6379'

conn = redis.from_url(redis_url)

if __name__ == '__main__':
    with Connection(conn):
        worker = Worker(list(map(Queue, listen)))
        worker.work()
```

2. Создайте файл `video_processor.py` для обработки видео:
```python
# video_processor.py
import requests

LARAVEL_API_URL = 'http://laravel-app-url/api/jobs/{job_id}/update-status'

def update_status(job_id, status, output=None):
    url = LARAVEL_API_URL.format(job_id=job_id)
    data = {
        'status': status,
    }
    if output:
        data['output'] = output

    response = requests.post(url, json=data)
    return response.json()

def process_video(video_path, process_type, job_id):
    try:
        update_status(job_id, 'processing')

        # Логика обработки видео
        if process_type == 'extract_audio':
            # Код для извлечения аудио
            pass
        elif process_type == 'extract_frames':
            # Код для извлечения значимых кадров
            pass
        elif process_type == 'detect_profanity':
            # Код для поиска матов в аудио
            pass
        elif process_type == 'detect_prohibited_objects':
            # Код для поиска запрещенных объектов в кадрах
            pass

        update_status(job_id, 'completed', 'Processing result here')
    except Exception as e:
        update_status(job_id, 'failed', str(e))
```

### Шаг 2: Обновление API в Python-сервисе для добавления задач в очередь

1. Обновите ваш `app.py` для добавления задач в очередь:
```python
# app.py
from flask import Flask, request, jsonify
from redis import Redis
from rq import Queue
from video_processor import process_video

app = Flask(__name__)

redis_conn = Redis()
q = Queue(connection=redis_conn)

@app.route('/api/process', methods=['POST'])
def process_video_request():
    data = request.json
    video_path = data['video_path']
    process_type = data['type']
    job_id = data['job_id']

    job = q.enqueue(process_video, video_path, process_type, job_id)

    return jsonify({'status': 'queued', 'job_id': job.get_id()})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

### Шаг 3: Обновление задачи (Job) в Laravel для асинхронного запроса

1. Обновите `ProcessVideoJob` для отправки задачи в Python-сервис:
```php
// app/Jobs/ProcessVideoJob.php
namespace App\Jobs;

use App\Models\Video;
use App\Models\VideoProcessingJob;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Http;

class ProcessVideoJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $video;
    protected $processingJob;

    public function __construct(Video $video, VideoProcessingJob $processingJob)
    {
        $this->video = $video;
        $this->processingJob = $processingJob;
    }

    public function handle()
    {
        $this->processingJob->update(['status' => 'processing']);

        Http::post('http://python-service-url/api/process', [
            'video_path' => storage_path('app/' . $this->video->path),
            'type' => $this->processingJob->type,
            'job_id' => $this->processingJob->id,
        ]);
    }
}
```

### Шаг 4: Настройка маршрутов

1. Добавьте маршруты для обновления статуса:
```php
// routes/api.php
use App\Http\Controllers\VideoProcessingStatusController;

Route::post('/jobs/{job}/update-status', [VideoProcessingStatusController::class, 'updateStatus']);
```

### Шаг 5: Запуск воркеров

1. Запустите воркер для обработки очередей в Python-сервисе:
```bash
python worker.py
```

### Тестирование и отладка

1. Убедитесь, что задачи успешно добавляются в очередь и обрабатываются воркерами.
2. Проверьте, что статусы обработки обновляются корректно в Laravel.

Этот подход позволяет эффективно управлять задачами обработки видео, обеспечивая асинхронное выполнение и обновление статусов через вебхуки.
