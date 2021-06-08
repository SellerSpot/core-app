import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button, TButtonOnClickHandler } from '@sellerspot/universal-components';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import styles from './Brands.module.scss';
import { IBrandsPageProps } from './Brands.types';
import { BrandsTable } from './Components/BrandsTable/BrandsTable';

const PageHeaderComponent = (props: { pageState: State<IBrandsPageProps> }) => {
    // props
    const { pageState } = props;

    // components
    const NewBrandButton = () => {
        // handlers
        const onClickHandler: TButtonOnClickHandler = () => {
            pageState.showSliderModal.set(true);
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
    const pageState = useState<IBrandsPageProps>({
        brands: [],
        showSliderModal: false,
    });

    // draw
    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent pageState={pageState} />
            <BrandsTable pageState={pageState} />
        </div>
    );
};
