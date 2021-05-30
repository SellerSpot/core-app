import Icon from '@iconify/react';
import { Avatar, IMenuProps, Menu } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/icons/icons';
import styles from './AppBar.module.scss';
import { AppBarHeader } from './Components/AppBarHeader/AppBarHeader';

const getAvatarMenuItems = (): IMenuProps['items'] => {
    return [
        {
            content: (
                <div className={styles.avatarTile}>
                    <Icon icon={ICONS.bxExit} height="20px" />
                    <h6>Logout</h6>
                </div>
            ),
        },
    ];
};

export const AppBar = (): ReactElement => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.lhsGroup}>
                <div className={styles.appBarHeaderWrapper}>
                    <AppBarHeader />
                </div>
            </div>
            <div className={styles.rhsGroup}>
                <Avatar
                    className={styles.icon}
                    content={<Icon icon={ICONS.bxFullScreen} height="20px" />}
                    size="medium"
                    variant="circular"
                />
                <Avatar
                    className={styles.icon}
                    content={<Icon icon={ICONS.notifications} height="20px" />}
                    size="medium"
                    variant="circular"
                />
                <Menu items={getAvatarMenuItems()}>
                    {({ openMenuHandler }) => (
                        <Avatar
                            className={styles.avatar}
                            content={<span className={styles.avatarText}>R</span>}
                            variant="circular"
                            theme="selected"
                            size="medium"
                            events={{
                                onClick: (event) => openMenuHandler(event.currentTarget),
                            }}
                        />
                    )}
                </Menu>
            </div>
        </div>
    );
};
