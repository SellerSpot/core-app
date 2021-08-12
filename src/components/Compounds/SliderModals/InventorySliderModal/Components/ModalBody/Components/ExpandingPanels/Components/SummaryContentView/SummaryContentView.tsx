import { State } from '@hookstate/core';
import Icon, { IconifyIcon } from '@iconify/react';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import { IOutletData } from '@sellerspot/universal-types';
import styles from './SummaryContentView.module.scss';
import { ToolTip } from '@sellerspot/universal-components';

interface ISummaryContentViewProps {
    isPanelExpandedState: State<boolean>;
    outlet: IOutletData;
}

export const SummaryContentView = (props: ISummaryContentViewProps): ReactElement => {
    // props
    const {
        isPanelExpandedState,
        outlet: { address, name },
    } = props;

    // handlers
    const onClickHandler = () => {
        isPanelExpandedState.set((state) => !state);
    };
    const caretIcon: IconifyIcon['icon'] = isPanelExpandedState.get()
        ? ICONS.caretUp
        : ICONS.caretDown;
    // props
    return (
        <div className={styles.wrapper} onClick={onClickHandler}>
            <div className={styles.summaryText}>
                <h4>{name}</h4>
                <ToolTip content={address} placement="right">
                    <div className={styles.iconWrapper}>
                        <Icon icon={ICONS.outlineInfo} height={'16px'} />
                    </div>
                </ToolTip>
            </div>
            <div className={styles.summaryIconWrapper}>
                <ToolTip content={'View Details'} placement="left">
                    <div className={styles.iconWrapper}>
                        <Icon icon={caretIcon} height={'32px'} />
                    </div>
                </ToolTip>
            </div>
        </div>
    );
};
