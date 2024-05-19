import { mainApi } from '@shared/lib/store/api';
import { IVideoRequest, IVideoResponse } from '@entities/video';

export const categoryApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        sendVideo: build.mutation<IVideoResponse, IVideoRequest>({
            query: (value) => ({
                url: `/video/insert_video`,
                method: 'POST',
                body: value,
            }),
        }),
    }),
});
export const {
    useSendVideoMutation,
} = categoryApi;