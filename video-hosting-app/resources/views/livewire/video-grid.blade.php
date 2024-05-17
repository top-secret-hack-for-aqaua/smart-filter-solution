<!-- resources/views/livewire/video-grid.blade.php -->
<div class="grid grid-cols-4 gap-1">
    @foreach ($videos as $video)
        <div>
            <a href="{{ route('view-video', $video->id) }}">
                <video width="320" height="240" controls class="rounded-xl">
                    <source src="{{ asset("storage/" . $video->path) }}" type="video/mp4">
                </video>
                <p>{{ $video->title }}</p>
            </a>
        </div>
    @endforeach
</div>
