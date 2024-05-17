<div>
    <form wire:submit.prevent="save">
        <input type="text" wire:model="title" placeholder="Video Title" />
        @error('title') <span class="error">{{ $message }}</span> @enderror

        <input type="file" wire:model="video" />
        @error('video') <span class="error">{{ $message }}</span> @enderror

        <button type="submit">Upload Video</button>
    </form>

    @if (session()->has('message'))
        <div>{{ session('message') }}</div>
    @endif
</div>
