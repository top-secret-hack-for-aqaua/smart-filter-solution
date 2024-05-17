<?php

namespace App\Livewire;
use Livewire\WithFileUploads;
use App\Models\Video;

use Livewire\Component;

class UploadVideo extends Component
{
    use WithFileUploads;

    public $title;
    public $video;

    protected $rules = [
        'title' => 'required|string|max:255',
        'video' => 'required|file|mimetypes:video/mp4,video/avi,video/mpeg,video/quicktime|max:102400', // 100MB max
    ];

    public function save()
    {
//        dd($this->video);

        $this->validate();

        // Отладочный вывод
        logger()->info('Title: ' . $this->title);
        logger()->info('Video: ' . json_encode($this->video));

        $path = $this->video->store('videos', 'public');

        Video::create([
            'title' => $this->title,
            'path' => $path,
        ]);

        session()->flash('message', 'Video uploaded successfully.');

        return redirect()->to('/videos');
    }

    public function render()
    {
        return view('livewire.upload-video');
    }
}
