import React, { ReactElement } from 'react';
import { IComponentEvents } from 'typings/common.types';
import { ICONS } from 'utilities/icons';
import styles from './ExpandWorkspaceMenuButton.module.scss';

export interface IExpandWorkspaceMenuButtonProps {
    onClick?: IComponentEvents['onClick'];
}

export default function ExpandWorkspaceMenuButton(
    props: IExpandWorkspaceMenuButtonProps,
): ReactElement {
    return (
        <div className={styles.wrapper} onClick={props.onClick}>
            <ICONS.OTHER.EXPAND_MENU />
        </div>
    );
}
