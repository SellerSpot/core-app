import { State } from '@hookstate/core';
import { CategoryViewHandlersService } from 'components/Compounds/CategoryView/CategoryViewHandlers.service';
import { IProductSliderModalProps } from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal.types';
import { IProductPageState } from 'pages/Catalogue/Product/Product.types';
import { rawClone } from 'utilities/general';

interface ISelectCategorySubSliderModalDataProps {
    sliderModalState: State<IProductPageState['sliderModal']>;
    categoryFormRef: IProductSliderModalProps['selectCategorySliderModalProps']['categorySliderModalProps']['formRef'];
    categoryViewHandlersService: CategoryViewHandlersService;
}

export default class SelectCategorySubSliderModalData {
    private sliderModalState: ISelectCategorySubSliderModalDataProps['sliderModalState'] = null;
    private categoryFormRef: ISelectCategorySubSliderModalDataProps['categoryFormRef'] = null;
    private categoryViewHandlersService: ISelectCategorySubSliderModalDataProps['categoryViewHandlersService'] =
        null;

    constructor(props: ISelectCategorySubSliderModalDataProps) {
        const { sliderModalState, categoryFormRef, categoryViewHandlersService } = props;
        this.sliderModalState = sliderModalState;
        this.categoryFormRef = categoryFormRef;
        this.categoryViewHandlersService = categoryViewHandlersService;
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

        // handlers
        const {
            canDropHandler,
            createCategoryHandler,
            deleteCategoryHandler,
            editCategoryHandler,
            onChangeHandler,
            onMoveNode,
        } = this.categoryViewHandlersService;

        return {
            level: 2,
            showModal: selectCategorySliderModal.showModal,
            onClose: this.selectCategorySliderModalOnCloseHander,
            onSubmit: null,
            categoryViewProps: {
                treeData: rawClone(selectCategorySliderModal.treeData),
                canDragNodes: true,
                isLoading: false,
                searchQuery: '',
                selectedNode: null,
                onSelectNodeCallback: null,
                canDrop: canDropHandler,
                createCategoryCallback: createCategoryHandler,
                deleteCategoryCallback: deleteCategoryHandler,
                editCategoryCallback: editCategoryHandler,
                onChangeCallback: onChangeHandler,
                onMoveNode: onMoveNode,
            },
            categorySliderModalProps: {
                contextData: categorySliderModal.contextData,
                formRef: this.categoryFormRef,
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
