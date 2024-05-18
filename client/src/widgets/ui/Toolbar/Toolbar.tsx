import cls from './Toolbar.module.scss';

export const Toolbar = () => {
    return (
        <div className={cls.wrapper}>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    Test 1
                </li>
                <li className={cls.listItem}>
                    Test 2
                </li>
                <li className={cls.listItem}>
                    Test 3
                </li>
                <li className={cls.listItem}>
                    Test 4
                </li>
            </ul>
        </div>
    );
};

