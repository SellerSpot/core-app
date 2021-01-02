import { AppHolder } from 'components/AppHolder/AppHolder';
import React, { ReactElement } from 'react';
import { getTilesHolderStyles } from './tilesholder.styles';

export interface ITilesHolder {
    children?: ReactElement[];
    /**
     * Tiles display direction
     *
     * @default
     * horizontal
     */
    orientation?: 'vertical' | 'horizontal';
}

export const TilesHolder = (props: ITilesHolder): ReactElement => {
    const styles = getTilesHolderStyles();
    return <div className={styles.tilesHolderWrapper}>{props.children}</div>;
};
