import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    InputAdornment,
    TextField,
} from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import styles from './DomainUpdateCard.module.scss';

export default function DomainUpdateCard(): ReactElement {
    const [cardExpanded, setCardExpanded] = useState(true);

    return (
        <Accordion expanded={cardExpanded} className={styles.card}>
            <AccordionSummary className={styles.cardSummary}>
                <div className={styles.cardLHSComponents}>
                    <h5>Your Current Domain</h5>
                    <h6 className={styles.domainAddress}>sreeenithi.sellerspot.in</h6>
                </div>
                <div className={styles.cardRHSComponents}>
                    <Button
                        variant={'contained'}
                        color={'primary'}
                        onClick={() => setCardExpanded(true)}
                    >
                        Update
                    </Button>
                </div>
            </AccordionSummary>
            <AccordionDetails className={styles.cardDetails}>
                <TextField
                    label={'New Domain'}
                    variant={'outlined'}
                    placeholder={'sreenithi'}
                    inputProps={{
                        style: {
                            textAlign: 'right',
                            fontWeight: 600,
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position={'end'}>
                                <h6>.sellerspot.in</h6>
                            </InputAdornment>
                        ),
                    }}
                />
            </AccordionDetails>
        </Accordion>
    );
}
