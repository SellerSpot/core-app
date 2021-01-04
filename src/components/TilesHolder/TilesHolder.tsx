import { AppHolder } from 'components/AppHolder/AppHolder';
import React, { ReactElement } from 'react';
import { getTilesHolderStyles } from './tilesholder.styles';

export interface ITilesHolder {
    children?: ReactElement | ReactElement[];
    /**
     * Tiles display direction
     *
     * @default
     * horizontal
     */
    orientation?: 'vertical' | 'horizontal';
    /**
     * custom styles can be passed to override default styles
     */
    styles?: React.CSSProperties;
}

export const TilesHolder = (props: ITilesHolder): ReactElement => {
    const styles = getTilesHolderStyles();
    return (
        <div className={styles.tilesHolderWrapper} style={props.styles}>
            {props.children}
        </div>
    );
};
