import { Button } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import styles from './PageActionButton.module.scss';
import { IPageActionButton } from './PageActionButton.types';

export default function PageActionButton(props: IPageActionButton): ReactElement {
    return (
        <Button
            fullWidth
            theme="primary"
            variant="contained"
            size={'large'}
            onClick={props.onClick}
            label={
                <div className={styles.button}>
                    <h5 className={styles.buttonText}>{props.messageLeft}</h5>
                    <h3 className={styles.buttonText}>{props.messageRight}</h3>
                </div>
            }
        />
    );
}
