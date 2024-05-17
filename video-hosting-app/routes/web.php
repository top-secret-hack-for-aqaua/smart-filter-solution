<?php

use App\Models\Video;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');

    Route::get('/upload-video', function () {
        return view('upload-video');
    })->name('upload-video');

    Route::get('/videos', function () {
        return view('videos');
    })->name('videos');

    Route::get('/videos/{video}', function (int $id) {
        return view('view-video', compact('id'));
    })->name('view-video');
});
