import cls from './StatisticsPage.module.scss';
import { BarChart, DonutChart, LineChart, Select, Text } from '@shared/ui';
import { ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import RangePicker from 'react-range-picker';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useGetChilds } from '@entities/child';

export const StatisticsPage = () => {
    const { data } = useGetChilds();
    const [active, setActive] = useState<number>(0);
    const handleTabClick = () => {
        setActive(prevState => {
            if (prevState < 2) {
                return prevState + 1;
            } else {
                return prevState;
            }
        });
    };
    const placeholder = ({ startDate, endDate }: { startDate: Date, endDate: Date }) => {
        if (!startDate) {
            return (
                <div className={cls.wrapperTime}>
                    <Text.Paragraph
                        color={ColorEnum.TEXT}
                        size={SizeEnum.H1}
                    >
                        Выберите промежуток
                    </Text.Paragraph>
                </div>
            );
        }
        return (
            <div className={cls.wrapperTime}>
                <Text.Paragraph
                    color={ColorEnum.TEXT}
                    size={SizeEnum.H1}
                >
                    {dayjs(startDate).format('YYYY-MM-DD')}
                </Text.Paragraph>
                <div className="placeholder"></div>
                {endDate && (
                    <Text.Paragraph
                        color={ColorEnum.TEXT}
                        size={SizeEnum.H1}
                    >
                        {dayjs(endDate).format('YYYY-MM-DD')}
                    </Text.Paragraph>
                )}
            </div>
        );
    };
    return (
        <div className={cls.wrapper}>
            <Text.Heading
                className={cls.title}
                size={SizeEnum.H4}
                weight={WeightEnum.MEDIUM}
                color={ColorEnum.TEXT}
            >
                Статистика
            </Text.Heading>
            <RangePicker
                dateFormat="dd"
                placeholder={placeholder}
                closeOnSelect={true}
                onClose={() => {
                    setActive(prevState => {
                        if (prevState < 2) {
                            return prevState + 1;
                        } else {
                            return prevState;
                        }
                    });
                }}
            />
            <Text.Heading
                color={ColorEnum.TEXT}
                size={SizeEnum.H5}
                weight={WeightEnum.MEDIUM}
                className={cls.addNewTitle}
            >
                Доступные устройства
            </Text.Heading>
            {data &&
                <Select items={data} onSelect={handleTabClick} />
            }
            {active === 2
                ?
                <div>
                    <LineChart />
                    <DonutChart />
                    {/*<BarChart />*/}
                </div>
                : null
            }
        </div>
    );
};

