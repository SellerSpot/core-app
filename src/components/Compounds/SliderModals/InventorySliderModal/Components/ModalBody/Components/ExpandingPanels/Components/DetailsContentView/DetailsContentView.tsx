import {
    StockField,
    LandingCostCustomRenderer,
    MRPCustomRenderer,
    MarkupCustomRenderer,
    TaxSettingCustomRenderer,
} from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/ExpandingPanels/Components/DetailsContentView/Components/Fields';
import React, { ReactElement } from 'react';
import { IOutletData } from '@sellerspot/universal-types';
import styles from './DetailsContentView.module.scss';

interface IDetailsContentViewProps {
    outlet: IOutletData;
}

export const DetailsContentView = (props: IDetailsContentViewProps): ReactElement => {
    // props
    const { outlet } = props;

    // draw
    return (
        <div className={styles.wrapper}>
            <div className={styles.costGroup}>
                <LandingCostCustomRenderer outletId={outlet.id} />
                <MRPCustomRenderer outletId={outlet.id} />
                <MarkupCustomRenderer outletId={outlet.id} />
            </div>
            <div className={styles.randomGroup}>
                <StockField outletId={outlet.id} />
                <TaxSettingCustomRenderer outletId={outlet.id} />
            </div>
        </div>
    );
};
