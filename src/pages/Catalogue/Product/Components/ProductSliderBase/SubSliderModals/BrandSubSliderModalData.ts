import { State } from '@hookstate/core';
import { BrandSliderModalService } from 'components/Compounds/SliderModals/BrandSliderModal/BrandSliderModal.service';
import { IProductSliderModalProps } from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal.types';
import { IProductPageState } from 'pages/Catalogue/Product/Product.types';

interface IBrandSubSliderModalDataProps {
    sliderModalState: State<IProductPageState['sliderModal']>;
    productFormRef: IProductSliderModalProps['formRef'];
    brandFormRef: IProductSliderModalProps['brandSliderModalProps']['formRef'];
}

export default class BrandSubSliderModalData {
    private sliderModalState: IBrandSubSliderModalDataProps['sliderModalState'] = null;
    private productFormRef: IBrandSubSliderModalDataProps['productFormRef'] = null;
    private brandFormRef: IBrandSubSliderModalDataProps['brandFormRef'] = null;

    constructor(props: IBrandSubSliderModalDataProps) {
        const { brandFormRef, productFormRef, sliderModalState } = props;
        this.sliderModalState = sliderModalState;
        this.brandFormRef = brandFormRef;
        this.productFormRef = productFormRef;
    }

    // handlers
    onCreateBrandHandler: IProductSliderModalProps['onCreateBrand'] = async (value) => {
        this.sliderModalState.brandSliderModal.set({
            mode: 'create',
            showModal: true,
            prefillData: {
                name: value,
            },
        });
    };
    private brandSliderOnCloseHandler: IProductSliderModalProps['brandSliderModalProps']['onClose'] =
        () => {
            this.sliderModalState.brandSliderModal.showModal.set(false);
        };
    private brandSliderOnSubmitHandler: IProductSliderModalProps['brandSliderModalProps']['onSubmit'] =
        async ({ values }) => {
            const newBrand = await BrandSliderModalService.createNewBrand({
                ...values,
            });
            if (!!newBrand) {
                // updating form
                this.productFormRef.current.change('brand', {
                    label: newBrand.name,
                    value: newBrand.id,
                });
            }
            this.sliderModalState.brandSliderModal.showModal.set(false);
        };

    // compiling data
    getSliderModalProps = (): IProductSliderModalProps['brandSliderModalProps'] => {
        return {
            formRef: this.brandFormRef,
            level: 2,
            mode: this.sliderModalState.brandSliderModal.mode.get(),
            showModal: this.sliderModalState.brandSliderModal.showModal.get(),
            prefillData: this.sliderModalState.brandSliderModal.prefillData.get(),
            onClose: this.brandSliderOnCloseHandler,
            onSubmit: this.brandSliderOnSubmitHandler,
        };
    };
}
