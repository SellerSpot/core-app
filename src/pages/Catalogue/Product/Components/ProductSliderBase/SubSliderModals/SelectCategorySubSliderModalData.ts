import { State } from '@hookstate/core';
import { IProductSliderModalProps } from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal.types';
import { IProductPageState } from 'pages/Catalogue/Product/Product.types';
import { rawClone } from 'utilities/general';

interface ISelectCategorySubSliderModalDataProps {
    sliderModalState: State<IProductPageState['sliderModal']>;
    categoryFormRef: IProductSliderModalProps['selectCategorySliderModalProps']['categorySliderModalProps']['formRef'];
}

export default class SelectCategorySubSliderModalData {
    private sliderModalState: ISelectCategorySubSliderModalDataProps['sliderModalState'] = null;
    private categoryFormRef: ISelectCategorySubSliderModalDataProps['categoryFormRef'] = null;

    constructor(props: ISelectCategorySubSliderModalDataProps) {
        const { sliderModalState, categoryFormRef } = props;
        this.sliderModalState = sliderModalState;
        this.categoryFormRef = categoryFormRef;
    }

    onInvokeSelectCategoryChoiceHandler: IProductSliderModalProps['onInvokeCategoryChoice'] =
        () => {
            this.sliderModalState.selectCategorySliderModal.showModal.set(true);
        };

    private selectCategorySliderModalOnCloseHander: IProductSliderModalProps['selectCategorySliderModalProps']['onClose'] =
        () => {
            this.sliderModalState.selectCategorySliderModal.showModal.set(false);
        };

    getSliderModalProps = (): IProductSliderModalProps['selectCategorySliderModalProps'] => {
        // state
        const { selectCategorySliderModal } = this.sliderModalState.get();
        const { categorySliderModal } = selectCategorySliderModal;

        return {
            level: 2,
            showModal: selectCategorySliderModal.showModal,
            onClose: this.selectCategorySliderModalOnCloseHander,
            onSubmit: null,
            categoryViewProps: {
                canDragNodes: null,
                canDrop: null,
                createCategoryCallback: null,
                deleteCategoryCallback: null,
                editCategoryCallback: null,
                isLoading: null,
                onChangeCallback: null,
                onMoveNode: null,
                searchQuery: null,
                selectedNode: null,
                treeData: rawClone(selectCategorySliderModal.treeData),
                onSelectNodeCallback: null,
            },
            categorySliderModalProps: {
                contextData: categorySliderModal.contextData,
                formRef: null,
                level: 2,
                mode: categorySliderModal.mode,
                onClose: null,
                onSubmit: null,
                showModal: categorySliderModal.showModal,
                prefillData: categorySliderModal.prefillData,
            },
        };
    };
}
