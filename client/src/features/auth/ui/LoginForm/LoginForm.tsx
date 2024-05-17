import cls from './LoginForm.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { ILoginRequest, useLogin } from '@features/auth/lib';
import { Input } from '@shared/ui/Input';
import { BorderEnum, classNames, ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';
import { Button, Text } from '@shared/ui';

export const LoginForm = () => {
    const { trigger, isLoading } = useLogin();
    const {
        formState: {
            errors,
        },
        handleSubmit,
        control,
        register,
    } = useForm<ILoginRequest>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const email = register('email', {
        required: 'Почта обязательна',
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Введите корректный адрес электронной почты',
        },
    });

    const password = register('password', {
        required: 'Пароль обязателен',
        minLength: {
            value: 6,
            message: 'Пароль должен содержать как минимум 6 символов',
        },
        maxLength: {
            value: 20,
            message: 'Пароль должен содержать не более 20 символов',
        },
    });
    const onSubmit = (data: ILoginRequest) => {
        trigger(data);
    };


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={cls.form}>
            <Text.Heading
                className={cls.title}
                size={SizeEnum.H2}
                color={ColorEnum.BLACK}
                weight={WeightEnum.MEDIUM}
            >
                Авторизация
            </Text.Heading>
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <div className={cls.wrapper}>
                        <Input
                            className={classNames('', {
                                [cls.errorInput]: errors.email !== undefined,
                            }, [])}
                            type="email"
                            label="Почта"
                            value={field.value}
                            onChange={field.onChange}
                            size={SizeEnum.H2}
                            border={BorderEnum.H6}
                            color={ColorEnum.BLACK}
                            name="email"
                            register={email}
                        />
                        {errors.email &&
                            <Text.Paragraph
                                className={cls.error}
                                color={ColorEnum.DANGER}
                                size={SizeEnum.H4}
                            >
                                {errors.email.message}
                            </Text.Paragraph>
                        }
                    </div>
                )}
            />
            <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <div className={cls.wrapper}>
                        <Input
                            className={classNames('', {
                                [cls.errorInput]: errors.password !== undefined,
                            }, [])}
                            type="password"
                            label="Пароль"
                            value={field.value}
                            onChange={field.onChange}
                            size={SizeEnum.H2}
                            border={BorderEnum.H6}
                            color={ColorEnum.BLACK}
                            name="password"
                            register={password}
                        />
                        {errors.password &&
                            <Text.Paragraph
                                className={cls.error}
                                color={ColorEnum.DANGER}
                                size={SizeEnum.H4}
                            >
                                {errors.password.message}
                            </Text.Paragraph>
                        }
                    </div>
                )}
            />
            <Button
                isLoading={isLoading}
                type="submit"
                color={ColorEnum.WHITE}
                size={SizeEnum.H2}
                bgColor={ColorEnum.PRIMARY}
                border={BorderEnum.H5}
            >
                Отправить
            </Button>
            <Text.Paragraph
                size={SizeEnum.H3}
            >
                Нет аккаунта?&nbsp;
                <Text.Link
                    size={SizeEnum.H3}
                    to="/auth/register">Создать</Text.Link>
            </Text.Paragraph>
        </form>
    );
};

