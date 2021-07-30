import { State } from '@hookstate/core';
import { ProductSliderFieldsService } from 'components/Compounds/SliderModals/ProductSliderModal/Components/ModalBody/Components/Fields.service';
import { IProductSliderModalProps } from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal.types';
import { IProductPageState } from 'pages/Catalogue/Product/Product.types';
import { StockUnitSliderBaseService } from 'pages/Catalogue/StockUnit/Components/StockUnitSliderBase/StockUnitSliderBase.service';

interface IStockUnitSubSliderModalDataProps {
    sliderModalState: State<IProductPageState['sliderModal']>;
    productFormRef: IProductSliderModalProps['formRef'];
    stockUnitFormRef: IProductSliderModalProps['stockUnitSliderModalProps']['formRef'];
}

export default class StockUnitSubSliderModalData {
    private sliderModalState: IStockUnitSubSliderModalDataProps['sliderModalState'] = null;
    private productFormRef: IStockUnitSubSliderModalDataProps['productFormRef'] = null;
    private stockUnitFormRef: IStockUnitSubSliderModalDataProps['stockUnitFormRef'] = null;

    constructor(props: IStockUnitSubSliderModalDataProps) {
        const { productFormRef, sliderModalState, stockUnitFormRef } = props;
        this.sliderModalState = sliderModalState;
        this.stockUnitFormRef = stockUnitFormRef;
        this.productFormRef = productFormRef;
    }

    onCreateStockUnitHandler: IProductSliderModalProps['onCreateStockUnit'] = async (value) => {
        this.sliderModalState.stockUnitSliderModal.set({
            mode: 'create',
            showModal: true,
            prefillData: {
                name: value,
            },
        });
    };
    private stockUnitSliderOnCloseHandler: IProductSliderModalProps['stockUnitSliderModalProps']['onClose'] =
        () => {
            this.sliderModalState.stockUnitSliderModal.showModal.set(false);
        };
    private stockUnitSliderOnSubmitHandler: IProductSliderModalProps['stockUnitSliderModalProps']['onSubmit'] =
        async ({ values }) => {
            const newStockUnit = await StockUnitSliderBaseService.createNewStockUnit({
                ...values,
            });
            if (!!newStockUnit) {
                const newSelectOption =
                    ProductSliderFieldsService.formatStockUnitDataForSelectComponent(newStockUnit);
                // updating form
                this.productFormRef.current.change('stockUnit', newSelectOption);
            }
            this.sliderModalState.stockUnitSliderModal.showModal.set(false);
        };

    getSliderModalProps = (): IProductSliderModalProps['stockUnitSliderModalProps'] => {
        return {
            formRef: this.stockUnitFormRef,
            level: 2,
            mode: this.sliderModalState.stockUnitSliderModal.mode.get(),
            showModal: this.sliderModalState.stockUnitSliderModal.showModal.get(),
            prefillData: this.sliderModalState.stockUnitSliderModal.prefillData.get(),
            onClose: this.stockUnitSliderOnCloseHandler,
            onSubmit: this.stockUnitSliderOnSubmitHandler,
        };
    };
}
