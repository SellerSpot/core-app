import React from 'react';
import { Avatar as MUIAvatar } from '@material-ui/core';
import { merge } from 'lodash';
import { IAvatarProps } from './Avatar.types';
import cn from 'classnames';
import styles from './Avatar.module.scss';

const defaultProps: IAvatarProps = {
    content: 'S',
    varient: 'rounded',
    theme: 'unselected',
};

export default function Avatar(props: IAvatarProps) {
    const requiredProps = merge(defaultProps, props);

    const className = cn(
        { [styles.selectedNoBg]: props.theme === 'selectedNoBg' },
        { [styles.selected]: props.theme === 'selected' },
        { [styles.unselected]: props.theme === 'unselected' },
        props.className,
    );

    return (
        <MUIAvatar
            className={className}
            alt={'image'}
            variant={requiredProps.varient}
            src={requiredProps.imgSrc}
            style={requiredProps.style}
        >
            {requiredProps.content}
        </MUIAvatar>
    );
}
