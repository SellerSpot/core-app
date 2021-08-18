import {
    LandingCostCustomRenderer,
    MRPCustomRenderer,
    MarkupCustomRenderer,
    TaxSettingCustomRenderer,
    SellingPriceCustomRenderer,
    StockFieldCustomRenderer,
    IsActiveToggleCustomRenderer,
    TrackInventoryToggleCustomRenderer,
} from './Components/Fields';
import React, { ReactElement } from 'react';
import { IOutletData } from '@sellerspot/universal-types';
import styles from './DetailsContentView.module.scss';
import {
    IInventorySliderModalProps,
    IInventorySubSliderHandlers,
} from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.types';

type IDetailsContentViewProps = {
    outlet: IOutletData;
    stockUnit: string;
    formRef: IInventorySliderModalProps['formRef'];
} & Pick<IInventorySubSliderHandlers, 'onCreateTaxBracket' | 'onCreateTaxGroup'>;

export const DetailsContentView = (props: IDetailsContentViewProps): ReactElement => {
    // props
    const { outlet, onCreateTaxBracket, onCreateTaxGroup, stockUnit, formRef } = props;

    // draw
    return (
        <div className={styles.wrapper}>
            <div className={styles.costGroup}>
                <MRPCustomRenderer outletId={outlet.id} />
                <LandingCostCustomRenderer formRef={formRef} outletId={outlet.id} />
                <MarkupCustomRenderer formRef={formRef} outletId={outlet.id} />
            </div>
            <div className={styles.costGroup}>
                <SellingPriceCustomRenderer outletId={outlet.id} />
                <StockFieldCustomRenderer stockUnit={stockUnit} outletId={outlet.id} />
            </div>
            <div className={styles.randomGroup}>
                <TaxSettingCustomRenderer
                    outletId={outlet.id}
                    onCreateTaxBracket={onCreateTaxBracket}
                    onCreateTaxGroup={onCreateTaxGroup}
                />
            </div>
            <IsActiveToggleCustomRenderer outletId={outlet.id} />
            <TrackInventoryToggleCustomRenderer outletId={outlet.id} />
        </div>
    );
};
