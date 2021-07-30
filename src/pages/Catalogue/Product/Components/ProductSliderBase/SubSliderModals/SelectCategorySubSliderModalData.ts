import { State } from '@hookstate/core';
import { IProductSliderModalProps } from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal.types';
import { IProductPageState } from 'pages/Catalogue/Product/Product.types';

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

    onInvokeCategoryChoiceHandler: IProductSliderModalProps['onInvokeCategoryChoice'] = () => {
        console.log('Show CATAGORIES');
    };

    getSliderModalProps = (): IProductSliderModalProps['selectCategorySliderModalProps'] => {
        return {
            level: 2,
            showModal: this.sliderModalState.selectCategorySliderModal.showModal.get(),
            onClose: null,
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
                treeData: null,
                onSelectNodeCallback: null,
            },
            categorySliderModalProps: null,
        };
    };
}
