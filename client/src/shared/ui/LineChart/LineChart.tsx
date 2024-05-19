import cls from './LineChart.module.scss';
import { Line, LineConfig } from '@ant-design/plots';
import { Text } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';

export const LineChart = () => {
    const data = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 3 },
    ];
    const config: LineConfig = {
        data,
        height: 300,
        xField: 'year',
        yField: 'value',
    };
    return (
        <div className={cls.lineChart}>
            <Text.Heading
                size={SizeEnum.H5}
                color={ColorEnum.TEXT}
            >
                Время просмотра
            </Text.Heading>
            <Line
                {...config}
            />
        </div>
    );
};

