import cls from './BarChart.module.scss';
import { Column } from '@ant-design/plots';

export const BarChart = () => {
    const data = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1999', value: 3 },
    ];
    const config = {
        data,
        height: 150,
        width: 150,
        xField: 'year',
        yField: 'value',
    };
    return (
        <Column {...config} />
    );
};

