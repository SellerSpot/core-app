import { State, useState } from '@hookstate/core';
import { Icon } from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import React, { ReactElement, useEffect } from 'react';
import { PageHeader } from '../../../components/Compounds/PageHeader/PageHeader';
import { ICONS } from '../../../utilities/utilities';
import { StockUnitSliderBase } from './Components/StockUnitSliderBase/StockUnitSliderBase';
import { StockUnitTable } from './Components/StockUnitTable/StockUnitTable';
import styles from './StockUnit.module.scss';
import { StockUnitService } from './StockUnit.service';
import { IStockUnitPageState } from './StockUnit.types';

const PageHeaderComponent = (props: { pageState: State<IStockUnitPageState> }) => {
    // props
    const { pageState } = props;

    // components
    const NewStockUnitButton = () => {
        // handlers
        const onClickHandler = () => {
            pageState.sliderModal.merge({
                mode: 'create',
                prefillData: null,
                showModal: true,
            });
        };
        // draw
        return (
            <Button
                label="NEW STOCK UNIT"
                variant="contained"
                theme="primary"
                onClick={onClickHandler}
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
        isStockUnitTableLoading: true,
        sliderModal: {
            mode: 'create',
            prefillData: null,
            showModal: false,
        },
    });

    // handlers
    const getAllStockUnit = async (): Promise<void> => {
        const allStockUnits = await StockUnitService.getAllStockUnit();
        pageState.merge({
            stockUnits: allStockUnits,
            isStockUnitTableLoading: false,
        });
    };

    // effects
    useEffect(() => {
        getAllStockUnit();
    }, []);

    // draw
    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent pageState={pageState} />
            <StockUnitTable pageState={pageState} getAllStockUnit={getAllStockUnit} />
            <StockUnitSliderBase
                sliderState={pageState.sliderModal}
                getAllStockUnit={getAllStockUnit}
            />
        </div>
    );
};
