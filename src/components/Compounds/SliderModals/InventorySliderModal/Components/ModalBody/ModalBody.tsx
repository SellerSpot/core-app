import { State } from '@hookstate/core';
import { ISelectOption, SliderModalBody } from '@sellerspot/universal-components';
import { ExpandingPanels } from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/ExpandingPanels/ExpandingPanels';
import {
    IInventoryModalSearchFieldProps,
    InventoryModalSearchField,
} from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/SearchField/SearchField';
import {
    IInventorySliderModalProps,
    IInventorySliderModalState,
    IInventorySubSliderHandlers,
} from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.types';
import React, { ReactElement } from 'react';
import { IStockUnitData } from '@sellerspot/universal-types';
import styles from './ModalBody.module.scss';

export type IModalBodyProps = Pick<
    IInventorySubSliderHandlers,
    | 'onCreateProduct'
    | 'onSelectInventoryProduct'
    | 'onAddProductToInventory'
    | 'onCreateTaxBracket'
    | 'onCreateTaxGroup'
> & {
    inventorySliderModalState: State<IInventorySliderModalState>;
    submitting: boolean;
    formRef: IInventorySliderModalProps['formRef'];
    searchOption: ISelectOption;
};

interface IProductSummaryViewProps {
    productName: string;
}

const SearchInstruction = () => {
    // draw
    return <div className={styles.searchInstructionWrapper}>Please search for products</div>;
};

const LoadingView = () => {
    // draw
    return <div className={styles.loadingViewWrapper}>Loading</div>;
};

const ProductSummaryView = (props: IProductSummaryViewProps) => {
    // props
    const { productName } = props;

    // draw
    return (
        <div className={styles.productSummaryView}>
            <h5>Product:</h5>
            <p>{productName}</p>
        </div>
    );
};

export const ModalBody = (props: IModalBodyProps): ReactElement => {
    // props
    const {
        inventorySliderModalState,
        onCreateProduct,
        onSelectInventoryProduct,
        onAddProductToInventory,
        onCreateTaxBracket,
        onCreateTaxGroup,
        searchOption,
        formRef,
    } = props;

    // component props
    const inventoryModalSearchFieldProps: IInventoryModalSearchFieldProps = {
        onAddProductToInventory,
        onSelectInventoryProduct,
        onCreateProduct,
        searchOption,
    };

    let modalBodyState: 'loading' | 'none' | 'dataView' = 'none';
    if (
        !!inventorySliderModalState.currentInventoryProduct.get() &&
        !!inventorySliderModalState.outletsToShow.get().length
    ) {
        modalBodyState = 'dataView';
    } else if (!!searchOption) {
        modalBodyState = 'loading';
    } else {
        modalBodyState = 'none';
    }
    const productStockUnit = (
        inventorySliderModalState?.currentInventoryProduct?.stockUnit?.get() as IStockUnitData
    )?.unit;

    // draw
    return (
        <SliderModalBody>
            <div className={styles.modalBody}>
                <InventoryModalSearchField {...inventoryModalSearchFieldProps} />
                {modalBodyState === 'none' ? (
                    <SearchInstruction />
                ) : modalBodyState === 'loading' ? (
                    <LoadingView />
                ) : (
                    <>
                        <ProductSummaryView
                            productName={inventorySliderModalState.currentInventoryProduct?.name?.get()}
                        />
                        <ExpandingPanels
                            formRef={formRef}
                            stockUnit={productStockUnit}
                            outletsToShow={inventorySliderModalState.outletsToShow.get()}
                            onCreateTaxBracket={onCreateTaxBracket}
                            onCreateTaxGroup={onCreateTaxGroup}
                        />
                    </>
                )}
            </div>
        </SliderModalBody>
    );
};
