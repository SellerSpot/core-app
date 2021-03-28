import { Avatar as MUIAvatar } from '@material-ui/core';
import cn from 'classnames';
import { merge } from 'lodash';
import React from 'react';
import styles from './Avatar.module.scss';
import { IAvatarProps } from './Avatar.types';

const defaultProps: IAvatarProps = {
    content: 'S',
    varient: 'rounded',
    theme: 'unselected',
};

export default function Avatar(props: IAvatarProps) {
    const requiredProps = merge(defaultProps, props);

    const className = cn(
        styles.avatar,
        { [styles.selectedNoBg]: props.theme === 'selectedNoBg' },
        { [styles.selected]: props.theme === 'selected' },
        { [styles.unselected]: props.theme === 'unselected' },
    );

    return (
        <MUIAvatar
            className={className}
            alt={'image'}
            variant={requiredProps.varient}
            src={requiredProps.imgSrc}
        >
            {requiredProps.content}
        </MUIAvatar>
    );
}
