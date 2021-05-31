import Icon from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import { StandardDataViewTable } from 'components/Compounds/StandardDataViewTable/StandardDataViewTable';
import React, { ReactElement, useEffect } from 'react';
import { ICONS } from 'utilities/utilities';
import create from 'zustand';
import styles from './CatalogueBrandsPage.module.scss';
import { CatalogueBrandsPageService } from './CatalogueBrandsPage.service';
import { ICatalogueBrandsPageState } from './CatalogueBrandsPage.types';
import { AddEditBrandSliderModal } from './Components/AddEditBrandSliderModal/AddEditBrandSliderModal';

export const useCatalogueBrandsPageState = create<ICatalogueBrandsPageState>((set) => ({
    brandsData: [],
    brandIndexToEdit: null,
    isLoadingBrandsTable: true,
    showAddEditBrandSlider: false,
    setBrandsData: ({ brandsData }) => {
        set({ brandsData });
    },
    setIsLoadingBrandsTable: ({ isLoadingBrandsTable }) => {
        set({ isLoadingBrandsTable });
    },
    invokeAddBrandSlider: () => {
        set({ showAddEditBrandSlider: true, brandIndexToEdit: null });
    },
    invokeEditBrandSlider: ({ brandIndexToEdit }) => {
        set({ showAddEditBrandSlider: true, brandIndexToEdit });
    },
    closeBrandSlider: () => {
        set({ showAddEditBrandSlider: false, brandIndexToEdit: null });
    },
}));

const PageHeaderComponent = () => {
    const { invokeAddBrandSlider } = useCatalogueBrandsPageState();

    // handlers
    const getActions = () => {
        // handlers
        const handleClick = () => {
            invokeAddBrandSlider();
        };
        return [
            <Button
                key="addBrandButton"
                label="ADD BRAND"
                theme="primary"
                variant="contained"
                onClick={handleClick}
                startIcon={<Icon icon={ICONS.outlineAdd} />}
            />,
        ];
    };

    return <PageHeader title="Brands" actions={getActions()} />;
};

export const CatalogueBrandsPage = (): ReactElement => {
    // state
    const {
        isLoadingBrandsTable,
        setBrandsData,
        brandsData,
        setIsLoadingBrandsTable,
        invokeEditBrandSlider,
    } = useCatalogueBrandsPageState();

    // handlers
    const getAllBrands = async () => {
        const brandsData = await CatalogueBrandsPageService.getAllBrandsData();
        setBrandsData({ brandsData });
        setIsLoadingBrandsTable({ isLoadingBrandsTable: false });
    };

    // effects
    useEffect(() => {
        getAllBrands();
    }, []);

    // compute
    const tableItems = CatalogueBrandsPageService.getTableItems(brandsData, invokeEditBrandSlider);

    return (
        <>
            <div className={styles.wrapper}>
                <PageHeaderComponent />
                <div className={styles.tableWrapper}>
                    <StandardDataViewTable
                        tableItems={tableItems}
                        isLoading={isLoadingBrandsTable}
                    />
                </div>
            </div>
            <AddEditBrandSliderModal />
        </>
    );
};
