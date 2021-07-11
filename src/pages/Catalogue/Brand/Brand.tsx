import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button, TOnNodeClickHandler } from '@sellerspot/universal-components';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import React, { ReactElement, useEffect } from 'react';
import { ICONS } from 'utilities/utilities';
import styles from './Brand.module.scss';
import { BrandService } from './Brand.service';
import { IBrandPageState } from './Brand.types';
import { BrandSliderBase } from './Components/BrandSliderBase/BrandSliderBase';
import { BrandTable } from './Components/BrandTable/BrandTable';

const PageHeaderComponent = (props: { pageState: State<IBrandPageState> }) => {
    // props
    const { pageState } = props;

    // components
    const NewBrandButton = () => {
        // handlers
        const onClickHandler: TOnNodeClickHandler<HTMLButtonElement> = () => {
            pageState.sliderModal.merge({
                mode: 'create',
                prefillData: null,
                showModal: true,
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
        isBrandTableLoading: true,
        sliderModal: {
            prefillData: null,
            showModal: false,
            mode: 'create',
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
        getAllBrand();
    }, []);

    // draw
    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent pageState={pageState} />
            <BrandTable pageState={pageState} getAllBrand={getAllBrand} />
            <BrandSliderBase sliderState={pageState.sliderModal} getAllBrand={getAllBrand} />
        </div>
    );
};
