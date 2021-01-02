import { AppHolder } from 'components/AppHolder/AppHolder';
import React, { ReactElement } from 'react';
import { getTilesHolderStyles } from './tilesholder.styles';

export const TilesHolder = (): ReactElement => {
    const styles = getTilesHolderStyles();
    return (
        <div className={styles.tilesHolderWrapper}>
            <AppHolder />
            <AppHolder />
            <AppHolder />
        </div>
    );
};
