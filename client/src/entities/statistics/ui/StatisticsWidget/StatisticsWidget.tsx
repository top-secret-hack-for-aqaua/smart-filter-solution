import cls from './StatisticsWidget.module.scss';
import { BarChart, DonutChart, LineChart, Text } from '@shared/ui';
import { ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';

export const StatisticsWidget = () => {
    return (
        <div className={cls.wrapper}>
            <Text.Heading
                size={SizeEnum.H5}
                className={cls.title}
                weight={WeightEnum.MEDIUM}
                color={ColorEnum.TEXT}
            >
                с 1 по 31 мая
            </Text.Heading>
            <div className={cls.body}>
                <LineChart />
                <div className={cls.list}>
                    <DonutChart />
                    <BarChart />
                </div>
            </div>
        </div>
    );
};

