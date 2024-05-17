import { useGetMeQuery } from '@entities/user';
import { useEffect } from 'react';
import { useAppDispatch } from '@shared/lib';
import { setUser } from '@features/auth';

export const useGetMe = () => {
    const { data } = useGetMeQuery(null);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (data) {
            dispatch(setUser(data));
        }
    }, [data]);
    return data;
};