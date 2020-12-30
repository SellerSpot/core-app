import React, { ReactElement } from 'react';
import { getProfileHolderStyles } from './profileholder.styles';

export const ProfileHolder = (): ReactElement => {
    const styles = getProfileHolderStyles();
    return <div className={styles.profileHolderWrapper}>Profile holder</div>;
};
