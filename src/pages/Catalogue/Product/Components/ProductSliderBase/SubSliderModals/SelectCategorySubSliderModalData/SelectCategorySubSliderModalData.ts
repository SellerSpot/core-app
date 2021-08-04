import { State } from '@hookstate/core';
import { CategoryViewHandlersService } from 'components/Compounds/CategoryView/CategoryViewHandlers.service';
import { IProductSliderModalProps } from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal.types';
import { SelectCategorySliderModalService } from 'components/Compounds/SliderModals/SelectCategorySliderModal/SelectCategorySliderModal.service';
import { IProductPageState } from 'pages/Catalogue/Product/Product.types';
import { rawClone } from 'utilities/general';
import { showNotify } from '@sellerspot/universal-components';
import { CategorySubSubSliderModalData } from './SubSliderModals/CategorySubSubSliderModalData';

type ICurrentModalProps = IProductSliderModalProps['selectCategorySliderModalProps'];

type ICategorySliderModalProps = ICurrentModalProps['categorySliderModalProps'];

interface ISelectCategorySubSliderModalDataProps {
    sliderModalState: State<IProductPageState['sliderModal']>;
    categoryFormRef: ICategorySliderModalProps['formRef'];
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

    onCloseHandler: ICurrentModalProps['onClose'] = async (props) => {
        // state
        const { selectCategorySliderModal } = this.sliderModalState;
        if (selectCategorySliderModal.selectedCategory.get()) {
            await SelectCategorySliderModalService.handleOnCloseSelectCategorySliderModal({
                onCloseProps: props,
                sliderModalState: {
                    selectedCategory: selectCategorySliderModal.selectedCategory,
                    showModal: selectCategorySliderModal.showModal,
                },
            });
        } else {
            this.sliderModalState.selectCategorySliderModal.showModal.set(false);
        }
    };

    private onSubmitHandler: ICurrentModalProps['onSubmit'] = () => {
        this.sliderModalState.selectCategorySliderModal.showModal.set(false);
    };

    private onSearchHandler: ICurrentModalProps['onSearch'] = (query) => {
        this.sliderModalState.selectCategorySliderModal.searchQuery.set(query);
    };

    private onSelectCategory: ICurrentModalProps['categoryViewProps']['onSelectNodeCallback'] =
        (node) => () => {
            this.sliderModalState.selectCategorySliderModal.selectedCategory.set(node);
            showNotify(`Category "${node.title}" selected`, {
                theme: 'success',
                placement: 'bottomLeft',
            });
        };

    getSliderModalProps = (): ICurrentModalProps => {
        // state
        const { selectCategorySliderModal } = this.sliderModalState.get();

        // handlers
        const {
            canDropHandler,
            createCategoryHandler,
            deleteCategoryHandler,
            editCategoryHandler,
            onChangeHandler,
            onMoveNode,
        } = this.categoryViewHandlersService;

        // sub sub slider modals
        const categorySubSubSliderModalData = new CategorySubSubSliderModalData({
            categoryFormRef: this.categoryFormRef,
            sliderModalState: this.sliderModalState,
        });

        return {
            level: 2,
            showModal: selectCategorySliderModal.showModal,
            onClose: this.onCloseHandler,
            onSubmit: this.onSubmitHandler,
            onSearch: this.onSearchHandler,
            categoryViewProps: {
                treeData: rawClone(selectCategorySliderModal.treeData),
                canDragNodes: true,
                isLoading: false,
                searchQuery: rawClone(selectCategorySliderModal.searchQuery),
                selectedNode: rawClone(selectCategorySliderModal.selectedCategory),
                onSelectNodeCallback: this.onSelectCategory,
                canDrop: canDropHandler,
                createCategoryCallback: createCategoryHandler,
                deleteCategoryCallback: deleteCategoryHandler,
                editCategoryCallback: editCategoryHandler,
                onChangeCallback: onChangeHandler,
                onMoveNode: onMoveNode,
            },
            categorySliderModalProps: categorySubSubSliderModalData.getSliderModalProps(),
        };
    };
}
