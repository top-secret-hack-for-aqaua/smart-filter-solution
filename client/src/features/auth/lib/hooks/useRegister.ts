import { IRegisterRequest, useRegisterMutation } from '@features/auth/lib';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useRegister = () => {
    const [registerTrigger, { data, isLoading }] = useRegisterMutation();
    const navigate = useNavigate();
    const trigger = async (data: IRegisterRequest) => {
        await registerTrigger(data);
    };
    useEffect(() => {
        if (data) {
            toast.success('Вы успешно зарегистрировались');
            setTimeout(() => {
                navigate('/auth/login');
            }, 1500);
        }
    }, [data]);


    return { trigger, data, isLoading };
};