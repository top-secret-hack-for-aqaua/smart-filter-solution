import { useSendVideoMutation } from '@entities/video/lib/services';
import { IVideoRequest } from '@entities/video';

export const useSendVideo = () => {
    const [sendVideoTrigger, { data }] = useSendVideoMutation();
    const trigger = async (value: IVideoRequest) => {
        await sendVideoTrigger(value);
    };
    return {
        trigger, data,
    };
};