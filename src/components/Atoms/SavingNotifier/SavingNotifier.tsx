import React, { ReactElement } from 'react';
import { CircularProgress } from '@sellerspot/universal-components';
import styles from './SavingNotifier.module.scss';

interface ISavingNotifierProps {
    isSaving: boolean;
}

export const SavingNotifier = (props: ISavingNotifierProps): ReactElement => {
    const { isSaving } = props;
    return (
        <div className={styles.savingNotifier}>
            {isSaving && (
                <>
                    <CircularProgress size={'12px'} theme="auto" />
                    <div>saving</div>
                </>
            )}
        </div>
    );
};
