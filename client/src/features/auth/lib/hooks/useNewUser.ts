import { INewUserRequest, useNewUserMutation } from '@features/auth';

export const useNewUser = () => {
    const [newUserTrigger, { data }] = useNewUserMutation();
    const trigger = async (value: INewUserRequest) => {
        await newUserTrigger(value);
    };
    return {
        trigger, data,
    };
};