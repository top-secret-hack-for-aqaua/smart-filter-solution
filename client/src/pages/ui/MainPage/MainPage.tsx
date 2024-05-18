import cls from './MainPage.module.scss';
import { ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';
import { Text } from '@shared/ui';
import { StatisticsWidget } from '@entities/statistics';
import { MagazineWidget } from '@entities/magazine';

export const MainPage = () => {
    return (
        <div className={cls.wrapper}>
            <Text.Heading
                className={cls.title}
                size={SizeEnum.H4}
                weight={WeightEnum.MEDIUM}
                color={ColorEnum.TEXT}
            >
                Главная
            </Text.Heading>
            <div className={cls.charts}>
                <div className={cls.chartsText}>
                    <Text.Heading
                        color={ColorEnum.SECONDARY}
                        size={SizeEnum.H5}
                    >
                        Статистика приложений
                    </Text.Heading>
                    <Text.Link
                        className={cls.link}
                        color={ColorEnum.SECONDARY}
                        to="/statistics">
                        Подробнее
                    </Text.Link>
                </div>
                <StatisticsWidget />
            </div>
            <div className={cls.charts}>
                <div className={cls.chartsText}>
                    <Text.Heading
                        color={ColorEnum.SECONDARY}
                        size={SizeEnum.H5}
                    >
                        Журнал посещений
                    </Text.Heading>
                    <Text.Link
                        className={cls.link}
                        color={ColorEnum.SECONDARY}
                        to="/magazine">
                        Подробнее
                    </Text.Link>
                </div>
                <MagazineWidget />
            </div>
        </div>
    );
};

