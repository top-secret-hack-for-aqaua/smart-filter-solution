import cls from './TimeControlPage.module.scss';
import {Collapse, ITabProps, Tab, Text} from '@shared/ui';
import {ColorEnum, SizeEnum, WeightEnum} from '@shared/lib';
import {useState} from 'react';

export const TimeControlPage = () => {
    const [tabData, setTabData] = useState<ITabProps[]>([
        {
            text: 'День',
            isActive: false,
        },
        {
            text: 'Неделя',
            isActive: true,
        },
        {
            text: 'Месяц',
            isActive: false,
        },
    ]);
    const [data, setData] = useState([
        {
            name: "UFC",
            generalTime: "07:45:00",
            children: [
                {day: "Понедельник", time: "01:15:00"},
                {day: "Вторник", time: "01:20:00"},
                {day: "Среда", time: "01:10:00"},
                {day: "Четверг", time: "01:00:00"},
                {day: "Пятница", time: "01:00:00"}
            ]
        },
        {
            name: "Basketball",
            generalTime: "10:10:00",
            children: [
                {day: "Понедельник", time: "02:00:00"},
                {day: "Вторник", time: "01:30:00"},
                {day: "Среда", time: "01:40:00"},
                {day: "Четверг", time: "02:00:00"},
                {day: "Пятница", time: "03:00:00"}
            ]
        },
        {
            name: "Cooking",
            generalTime: "05:50:00",
            children: [
                {day: "Понедельник", time: "01:00:00"},
                {day: "Вторник", time: "00:50:00"},
                {day: "Среда", time: "01:10:00"},
                {day: "Четверг", time: "01:00:00"},
                {day: "Пятница", time: "02:00:00"}
            ]
        },
        {
            name: "Gaming",
            generalTime: "06:30:00",
            children: [
                {day: "Понедельник", time: "01:30:00"},
                {day: "Вторник", time: "01:00:00"},
                {day: "Среда", time: "01:00:00"},
                {day: "Четверг", time: "01:30:00"},
                {day: "Пятница", time: "01:30:00"}
            ]
        },
        {
            name: "Travel",
            generalTime: "08:00:00",
            children: [
                {day: "Понедельник", time: "02:00:00"},
                {day: "Вторник", time: "01:30:00"},
                {day: "Среда", time: "01:30:00"},
                {day: "Четверг", time: "02:00:00"},
                {day: "Пятница", time: "01:00:00"}
            ]
        }
    ]);
    const handleTabClick = (clickedTabIndex: number) => {
        setTabData(tabData.map((tab, index) => ({
            ...tab,
            isActive: index === clickedTabIndex,
        })));
    };
    return (
        <div className={cls.wrapper}>
            <Text.Heading
                className={cls.title}
                size={SizeEnum.H4}
                weight={WeightEnum.MEDIUM}
                color={ColorEnum.TEXT}
            >
                Статистика категорий
            </Text.Heading>
            <ul className={cls.list}>
                {tabData.map((item, index) => (
                    <Tab
                        onClick={() => handleTabClick(index)}
                        {...item}
                        key={item.text}
                    />
                ))}
            </ul>
            <ul className={cls.collapseList}>
                {data.map((category) => (
                    <li key={category.name}>
                        <Collapse title={category.name} time={category.generalTime}>
                            <ul className={cls.innerList}>
                                {category.children.map((child, index) => (
                                    <li className={cls.innerListItem} key={index}>
                                        <Text.Paragraph size={SizeEnum.H1} color={ColorEnum.TEXT}>
                                            {child.day}
                                        </Text.Paragraph>
                                        <Text.Paragraph size={SizeEnum.H1} color={ColorEnum.TEXT}>
                                            {child.time}
                                        </Text.Paragraph>
                                    </li>
                                ))}
                            </ul>
                        </Collapse>
                    </li>
                ))}
            </ul>
        </div>
    );
};

