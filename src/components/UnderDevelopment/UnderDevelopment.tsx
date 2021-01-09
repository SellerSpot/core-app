import { UnderConstruction } from 'images/images';
import React, { ReactElement } from 'react';
import { getUnderDevelopmentStyles } from './underDevelopment.styles';

const styles = getUnderDevelopmentStyles();

export const UnderDevelopment = (): ReactElement => {
    return (
        <div className={styles.underDevelopmentWrapper}>
            <img className={styles.illustrationImageHolder} src={UnderConstruction} alt="" />
            <h1 className={styles.underDevelopmentTitle}>This feature is Under development</h1>
        </div>
    );
};
