<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Video;
use Illuminate\Support\Collection;

class ViewVideo extends Component
{
    public $video;
    public $videoId;

    public function mount($videoId)
    {
        $this->videoId = $videoId;
        $this->video = Video::find($videoId);
    }

    public function render()
    {
        $currentVideo = Video::where('id', $this->videoId)->first();
        $remainingVideos = Video::where('id', '!=', $this->videoId)->take(9)->get();

        $videos = new Collection();
        $videos->push($currentVideo);
        $videos = $videos->merge($remainingVideos);

        return view('livewire.view-video', [
            'video' => $this->video,
            'videos' => $videos
        ]);
    }
}
