import React, { ReactElement } from 'react';
import { Slider, ToolTip } from '@sellerspot/universal-components';
import Icon from '@iconify/react';
import cn from 'classnames';
import { ICONS } from 'utilities/utilities';
import commonStyles from '../../../../../styles/common.module.scss';
import styles from './BillHolderControlPanel.module.scss';

interface IBillHolderControlPanelProps {
    billScale: number;
    setBillScale: React.Dispatch<React.SetStateAction<number>>;
    handlePrint?: () => void;
    resetToDefaultScale?: {
        callBack: () => void;
        hasReset: boolean;
    };
}

export const BillHolderControlPanel = (props: IBillHolderControlPanelProps): ReactElement => {
    const { billScale, setBillScale, handlePrint, resetToDefaultScale } = props;

    const computeBillScaleFromPercentage = ({}, value: number) => {
        const billScaleValue = value / 100;
        setBillScale(+billScaleValue.toFixed(2));
    };

    const sliderValue = +(billScale * 100).toFixed(0);

    return (
        <div className={styles.controlsPanel}>
            {resetToDefaultScale && (
                <ToolTip content="Reset to default zoom">
                    <div
                        className={cn(styles.printIcon, {
                            [commonStyles.contentDisabled]: !resetToDefaultScale.hasReset,
                        })}
                        onClick={resetToDefaultScale.callBack}
                    >
                        <Icon icon={ICONS.bxReset} height={'25px'} />
                    </div>
                </ToolTip>
            )}
            <div className={styles.zoomControls}>
                <Slider
                    min={30}
                    max={200}
                    value={sliderValue}
                    onChange={computeBillScaleFromPercentage}
                />
                <h5>{`${sliderValue}%`}</h5>
            </div>
            {handlePrint && (
                <div className={styles.printIcon} onClick={handlePrint}>
                    <ToolTip content="Print Bill">
                        <Icon icon={ICONS.baselineLocalPrintshop} height={'25px'} />
                    </ToolTip>
                </div>
            )}
        </div>
    );
};
