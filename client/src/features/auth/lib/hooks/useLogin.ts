import { ILoginRequest, useLoginMutation } from '@features/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useLogin = () => {
    const [loginTrigger, { data, isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const trigger = async (data: ILoginRequest) => {
        await loginTrigger(data);
    };
    useEffect(() => {
        if (data) {
            toast.success('Вы успешно вошли');
            setTimeout(() => {
                navigate('/');
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            }, 1500);
        }
    }, [data]);


    return { trigger, data, isLoading };
};