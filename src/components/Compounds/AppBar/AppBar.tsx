import Icon from '@iconify/react';
import { Avatar, IMenuProps, Menu } from '@sellerspot/universal-components';
import { colorThemes } from 'config/themes';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'store/models/theme';
import { ICONS } from 'utilities/icons/icons';
import styles from './AppBar.module.scss';
import { AppBarHeader } from './Components/AppBarHeader/AppBarHeader';

const getAvatarMenuItems = (): IMenuProps['items'] => {
    return [
        {
            content: (
                <div className={styles.avatarTile}>
                    <Icon icon={ICONS.baselinePersonPin} />
                    Profile
                </div>
            ),
        },
        {
            content: (
                <div className={styles.avatarTile}>
                    <Icon icon={ICONS.baselineSettings} />
                    Settings
                </div>
            ),
        },
    ];
};

export const AppBar = (): ReactElement => {
    const themeState = useSelector(themeSelector);

    return (
        <div className={styles.wrapper}>
            <div className={styles.lhsGroup}>
                <div className={styles.appBarHeaderWrapper}>
                    <AppBarHeader />
                </div>
            </div>
            <div className={styles.rhsGroup}>
                <Icon
                    icon={ICONS.bxFullScreen}
                    height="20px"
                    color={colorThemes[themeState.colorTheme].foregroundPrimary}
                />
                <Icon
                    icon={ICONS.notifications}
                    height="20px"
                    color={colorThemes[themeState.colorTheme].foregroundPrimary}
                />
                <Menu items={getAvatarMenuItems()}>
                    {({ openMenuHandler }) => (
                        <Avatar
                            content={'R'}
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
