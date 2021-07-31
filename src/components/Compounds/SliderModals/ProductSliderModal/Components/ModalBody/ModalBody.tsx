import { SliderModalBody } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import {
    IProductSliderModalOnClose,
    IProductSliderModalProps,
} from '../../ProductSliderModal.types';
import Fields from './Components/Fields';
import styles from './ModalBody.module.scss';

export type IModalBodyProps = Pick<IProductSliderModalOnClose, 'submitting'> &
    Pick<
        IProductSliderModalProps,
        | 'showModal'
        | 'onCreateBrand'
        | 'onCreateStockUnit'
        | 'onInvokeCategoryChoice'
        | 'selectedCategory'
        | 'treeData'
        | 'onCancelCategoryChoice'
    >;

export const ModalBody = (props: IModalBodyProps): ReactElement => {
    // props
    const {
        showModal,
        submitting,
        onCreateBrand,
        onCreateStockUnit,
        selectedCategory,
        treeData,
        onCancelCategoryChoice,
        onInvokeCategoryChoice,
    } = props;

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
                {selectedCategory ? (
                    <Fields.SelectedCategoryView
                        onCancelCategoryChoice={onCancelCategoryChoice}
                        onInvokeCategoryChoice={onInvokeCategoryChoice}
                        selectedCategory={selectedCategory}
                        treeData={treeData}
                        submitting={submitting}
                    />
                ) : (
                    <Fields.CategorySelectButton
                        submitting={submitting}
                        onInvokeCategoryChoice={onInvokeCategoryChoice}
                    />
                )}
            </div>
        </SliderModalBody>
    );
};
