import { ICONS } from 'utilities/icons';
import { themeSelector } from 'store/models/theme';
import { useSelector } from 'react-redux';
import React, { ReactElement } from 'react';
import { colorThemes } from 'config/themes';
import { Avatar, BreadCrumbs, Menu, IMenuProps } from '@sellerspot/universal-components';
import { IAppBarProps } from './AppBar.types';
import styles from './AppBar.module.scss';
import { WorkSpaceTile } from '../WorkSpaceTile/WorkSpaceTile';

export default function AppBar(props: IAppBarProps): ReactElement {
    const themeState = useSelector(themeSelector);

    const getAvatarMenuItems = (): IMenuProps['items'] => {
        return [
            {
                content: (
                    <div className={styles.avatarTile}>
                        <ICONS.MdPersonPin />
                        Profile
                    </div>
                ),
            },
            {
                content: (
                    <div className={styles.avatarTile}>
                        <ICONS.MdSettings />
                        Settings
                    </div>
                ),
            },
        ];
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.lhsGroup}>
                <div className={styles.workspaceTile}>
                    <WorkSpaceTile
                        workspaceIcon={props.currentWorkspace.workspaceIcon}
                        workspaceTitle={props.currentWorkspace.workspaceTitle}
                        expanded
                        variant="workspaceIndicator"
                        selected
                    />
                </div>
                <BreadCrumbs crumbs={props.breadcrumbs} />
            </div>
            <div className={styles.rhsGroup}>
                <ICONS.MdFullscreen
                    size="25px"
                    color={colorThemes[themeState.colorTheme].foregroundPrimary}
                />
                <ICONS.MdNotifications
                    size="25px"
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
}
