import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { IExpandableCardProps } from './ExpandableCard.types';

export default function ExpandableCard(props: IExpandableCardProps): ReactElement {
    return (
        <Accordion className={props.className?.card} expanded={props.expanded}>
            <AccordionSummary className={props.className?.summaryWrapper}>
                {props.content.summaryContent}
            </AccordionSummary>
            <AccordionDetails className={props.className?.detailsWrapper}>
                {props.content.detailsContent}
            </AccordionDetails>
        </Accordion>
    );
}
