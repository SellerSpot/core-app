import { State, useState } from '@hookstate/core';
import { Icon } from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { PageHeader } from '../../../components/Compounds/PageHeader/PageHeader';
import { ICONS } from '../../../utilities/utilities';
import { StockUnitTable } from './Components/StockUnitTable/StockUnitTable';
import styles from './StockUnit.module.scss';
import { IStockUnitPageState } from './StockUnit.types';

const PageHeaderComponent = (props: { pageState: State<IStockUnitPageState> }) => {
    // props
    const {} = props;

    // components
    const NewStockUnitButton = () => {
        return (
            <Button
                label="NEW STOCK UNIT"
                variant="contained"
                theme="primary"
                startIcon={<Icon icon={ICONS.outlineAdd} />}
            />
        );
    };

    // draw
    return (
        <PageHeader
            title={'Stock Units'}
            actions={[<NewStockUnitButton key={'NewStockUnitButton'} />]}
        />
    );
};

export const StockUnit = (): ReactElement => {
    // state
    const pageState = useState<IStockUnitPageState>({
        stockUnits: [],
    });

    // draw
    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent pageState={pageState} />
            <StockUnitTable pageState={pageState} />
        </div>
    );
};
