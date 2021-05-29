import Icon from '@iconify/react';
import { Avatar, IMenuProps, Menu } from '@sellerspot/universal-components';
import cn from 'classnames';
import { colorThemes } from 'config/themes';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'store/models/theme';
import { ICONS } from 'utilities/icons/icons';
import { WorkSpaceTile } from '../WorkSpaceTile/WorkSpaceTile';
import styles from './AppBar.module.scss';
import { IAppBarProps } from './AppBar.types';

export { IAppBarProps } from './AppBar.types';

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

export const AppBar = (props: IAppBarProps): ReactElement => {
    const { currentWorkspace, noSubMenu } = props;
    const themeState = useSelector(themeSelector);

    const workSpaceTileClassName = cn(styles.workspaceTileWrapper, {
        [styles.workspaceTileWrapperNoSubMenu]: noSubMenu,
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.lhsGroup}>
                <div className={workSpaceTileClassName}>
                    <div className={styles.workspaceTile}>
                        <WorkSpaceTile
                            size={'small'}
                            workspaceIcon={<Icon icon={currentWorkspace.icon} height={'24px'} />}
                            workspaceTitle={currentWorkspace.title}
                            expanded
                            variant="workspaceIndicator"
                            selected
                        />
                    </div>
                </div>
            </div>
            <div className={styles.rhsGroup}>
                <Icon
                    icon={ICONS.outlineFullscreen}
                    height="20px"
                    color={colorThemes[themeState.colorTheme].foregroundPrimary}
                />
                <Icon
                    icon={ICONS.outlineNotifications}
                    height="20px"
                    color={colorThemes[themeState.colorTheme].foregroundPrimary}
                />
                <Menu items={getAvatarMenuItems()}>
                    {({ openMenuHandler }) => (
                        <Avatar
                            content={'N'}
                            variant="circular"
                            theme="selected"
                            size="small"
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
