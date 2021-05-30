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

const useCatalogueBrandsPageState = create<ICatalogueBrandsPageState>((set) => ({
    brandsData: [],
    isLoadingBrandsTable: true,
    showAddEditBrandSlider: false,
    setBrandsData: (data) => {
        set({ brandsData: data });
    },
    setIsLoadingBrandsTable: (data) => {
        set({ isLoadingBrandsTable: data });
    },
    invokeAddBrandSlider: () => {
        set({ showAddEditBrandSlider: true });
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
        showAddEditBrandSlider,
        brandsData,
        setIsLoadingBrandsTable,
    } = useCatalogueBrandsPageState();

    // effects
    useEffect(() => {
        (async () => {
            const allBrandsData = await CatalogueBrandsPageService.getAllBrandsData();
            setBrandsData(allBrandsData);
            setIsLoadingBrandsTable(false);
        }).call(null);
    }, []);

    return (
        <>
            <div className={styles.wrapper}>
                <PageHeaderComponent />
                <div className={styles.tableWrapper}>
                    <StandardDataViewTable
                        tableItems={CatalogueBrandsPageService.getTableItems(brandsData)}
                        isLoading={isLoadingBrandsTable}
                    />
                </div>
            </div>
            <AddEditBrandSliderModal show={showAddEditBrandSlider} />
        </>
    );
};
