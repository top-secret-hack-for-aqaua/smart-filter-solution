<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Videos
        </h2>
    </x-slot>

    <div class="py-12">
        <livewire:view-video :videoId="$id"/>
    </div>
</x-app-layout>
