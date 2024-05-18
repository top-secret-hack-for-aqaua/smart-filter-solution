import { ILoginRequest, setToken, useLoginMutation } from '@features/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@shared/lib';

export const useLogin = () => {
    const [loginTrigger, { data, isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const trigger = async (data: ILoginRequest) => {
        await loginTrigger(data);
    };
    useEffect(() => {
        if (data) {
            toast.success('Вы успешно вошли');
            localStorage.setItem('accessToken', data.token);
            dispatch(setToken(data.token));
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