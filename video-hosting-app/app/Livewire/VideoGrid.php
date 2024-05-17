<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Video;

class VideoGrid extends Component
{
    public function render()
    {
        return view('livewire.video-grid', [
            'videos' => Video::all(),
        ]);
    }
}
