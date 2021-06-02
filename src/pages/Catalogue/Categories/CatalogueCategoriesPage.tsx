import Icon from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import { IPageHeaderProps, PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import styles from './CatalogueCategoriesPage.module.scss';

const PageHeaderComponent = () => {
    const getActions = (): IPageHeaderProps['actions'] => {
        return [
            <Button
                key="newcategorybutton"
                label="NEW CATEGORY"
                variant="contained"
                theme="primary"
                startIcon={<Icon icon={ICONS.outlineAdd} />}
            />,
        ];
    };

    return <PageHeader title="Categories" actions={getActions()} />;
};

export const CatalogueCategoriesPage = (): ReactElement => {
    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent />
        </div>
    );
};
