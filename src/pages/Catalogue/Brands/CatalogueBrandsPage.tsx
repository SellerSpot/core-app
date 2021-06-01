import Icon from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import React, { ReactElement, useEffect } from 'react';
import { ICONS } from 'utilities/utilities';
import create from 'zustand';
import styles from './CatalogueBrandsPage.module.scss';
import { CatalogueBrandsPageService } from './CatalogueBrandsPage.service';
import { ICatalogueBrandsPageState } from './CatalogueBrandsPage.types';
import { AddEditBrandSliderModal } from './Components/AddEditBrandSliderModal/AddEditBrandSliderModal';
import { BrandsTable, IBrandsTableProps } from './Components/BrandsTable/BrandsTable';

export const useCatalogueBrandsPageState = create<ICatalogueBrandsPageState>((set) => ({
    brandsData: [],
    brandIndexToEdit: null,
    isLoadingBrandsTable: true,
    showAddEditBrandSlider: false,
    setBrandsData: ({ brandsData }) => {
        set({ brandsData });
    },
    addBrand: ({ brandData }) => {
        // const brandsData = cloneDeep(get().brandsData);
        // brandsData.push(cloneDeep(brandData));
        // debugger;
        set((state) => {
            state.brandsData.push(brandData);
            return state;
        });
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
        const brandsData = await CatalogueBrandsPageService.getAllBrand();
        debugger;
        setBrandsData({ brandsData });
        setIsLoadingBrandsTable({ isLoadingBrandsTable: false });
    };
    const editItemCallbackHandler: IBrandsTableProps['editItemCallback'] = (_, rowIndex) => {
        invokeEditBrandSlider({ brandIndexToEdit: rowIndex });
    };
    const deleteItemCallbackHandler: IBrandsTableProps['deleteItemCallback'] = (_, rowIndex) => {
        invokeEditBrandSlider({ brandIndexToEdit: rowIndex });
    };

    useEffect(() => {
        debugger;
        console.log(brandsData);
    }, [brandsData]);

    // effects
    useEffect(() => {
        getAllBrands();
    }, []);

    return (
        <>
            <div className={styles.wrapper}>
                <PageHeaderComponent />
                <div className={styles.tableWrapper}>
                    <BrandsTable
                        tableItems={brandsData}
                        isLoading={isLoadingBrandsTable}
                        editItemCallback={editItemCallbackHandler}
                        deleteItemCallback={deleteItemCallbackHandler}
                    />
                </div>
            </div>
            <AddEditBrandSliderModal />
        </>
    );
};
