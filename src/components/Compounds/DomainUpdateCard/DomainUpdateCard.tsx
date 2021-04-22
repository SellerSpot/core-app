import cn from 'classnames';
import { Alert } from '@sellerspot/universal-components';
import { Button } from '@sellerspot/universal-components';
import { ExpandableCard } from '@sellerspot/universal-components';
import { InputField } from '@sellerspot/universal-components';
import React, { ReactElement, useState } from 'react';
import animationStyles from '../../../styles/animation.module.scss';
import styles from './DomainUpdateCard.module.scss';

export default function DomainUpdateCard(): ReactElement {
    const [cardExpanded, setCardExpanded] = useState(false);
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
                            <div
                                className={cn(
                                    {
                                        [animationStyles.fadeOut]: cardExpanded,
                                    },
                                    {
                                        [animationStyles.fadeIn]: !cardExpanded,
                                    },
                                )}
                            >
                                <Button
                                    variant="contained"
                                    onClick={() => setCardExpanded(true)}
                                    label={'Update'}
                                    theme="primary"
                                />
                            </div>
                        </div>
                    </div>
                ),
                detailsContent: (
                    <div className={styles.cardDetailsComponents}>
                        <InputField
                            label={'New Domain'}
                            placeHolder={'sreenithi'}
                            autoFocus={cardExpanded}
                            direction={'rtl'}
                            theme={
                                urlFieldState === 'success'
                                    ? 'success'
                                    : urlFieldState === 'error'
                                    ? 'danger'
                                    : 'primary'
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
                                size={'medium'}
                                variant="contained"
                                label={'Update'}
                                theme="primary"
                            />
                            <Button
                                size={'medium'}
                                variant="outlined"
                                theme="danger"
                                label={'Cancel'}
                                onClick={() => setCardExpanded(false)}
                            />
                        </div>
                        <Alert type={'warning'} title={'Warning'}>
                            <div>
                                <b>
                                    This is a destructive operation! All SEO related progress for
                                    the current domain will be lost
                                </b>
                                (You may loose user traction to your e-commerce site if the feature
                                has been activated)
                            </div>
                        </Alert>
                    </div>
                ),
            }}
        />
    );
}
