import { useState } from '@hookstate/core';
import { ExpandableCard } from '@sellerspot/universal-components';
import { IOutletData } from '@sellerspot/universal-types';
import { DetailsContentView } from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/ExpandingPanels/Components/DetailsContentView/DetailsContentView';
import { SummaryContentView } from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/ExpandingPanels/Components/SummaryContentView/SummaryContentView';
import React, { ReactElement } from 'react';
import styles from './ExpandingPanels.module.scss';

interface IExpandingPanelsProps {
    outletsToShow: IOutletData[];
}

interface IPanelProps {
    outlet: IOutletData;
}

const Panel = (props: IPanelProps) => {
    // props
    const { outlet } = props;

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
                detailsContent: <DetailsContentView outlet={outlet} />,
            }}
        />
    );
};

export const ExpandingPanels = (props: IExpandingPanelsProps): ReactElement => {
    // props
    const { outletsToShow } = props;

    // draw
    return (
        <div className={styles.wrapper}>
            <div className={styles.outletsHeading}>
                <h4>Outlets</h4>
            </div>
            {outletsToShow.map((outlet, index) => {
                // draw
                return <Panel key={index} outlet={outlet} />;
            })}
        </div>
    );
};
