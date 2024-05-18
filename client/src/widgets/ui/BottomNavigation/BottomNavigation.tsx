import cls from './BottomNavigation.module.scss';
import Account from '@assets/icons/account.svg';
import Home from '@assets/icons/home.svg';
import Filter from '@assets/icons/filter.svg';
import { IBottomNavigationList } from '@widgets/lib';
import { Text } from '@shared/ui';
import { Outlet, useLocation } from 'react-router-dom';
import { classNames } from '@shared/lib';

export const BottomNavigation = () => {
    const list: IBottomNavigationList[] = [
        {
            link: '/filter',
            icon: <Filter />,
        },
        {
            link: '/home',
            icon: <Home />,
        },
        {
            link: '/user',
            icon: <Account />,
        },
    ];
    const {pathname} = useLocation()
    const str = pathname.replace("/", "")
    return (
        <>
            <Outlet />
            <div className={cls.wrapper}>
                <ul className={cls.list}>
                    {list.map((item) => (
                        <li className={classNames(cls.listItem, {
                            [cls.active]: item.link.includes(str)
                         }, [])} color={cls.link} key={item.link}>
                            <Text.Link to={item.link}>
                                {item.icon}
                            </Text.Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

