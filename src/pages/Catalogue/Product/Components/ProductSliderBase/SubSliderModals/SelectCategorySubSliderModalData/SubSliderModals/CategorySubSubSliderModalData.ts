import { State } from '@hookstate/core';
import { CategorySliderModalHandlers } from 'components/Compounds/SliderModals/CategorySliderModal/CategorySliderModalHandlers';
import { IProductSliderModalProps } from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal.types';
import { IProductPageState } from 'pages/Catalogue/Product/Product.types';

type ICurrentSliderModalProps =
    IProductSliderModalProps['selectCategorySliderModalProps']['categorySliderModalProps'];

interface ICategorySubSubSliderModalDataProps {
    sliderModalState: State<IProductPageState['sliderModal']>;
    categoryFormRef: IProductSliderModalProps['selectCategorySliderModalProps']['categorySliderModalProps']['formRef'];
}

export class CategorySubSubSliderModalData {
    private sliderModalState: ICategorySubSubSliderModalDataProps['sliderModalState'] = null;
    private categoryFormRef: ICategorySubSubSliderModalDataProps['categoryFormRef'] = null;

    constructor(props: ICategorySubSubSliderModalDataProps) {
        const { sliderModalState, categoryFormRef } = props;
        this.sliderModalState = sliderModalState;
        this.categoryFormRef = categoryFormRef;
    }

    getSliderModalProps = (): ICurrentSliderModalProps => {
        const currentModalState =
            this.sliderModalState.selectCategorySliderModal.categorySliderModal;

        const { onSubmitHandler, onCloseHandler } = new CategorySliderModalHandlers({
            sliderModalState: currentModalState,
            treeDataState: this.sliderModalState.selectCategorySliderModal.treeData,
        });

        return {
            contextData: currentModalState.contextData.get(),
            formRef: this.categoryFormRef,
            level: 2,
            mode: currentModalState.mode.get(),
            onClose: onCloseHandler,
            onSubmit: onSubmitHandler,
            showModal: currentModalState.showModal.get(),
            prefillData: currentModalState.prefillData.get(),
        };
    };
}
