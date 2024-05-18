import cls from './RegisterForm.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { IRegisterRequest, useRegister } from '@features/auth/lib';
import { Input } from '@shared/ui/Input';
import { BorderEnum, classNames, ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';
import { Button, Text } from '@shared/ui';

export const RegisterForm = () => {
    const { trigger, isLoading } = useRegister();
    const {
        formState: {
            errors,
        },
        watch,
        handleSubmit,
        control,
        register,
    } = useForm<IRegisterRequest>({
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
    const fullName = register('full_name', {
        required: 'Имя обязательно',
    });
    const confirmPassword = register('confirm_password', {
        required: 'Повторите пароль',
        validate: (val: string) => {
            if (watch('password') != val) {
                return 'Пароли не совпадают';
            }
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
    const onSubmit = (data: IRegisterRequest) => {
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
                Регистрация
            </Text.Heading>
            <Controller
                name="full_name"
                control={control}
                render={({ field }) => (
                    <div className={cls.wrapper}>
                        <Input
                            className={classNames('', {
                                [cls.errorInput]: errors.full_name !== undefined,
                            }, [])}
                            type="text"
                            label="ФИО"
                            value={field.value}
                            onChange={field.onChange}
                            size={SizeEnum.H1}
                            border={BorderEnum.H6}
                            color={ColorEnum.BLACK}
                            name="full_name"
                            register={fullName}
                        />
                        {errors.full_name &&
                            <Text.Paragraph
                                className={cls.error}
                                color={ColorEnum.DANGER}
                                size={SizeEnum.H2}
                            >
                                {errors.full_name.message}
                            </Text.Paragraph>
                        }
                    </div>
                )}
            />
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
                            size={SizeEnum.H1}
                            border={BorderEnum.H6}
                            color={ColorEnum.BLACK}
                            name="email"
                            register={email}
                        />
                        {errors.email &&
                            <Text.Paragraph
                                className={cls.error}
                                color={ColorEnum.DANGER}
                                size={SizeEnum.H2}
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
                            size={SizeEnum.H1}
                            border={BorderEnum.H6}
                            color={ColorEnum.BLACK}
                            name="password"
                            register={password}
                        />
                        {errors.password &&
                            <Text.Paragraph
                                className={cls.error}
                                color={ColorEnum.DANGER}
                                size={SizeEnum.H2}
                            >
                                {errors.password.message}
                            </Text.Paragraph>
                        }
                    </div>
                )}
            />
            <Controller
                name="confirm_password"
                control={control}
                render={({ field }) => (
                    <div className={cls.wrapper}>
                        <Input
                            className={classNames('', {
                                [cls.errorInput]: errors.confirm_password !== undefined,
                            }, [])}
                            type="password"
                            label="Повторите пароль"
                            value={field.value}
                            onChange={field.onChange}
                            size={SizeEnum.H1}
                            border={BorderEnum.H6}
                            color={ColorEnum.BLACK}
                            name="confirm_password"
                            register={confirmPassword}
                        />
                        {errors.confirm_password &&
                            <Text.Paragraph
                                className={cls.error}
                                color={ColorEnum.DANGER}
                                size={SizeEnum.H2}
                            >
                                {errors.confirm_password.message}
                            </Text.Paragraph>
                        }
                    </div>
                )}
            />
            <Button
                isLoading={isLoading}
                type="submit"
                color={ColorEnum.WHITE}
                size={SizeEnum.H1}
                bgColor={ColorEnum.PRIMARY}
                border={BorderEnum.H5}
            >
                Отправить
            </Button>
            <Text.Paragraph
                size={SizeEnum.H1}
            >
                Есть аккаунт?&nbsp;
                <Text.Link
                    size={SizeEnum.H1}
                    to="/auth/login">Войти</Text.Link>
            </Text.Paragraph>
        </form>
    );
};

