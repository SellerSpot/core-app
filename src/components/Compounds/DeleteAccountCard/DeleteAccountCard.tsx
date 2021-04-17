import { Alert } from '@sellerspot/universal-components';
import { Button } from '@sellerspot/universal-components';
import Card from 'components/Atoms/Card/Card';
import { colorThemes, fontSizeThemes } from 'config/themes';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'store/models/theme';
import styles from './DeleteAccountCard.module.scss';

export default function DeleteAccountCard(): ReactElement {
    return (
        <Card
            className={{
                cardWrapper: styles.card,
                contentWrapper: styles.cardContentWrapper,
            }}
            content={
                <div className={styles.content}>
                    <div className={styles.topContent}>
                        <div className={styles.domainMessage}>
                            <h5>Delete your account</h5>
                            <h6>
                                <a
                                    href="https://sreenithi.dashboard.sellerspot.in"
                                    target="_blank"
                                    rel="noreferrer"
                                    className={styles.link}
                                >
                                    sreenithi.dashboard.sellerspot.in
                                </a>
                            </h6>
                        </div>
                        <Button
                            size={'medium'}
                            theme={'danger'}
                            variant={'contained'}
                            label={'Delete'}
                        />
                    </div>
                    <div className={styles.bottomContent}>
                        <Alert title={'Danger'} type={'error'}>
                            This is a desctructive operation! All data generated in this account
                            will be deleted permanently
                        </Alert>
                    </div>
                </div>
            }
        />
    );
}
