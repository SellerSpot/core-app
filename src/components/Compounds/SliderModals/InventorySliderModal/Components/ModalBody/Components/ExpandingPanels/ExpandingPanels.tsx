import { useState } from '@hookstate/core';
import { ExpandableCard } from '@sellerspot/universal-components';
import { IOutletData } from '@sellerspot/universal-types';
import { DetailsContentView } from './Components/DetailsContentView/DetailsContentView';
import { SummaryContentView } from './Components/SummaryContentView/SummaryContentView';
import {
    IInventorySliderModalProps,
    IInventorySubSliderHandlers,
} from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.types';
import React, { ReactElement } from 'react';
import styles from './ExpandingPanels.module.scss';

type IExpandingPanelsProps = {
    outletsToShow: IOutletData[];
    stockUnit: string;
    formRef: IInventorySliderModalProps['formRef'];
} & Pick<IInventorySubSliderHandlers, 'onCreateTaxBracket' | 'onCreateTaxGroup'>;

type IPanelProps = {
    outlet: IOutletData;
    stockUnit: string;
    formRef: IInventorySliderModalProps['formRef'];
} & Pick<IInventorySubSliderHandlers, 'onCreateTaxBracket' | 'onCreateTaxGroup'>;

const Panel = (props: IPanelProps) => {
    // props
    const { outlet, onCreateTaxBracket, onCreateTaxGroup, formRef, stockUnit } = props;

    // localstate
    const isPanelExpanded = useState(false);

    // draw
    return (
        <ExpandableCard
            className={{
                card: styles.expandableCard,
            }}
            expanded={isPanelExpanded.get()}
            elevation={1}
            content={{
                summaryContent: (
                    <SummaryContentView isPanelExpandedState={isPanelExpanded} outlet={outlet} />
                ),
                detailsContent: (
                    <DetailsContentView
                        formRef={formRef}
                        stockUnit={stockUnit}
                        outlet={outlet}
                        onCreateTaxBracket={onCreateTaxBracket}
                        onCreateTaxGroup={onCreateTaxGroup}
                    />
                ),
            }}
        />
    );
};

export const ExpandingPanels = (props: IExpandingPanelsProps): ReactElement => {
    // props
    const { outletsToShow, onCreateTaxBracket, onCreateTaxGroup, formRef, stockUnit } = props;

    // draw
    return (
        <div className={styles.wrapper}>
            <div className={styles.outletsHeading}>
                <h4>Outlets</h4>
            </div>
            {outletsToShow.map((outlet, index) => {
                // draw
                return (
                    <Panel
                        formRef={formRef}
                        key={index}
                        stockUnit={stockUnit}
                        outlet={outlet}
                        onCreateTaxBracket={onCreateTaxBracket}
                        onCreateTaxGroup={onCreateTaxGroup}
                    />
                );
            })}
        </div>
    );
};
