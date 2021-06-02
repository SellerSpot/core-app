import { DevTools, State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import React, { ReactElement, useEffect } from 'react';
import { ICONS } from 'utilities/utilities';
import styles from './CatalogueBrandsPage.module.scss';
import { CatalogueBrandsPageService } from './CatalogueBrandsPage.service';
import { ICatalogueBrandsPageState } from './CatalogueBrandsPage.types';
import { AddEditBrandSliderModal } from './Components/AddEditBrandSliderModal/AddEditBrandSliderModal';
import { BrandsTable, IBrandsTableProps } from './Components/BrandsTable/BrandsTable';

const PageHeaderComponent = (props: { pageState: State<ICatalogueBrandsPageState> }) => {
    const { pageState } = props;

    // handlers
    const getActions = () => {
        // handlers
        const handleClick = () => {
            pageState.merge({
                showAddEditBrandSlider: true,
                brandIndexToEdit: null,
            });
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
    const pageState = useState<ICatalogueBrandsPageState>(
        CatalogueBrandsPageService.pageStateInitialData,
    );
    DevTools(pageState).label('Brand Page state');

    // handlers
    const getAllBrands = async () => {
        const brandsData = await CatalogueBrandsPageService.getAllBrand();
        pageState.merge({
            brandsData,
            isLoadingBrandsTable: false,
        });
    };
    const editItemCallbackHandler: IBrandsTableProps['editItemCallback'] = (_, rowIndex) => {
        pageState.brandIndexToEdit.set(rowIndex);
    };
    const deleteItemCallbackHandler: IBrandsTableProps['deleteItemCallback'] = (_, rowIndex) => {
        pageState.brandIndexToEdit.set(rowIndex);
    };

    // effects
    useEffect(() => {
        getAllBrands();
    }, []);

    return (
        <>
            <div className={styles.wrapper}>
                <PageHeaderComponent pageState={pageState} />
                <div className={styles.tableWrapper}>
                    <BrandsTable
                        tableItems={pageState.brandsData.get()}
                        isLoading={pageState.isLoadingBrandsTable.get()}
                        editItemCallback={editItemCallbackHandler}
                        deleteItemCallback={deleteItemCallbackHandler}
                    />
                </div>
            </div>
            <AddEditBrandSliderModal pageState={pageState} />
        </>
    );
};
