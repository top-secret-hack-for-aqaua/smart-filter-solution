import cls from './NewUserForm.module.scss';
import { INewUserRequest, useNewUser } from '@features/auth';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Text } from '@shared/ui';
import { BorderEnum, classNames, ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';

export const NewUserForm = () => {
    const { trigger } = useNewUser();
    const {
        formState: {
            errors,
        },
        handleSubmit,
        control,
        register,
    } = useForm<INewUserRequest>({
        defaultValues: {
            name: '',
        },
    });

    const name = register('name', {
        required: 'Имя обязательно',
    });
    const onSubmit = (data: INewUserRequest) => {
        trigger(data);
    };


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={cls.form}>
            <Text.Heading
                className={cls.title}
                size={SizeEnum.H2}
                color={ColorEnum.TEXT}
                weight={WeightEnum.MEDIUM}
            >
                Новый пользователь
            </Text.Heading>
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <div className={cls.wrapper}>
                        <Input
                            className={classNames('', {
                                [cls.errorInput]: errors.name !== undefined,
                            }, [])}
                            type="text"
                            label="Имя"
                            value={field.value}
                            onChange={field.onChange}
                            size={SizeEnum.H1}
                            border={BorderEnum.H5}
                            borderColor={ColorEnum.SECONDARY}
                            color={ColorEnum.TEXT}
                            bgColor={ColorEnum.BG}
                            name="name"
                            register={name}
                        />
                        {errors.name &&
                            <Text.Paragraph
                                className={cls.error}
                                color={ColorEnum.DANGER}
                                size={SizeEnum.H2}
                            >
                                {errors.name.message}
                            </Text.Paragraph>
                        }
                    </div>
                )}
            />
            <Button
                type="submit"
                color={ColorEnum.WHITE}
                size={SizeEnum.H1}
                bgColor={ColorEnum.PRIMARY}
                border={BorderEnum.H5}
            >
                Отправить
            </Button>
        </form>
    );
};

