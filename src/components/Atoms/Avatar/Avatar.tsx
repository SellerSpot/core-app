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
    disabled: false,
};

export default function Avatar(props: IAvatarProps) {
    const requiredProps = merge({}, defaultProps, props);

    const className = !requiredProps.disabled
        ? cn(
              styles.avatar,
              { [styles.selectedNoBg]: requiredProps.theme === 'selectedNoBg' },
              { [styles.selected]: requiredProps.theme === 'selected' },
              { [styles.unselected]: requiredProps.theme === 'unselected' },
          )
        : cn(styles.avatar, styles.disabled);

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
