import { Button } from '@material-ui/core';
import cn from 'classnames';
import Alert from 'components/Atoms/Alert/Alert';
import ExpandableCard from 'components/Atoms/ExpandableCard/ExpandableCard';
import InputField from 'components/Atoms/InputField/InputField';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import animationStyles from '../../../styles/animation.module.scss';
import styles from './DomainUpdateCard.module.scss';

export default function DomainUpdateCard(): ReactElement {
    const [cardExpanded, setCardExpanded] = useState(false);
    const [urlFieldState, setUrlFieldState] = useState<'default' | 'success' | 'error'>('default');
    const [urlFieldHelperText, setUrlFieldHelperText] = useState('Please enter your new domain');
    const domainFieldRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (cardExpanded) {
            domainFieldRef.current?.focus();
        }
    }, [cardExpanded]);

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
        <ExpandableCard
            expanded={cardExpanded}
            className={{
                card: styles.card,
                detailsWrapper: styles.cardDetails,
            }}
            content={{
                summaryContent: (
                    <div className={styles.cardSummary}>
                        <div className={styles.cardLHSComponents}>
                            <h5>Your Current Domain</h5>
                            <h6 className={styles.domainAddress}>sreeenithi.sellerspot.in</h6>
                        </div>
                        <div className={styles.cardRHSComponents}>
                            <div>
                                <Button
                                    className={cn(
                                        {
                                            [animationStyles.fadeOut]: cardExpanded,
                                        },
                                        {
                                            [animationStyles.fadeIn]: !cardExpanded,
                                        },
                                    )}
                                    variant={'contained'}
                                    color={'primary'}
                                    onClick={() => setCardExpanded(true)}
                                >
                                    Update
                                </Button>
                            </div>
                        </div>
                    </div>
                ),
                detailsContent: (
                    <div className={styles.cardDetailsComponents}>
                        <InputField
                            // ref={domainFieldRef}
                            label={'New Domain'}
                            placeHolder={'sreenithi'}
                            autoFocus={cardExpanded}
                            direction={'rtl'}
                            state={
                                urlFieldState === 'success'
                                    ? 'success'
                                    : urlFieldState === 'error'
                                    ? 'error'
                                    : 'default'
                            }
                            suffix={<h6>.sellerspot.in</h6>}
                            helperMessage={{
                                enabled: urlFieldState === 'error' || urlFieldState === 'success',
                                content: urlFieldHelperText,
                                type:
                                    urlFieldState === 'error'
                                        ? 'error'
                                        : urlFieldState === 'success'
                                        ? 'success'
                                        : 'none',
                            }}
                            onChange={(event) => {
                                urlFieldOnChangeHandler(event.target.value);
                            }}
                        />
                        <div className={styles.cardActions}>
                            <Button
                                className={styles.updateCardActionButton}
                                size="medium"
                                color="primary"
                                variant={'contained'}
                            >
                                Update
                            </Button>
                            <Button
                                className={styles.cancelCardActionButton}
                                size="medium"
                                variant={'outlined'}
                                color={'secondary'}
                                onClick={() => setCardExpanded(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                        <Alert type={'warning'} title={'Warning'}>
                            <b>
                                This is a destructive operation! All SEO related progress for the
                                current domain will be lost
                            </b>{' '}
                            (You may loose user traction to your e-commerce site if the feature has
                            been activated)
                        </Alert>
                    </div>
                ),
            }}
        />
    );
}
