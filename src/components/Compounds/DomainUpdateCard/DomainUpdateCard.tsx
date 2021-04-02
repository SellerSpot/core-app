import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    InputAdornment,
    TextField,
    ThemeProvider,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import cn from 'classnames';
import { successMUITheme } from 'config/themes';
import React, { ReactElement, useState } from 'react';
import styles from './DomainUpdateCard.module.scss';

export default function DomainUpdateCard(): ReactElement {
    const [cardExpanded, setCardExpanded] = useState(true);
    const [urlFieldState, setUrlFieldState] = useState<'default' | 'success' | 'error'>('default');
    const [urlFieldHelperText, setUrlFieldHelperText] = useState('Please enter your new domain');

    const urlFieldOnChangeHandler = (typedString: string) => {
        if (typedString.length > 0) {
            if (typedString.length < 3) {
                setUrlFieldState('error');
                setUrlFieldHelperText('This url is too short');
            } else if (typedString === 'admin') {
                setUrlFieldState('error');
                setUrlFieldHelperText('This url is not available');
            } else {
                setUrlFieldState('success');
                setUrlFieldHelperText('This url is available!');
            }
        } else {
            setUrlFieldState('default');
            setUrlFieldHelperText('Please enter your new domain');
        }
    };

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
                    <ThemeProvider theme={urlFieldState === 'success' ? successMUITheme : null}>
                        <TextField
                            label={'New Domain'}
                            variant={'outlined'}
                            placeholder={'sreenithi'}
                            color={'primary'}
                            inputProps={{
                                style: {
                                    textAlign: 'right',
                                    fontWeight: 600,
                                },
                            }}
                            FormHelperTextProps={{
                                className: cn({
                                    [styles.helperTextSuccess]: urlFieldState === 'success',
                                }),
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position={'end'}>
                                        <h6>.sellerspot.in</h6>
                                    </InputAdornment>
                                ),
                            }}
                            error={urlFieldState === 'error'}
                            helperText={urlFieldHelperText}
                            onChange={(event) => {
                                urlFieldOnChangeHandler(event.target.value);
                            }}
                        />
                    </ThemeProvider>
                    <div className={styles.cardActions}>
                        <Button
                            className={styles.updateButton}
                            size="medium"
                            color="primary"
                            variant={'contained'}
                        >
                            Update
                        </Button>
                        <Button
                            className={styles.cancelButton}
                            size="medium"
                            variant={'outlined'}
                            color={'secondary'}
                            onClick={() => setCardExpanded(false)}
                        >
                            Cancel
                        </Button>
                    </div>
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
        </Accordion>
    );
}
