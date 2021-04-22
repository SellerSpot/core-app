import { Avatar, BreadCrumbs } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { colorThemes } from 'config/themes';
import { themeSelector } from 'store/models/theme';
import { ICONS } from 'utilities/icons';

import WorkSpaceTile from '../WorkSpaceTile/WorkSpaceTile';
import styles from './AppBar.module.scss';
import { IAppBarProps } from './AppBar.types';

export default function AppBar(props: IAppBarProps): ReactElement {
    const themeState = useSelector(themeSelector);
    return (
        <div className={styles.wrapper}>
            <div className={styles.lhsGroup}>
                <WorkSpaceTile
                    workspaceIcon={props.currentWorkspace.workspaceIcon}
                    workspaceTitle={props.currentWorkspace.workspaceTitle}
                    expanded
                    variant="workspaceIndicator"
                    selected
                />
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
                <Avatar content={'N'} variant="circular" theme="selected" size="small" />
            </div>
        </div>
    );
}
