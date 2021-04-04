import Alert from 'components/Atoms/Alert/Alert';
import Button from 'components/Atoms/Button/Button';
import Card from 'components/Atoms/Card/Card';
import React, { ReactElement } from 'react';
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
                        <div>Hi there</div>
                        <Button
                            size={'medium'}
                            state={'danger'}
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
