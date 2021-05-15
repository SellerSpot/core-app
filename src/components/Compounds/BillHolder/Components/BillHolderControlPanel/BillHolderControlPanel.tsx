import { Slider, ToolTip } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/icons';
import styles from './BillHolderControlPanel.module.scss';

interface IBillHolderControlPanelProps {
    billScale: number;
    setBillScale: React.Dispatch<React.SetStateAction<number>>;
    handlePrint: () => void;
}

export const BillHolderControlPanel = (props: IBillHolderControlPanelProps): ReactElement => {
    const { billScale, setBillScale, handlePrint } = props;

    const computeBillScaleFromPercentage = ({}, value: number) => {
        const billScaleValue = value / 100;
        setBillScale(+billScaleValue.toFixed(2));
    };

    const sliderValue = +(billScale * 100).toFixed(0);

    return (
        <div className={styles.controlsPanel}>
            <div className={styles.zoomControls}>
                <Slider
                    min={30}
                    max={200}
                    value={sliderValue}
                    onChange={computeBillScaleFromPercentage}
                />
                <h5>{`${sliderValue}%`}</h5>
            </div>
            <ToolTip content={'Print Bill'}>
                <ICONS.MdPrint className={styles.printIcon} size={'25px'} onClick={handlePrint} />
            </ToolTip>
        </div>
    );
};
