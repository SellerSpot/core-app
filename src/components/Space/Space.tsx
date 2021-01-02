import { cx } from '@emotion/css';
import React, { ReactElement } from 'react';
import { getSpaceStyles } from './space.styles';
import lodash from 'lodash';

export interface ISpaceProps {
    /**
     * @remarks
     * size: number (in unit pixel)
     * @default
     * `size: 20`
     */
    size?: number;
    /**
     * @remarks
     * used to choose vertical or horizontal space.
     * @default
     * `orientation: 'vertical'`
     */
    orientation?: 'vertical' | 'horizontal';
    style?: React.CSSProperties;
    className?: string;
}

export const Space = (props: ISpaceProps): ReactElement => {
    const defaultProps: ISpaceProps = {
        className: '',
        style: {},
        orientation: 'vertical',
        size: 20,
    };

    const requiredProps = lodash.merge(defaultProps, props);

    const styles = getSpaceStyles(requiredProps);

    return (
        <div
            className={cx(styles.spaceWrapper, requiredProps.className)}
            style={requiredProps.style}
        ></div>
    );
};
