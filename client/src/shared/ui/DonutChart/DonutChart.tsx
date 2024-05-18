import cls from './DonutChart.module.scss';
import { Pie } from '@ant-design/plots';
import { ColorEnum, SizeEnum } from '@shared/lib';
import { Text } from '@shared/ui';

export const DonutChart = () => {
    const config = {
        data: [
            { type: '分类一', value: 27 },
            { type: '分类二', value: 25 },
            { type: '分类三', value: 18 },
            { type: '分类四', value: 15 },
            { type: '分类五', value: 10 },
            { type: '其他', value: 5 },
        ],
        angleField: 'value',
        colorField: 'type',
        legend: false,
    };
    return (
        <div className={cls.wrapper}>
            <Text.Heading
                size={SizeEnum.H5}
                color={ColorEnum.TEXT}
            >
                Категории видео
            </Text.Heading>
            <Pie {...config} />
        </div>
    );
};

