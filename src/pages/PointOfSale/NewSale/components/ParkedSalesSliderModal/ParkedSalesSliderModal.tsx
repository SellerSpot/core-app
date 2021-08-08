import React, { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
    Button,
    ITableCollapsedCustomRenderer,
    ITableProps,
    showNotify,
    SliderModal,
    SliderModalBody,
    SliderModalHeader,
    SliderModalLayoutWrapper,
    Table,
    TTableCellCustomRenderer,
} from '@sellerspot/universal-components';
import { ISaleData } from '@sellerspot/universal-types';
import { State, useState } from '@hookstate/core';
import { rawClone } from 'utilities/general';
import { SalesHistoryService } from '../../../SalesHistory/SalesHistory.service';
import { ICONS } from 'utilities/utilities';
import Icon from '@iconify/react';
import { ROUTES } from 'config/routes';
import { SaleHistoryExpandedView } from '../../../SalesHistory/components/SaleHistoryExpandedView/SaleHistoryExpandedView';
import { capitalize } from 'lodash';
import styles from './ParkedSalesSliderModal.module.scss';

// for using fromNow api we need relativeTime plugin to be extended
dayjs.extend(relativeTime);

interface IParkedSalesModalProps {
    parkedSalesModal: State<boolean>;
}

export const ParkedSalesSliderModal = (props: IParkedSalesModalProps): ReactElement => {
    // props
    const { parkedSalesModal } = props;
    // state
    const isLoading = useState(true);
    const isError = useState(false);
    const saleData = useState<ISaleData[]>([]);

    // hooks
    const history = useHistory();

    // effects
    // fetch table data on mount
    useEffect(() => {
        SalesHistoryService.fetchSalesHistory()
            .then((saleDataResponse) => {
                saleData.set(saleDataResponse);
                isLoading.set(false);
            })
            .catch((error) => {
                isError.set(true);
                showNotify(error?.message);
            });
    }, [parkedSalesModal.get()]);

    // handlers
    const modalGoBackHandler = () => {
        // go back handler
        parkedSalesModal.set(false);
    };

    // render helpers
    const serialNumberRenderer: TTableCellCustomRenderer<ISaleData> = (props) => {
        // props
        const { rowIndex } = props;
        // draw
        return rowIndex + 1;
    };

    const saleTimeRenderer: TTableCellCustomRenderer<ISaleData> = (props) => {
        // props
        const { rowData } = props;
        // draw
        return dayjs(rowData.createdAt).fromNow();
    };

    const nameRenderer =
        (type: 'customer' | 'user'): TTableCellCustomRenderer<ISaleData> =>
        (props) => {
            // props
            const { rowData } = props;
            // draw
            return rowData[type].name; // later we'll be having  a link to the customer, which displays chart for the particular customer
        };

    const saleTotalRenderer: TTableCellCustomRenderer<ISaleData> = (props) => {
        // props
        const { rowData } = props;
        // draw
        return rowData.payment.grandTotal; // later we'll be having  a link to the customer, which displays chart for the particular customer
    };

    const saleStatusRenderer: TTableCellCustomRenderer<ISaleData> = (props) => {
        // props
        const { rowData } = props;
        // draw
        return capitalize(rowData.status); // later we'll be having  a link to the customer, which displays chart for the particular customer
    };

    const emptyTableCTA = () => {
        // handlers
        const onClickHandler = () => history.push(ROUTES.POINT_OF_SALE__SALES__NEW_SALE);

        return (
            <Button
                label="NEW SALE"
                theme="primary"
                size="small"
                onClick={onClickHandler}
                variant="contained"
                startIcon={<Icon icon={ICONS.outlineAdd} />}
            />
        );
    };

    const collapsedContentRenderer: ITableCollapsedCustomRenderer<ISaleData> = (props) => {
        const { rowData } = props;
        return <SaleHistoryExpandedView rowData={rowData} />;
    };

    const tableProps: ITableProps<ISaleData> = {
        stickyHeader: true,
        uniqueKey: 'id',
        isLoading: isLoading.get(),
        emptyStateMessage: 'No Sales History found',
        emptyStatePrimaryCallToAction: emptyTableCTA(),
        data: rawClone(saleData.get()),
        shape: [
            {
                columnName: 'Sno',
                align: 'center',
                width: '5%',
                customRenderer: serialNumberRenderer,
            },
            {
                columnName: 'Sale time',
                align: 'left',
                width: '15%',
                customRenderer: saleTimeRenderer,
            },
            {
                columnName: 'Customer name',
                align: 'left',
                width: '20%',
                customRenderer: nameRenderer('customer'),
            },
            {
                columnName: 'Cashier name',
                align: 'left',
                width: '20%',
                customRenderer: nameRenderer('user'),
            },
            {
                columnName: 'Sale total',
                align: 'right',
                width: '20%',
                dataKey: 'customer',
                customRenderer: saleTotalRenderer,
            },
            {
                columnName: 'Status',
                align: 'center',
                width: '20%',
                dataKey: 'status',
                customRenderer: saleStatusRenderer,
            },
        ],
        collapsedContentRenderer,
    };

    // draw
    return (
        <SliderModal showModal={parkedSalesModal.get()} type={'fixed'} width={'70%'}>
            <SliderModalLayoutWrapper>
                <SliderModalHeader modalGoBackCallback={modalGoBackHandler} title="Parked sales" />
                <SliderModalBody>
                    <div className={styles.wrapper}>
                        <Table {...tableProps} />
                    </div>
                </SliderModalBody>
            </SliderModalLayoutWrapper>
        </SliderModal>
    );
};
