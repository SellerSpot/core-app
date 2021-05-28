import Icon from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import {
    IStandardDataViewTableProps,
    StandardDataViewTable,
} from 'components/Compounds/StandardDataViewTable/StandardDataViewTable';
import React, { ReactElement, useEffect, useState } from 'react';
import { requests } from 'requests/requests';
import { ICatalogueBrands_GetAllBrands } from 'requests/typings/Catalogue/CatalogueBrands.types';
import { ICONS } from 'utilities/utilities';
import styles from './CatalogueBrandsPage.module.scss';

const PageHeaderComponent = () => {
    const getActions = () => {
        return [
            <Button
                key="addBrandButton"
                label="ADD BRAND"
                theme="primary"
                variant="contained"
                startIcon={<Icon icon={ICONS.outlineAdd} />}
            />,
        ];
    };

    return <PageHeader title="Brands" actions={getActions()} />;
};

export const CatalogueBrandsPage = (): ReactElement => {
    const [isLoadingBrandsTable, setIsLoadingBrandsTable] = useState(true);
    const [allBrands, setAllBrands] = useState<ICatalogueBrands_GetAllBrands['data']>([]);

    const getAllBrandsData = async () => {
        const allBrandsData = await requests.catalogue.brandRequest.getAllBrands();
        setAllBrands(allBrandsData);
        setIsLoadingBrandsTable(false);
    };

    useEffect(() => {
        getAllBrandsData();
    }, []);

    const getTableItems = (): IStandardDataViewTableProps['tableItems'] => {
        return allBrands.map((brand) => {
            const { description, name, noOfProducts } = brand;
            return {
                name,
                description,
                noOfProducts,
                deleteItemCallback: null,
                editItemCallback: null,
            };
        });
    };

    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent />
            <div className={styles.tableWrapper}>
                <StandardDataViewTable
                    tableItems={getTableItems()}
                    isLoading={isLoadingBrandsTable}
                />
            </div>
        </div>
    );
};
