import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button, TOnNodeClickHandler } from '@sellerspot/universal-components';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import React, { ReactElement, useEffect } from 'react';
import { ICONS } from 'utilities/utilities';
import styles from './Brands.module.scss';
import { BrandsService } from './Brands.service';
import { IBrandsPageState } from './Brands.types';
import { BrandsSlider } from './Components/BrandsSlider/BrandsSlider';
import { BrandsTable } from './Components/BrandsTable/BrandsTable';

const PageHeaderComponent = (props: { pageState: State<IBrandsPageState> }) => {
    // props
    const { pageState } = props;

    // components
    const NewBrandButton = () => {
        // handlers
        const onClickHandler: TOnNodeClickHandler<HTMLButtonElement> = () => {
            pageState.slider.merge({
                isEditMode: false,
                prefillBrandsData: null,
                showSliderModal: true,
            });
        };

        // draw
        return (
            <Button
                label="NEW BRAND"
                variant="contained"
                theme="primary"
                startIcon={<Icon icon={ICONS.outlineAdd} />}
                onClick={onClickHandler}
            />
        );
    };

    // draw
    return <PageHeader title={'Brands'} actions={[<NewBrandButton key={'newBrandButton'} />]} />;
};

export const Brands = (): ReactElement => {
    // state
    const pageState = useState<IBrandsPageState>({
        brands: [],
        isBrandsTableLoading: false,
        slider: {
            prefillBrandsData: null,
            showSliderModal: false,
            isEditMode: false,
        },
    });

    // handlers
    const getAllBrands = async (): Promise<void> => {
        const allBrands = await BrandsService.getAllBrands();
        pageState.merge({
            brands: allBrands,
            isBrandsTableLoading: false,
        });
    };

    // effects
    useEffect(() => {
        pageState.isBrandsTableLoading.set(true);
        getAllBrands();
    }, []);

    // draw
    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent pageState={pageState} />
            <BrandsTable pageState={pageState} getAllBrands={getAllBrands} />
            <BrandsSlider sliderState={pageState.slider} getAllBrands={getAllBrands} />
        </div>
    );
};
