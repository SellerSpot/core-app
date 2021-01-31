import React, { ReactElement } from 'react';
import styles from './tilesholder.module.scss';

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
    return (
        <div className={styles.tilesHolderWrapper} style={props.styles}>
            {props.children}
        </div>
    );
};
