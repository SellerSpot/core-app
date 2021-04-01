import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
    InputAdornment,
    TextField,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
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
                <div className={styles.cardDetailsComponents}>
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
                    <Alert severity="warning">
                        <AlertTitle>Warning</AlertTitle>
                        <b>
                            This is a destructive operation! All SEO related progress for the
                            current domain will be lost
                        </b>{' '}
                        (You may loose user traction to your e-commerce site if the feature has been
                        activated)
                    </Alert>
                </div>
            </AccordionDetails>
            <AccordionActions>
                <Button size="small" onClick={() => setCardExpanded(false)}>
                    Cancel
                </Button>
                <Button size="small" color="primary">
                    Update Domain
                </Button>
            </AccordionActions>
        </Accordion>
    );
}
