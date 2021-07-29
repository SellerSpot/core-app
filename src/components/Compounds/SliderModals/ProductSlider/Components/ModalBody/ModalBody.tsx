import { SliderModalBody } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { IProductSliderModalOnClose, IProductSliderProps } from '../../ProductSlider.types';
import Fields from './Components/Fields';
import styles from './ModalBody.module.scss';

export type IModalBodyProps = Pick<IProductSliderModalOnClose, 'submitting'> &
    Pick<
        IProductSliderProps,
        'showModal' | 'onCreateBrand' | 'onCreateStockUnit' | 'onInvokeCategoryChoice'
    >;

export const ModalBody = (props: IModalBodyProps): ReactElement => {
    // props
    const { showModal, submitting, onCreateBrand, onCreateStockUnit, onInvokeCategoryChoice } =
        props;

    // draw
    return (
        <SliderModalBody>
            <div className={styles.modalBody}>
                <Fields.ProductNameField autoFocus={showModal} submitting={submitting} />
                <Fields.BarcodeField submitting={submitting} />
                <Fields.DescriptionField submitting={submitting} />
                <Fields.BrandField onCreateBrand={onCreateBrand} submitting={submitting} />
                <Fields.StockUnitField
                    onCreateStockUnit={onCreateStockUnit}
                    submitting={submitting}
                />
                <Fields.CategorySelectButton
                    submitting={submitting}
                    onInvokeCategoryChoice={onInvokeCategoryChoice}
                />
            </div>
        </SliderModalBody>
    );
};
