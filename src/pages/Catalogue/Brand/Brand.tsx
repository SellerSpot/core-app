import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button, TButtonOnClickHandler } from '@sellerspot/universal-components';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import React, { ReactElement, useEffect } from 'react';
import { ICONS } from 'utilities/utilities';
import styles from './Brand.module.scss';
import { BrandService } from './Brand.service';
import { IBrandPageState } from './Brand.types';
import { BrandSlider } from './Components/BrandSlider/BrandSlider';
import { BrandTable } from './Components/BrandTable/BrandTable';

const PageHeaderComponent = (props: { pageState: State<IBrandPageState> }) => {
    // props
    const { pageState } = props;

    // components
    const NewBrandButton = () => {
        // handlers
        const onClickHandler: TButtonOnClickHandler = () => {
            pageState.slider.merge({
                isEditMode: false,
                prefillData: null,
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

export const Brand = (): ReactElement => {
    // state
    const pageState = useState<IBrandPageState>({
        brands: [],
        isBrandTableLoading: false,
        slider: {
            prefillData: null,
            showSliderModal: false,
            isEditMode: false,
        },
    });

    // handlers
    const getAllBrand = async (): Promise<void> => {
        const allBrand = await BrandService.getAllBrand();
        pageState.merge({
            brands: allBrand,
            isBrandTableLoading: false,
        });
    };

    // effects
    useEffect(() => {
        pageState.isBrandTableLoading.set(true);
        getAllBrand();
    }, []);

    // draw
    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent pageState={pageState} />
            <BrandTable pageState={pageState} getAllBrand={getAllBrand} />
            <BrandSlider sliderState={pageState.slider} getAllBrand={getAllBrand} />
        </div>
    );
};
