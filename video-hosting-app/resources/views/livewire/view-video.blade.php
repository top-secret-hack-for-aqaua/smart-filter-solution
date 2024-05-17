<div class="swiper-container h-[900px]">
    <div class="swiper-wrapper h-full">
        @foreach ($videos as $video)
            <div class="swiper-slide h-full">
                <video controls autoplay class="mx-auto h-full">
                    <source src="{{ asset("storage/" . $video->path) }}" type="video/mp4">
                </video>
                <h1>{{ $video->title }}</h1>
            </div>
        @endforeach
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
</div>
