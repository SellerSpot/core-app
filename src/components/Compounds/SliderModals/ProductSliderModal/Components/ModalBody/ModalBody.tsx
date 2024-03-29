import { SliderModalBody } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { TreeItem } from 'react-sortable-tree';
import {
    IProductSliderModalOnClose,
    IProductSliderModalProps,
} from '../../ProductSliderModal.types';
import Fields from './Components/Fields';
import styles from './ModalBody.module.scss';

export type IModalBodyProps = Pick<IProductSliderModalOnClose, 'submitting'> &
    Pick<IProductSliderModalProps, 'showModal'> & {
        onCreateBrand: (value: string) => void;
        onCreateStockUnit: (value: string) => void;
        onInvokeCategoryChoice: () => void;
        onCancelCategoryChoice: () => void;
        selectedCategory: TreeItem;
        treeData: TreeItem[];
    };

export const ModalBody = (props: IModalBodyProps): ReactElement => {
    // props
    const {
        showModal,
        submitting,
        onCreateStockUnit,
        selectedCategory,
        treeData,
        onCancelCategoryChoice,
        onInvokeCategoryChoice,
        onCreateBrand,
    } = props;

    // draw
    return (
        <SliderModalBody>
            <div className={styles.modalBody}>
                <Fields.ProductNameField autoFocus={showModal} submitting={submitting} />
                <Fields.BarcodeField submitting={submitting} />
                <Fields.DescriptionField submitting={submitting} />
                <Fields.BrandField submitting={submitting} onCreateBrand={onCreateBrand} />
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
