import cn from 'classnames';
import { merge } from 'lodash';
import React, { ReactElement } from 'react';
import styles from './Avatar.module.scss';
import { IAvatarProps } from './Avatar.types';

const defaultProps: IAvatarProps = {
    content: 'S',
    varient: 'rounded',
    theme: 'unselected',
    disabled: false,
    size: 'default',
};

export default function Avatar(props: IAvatarProps): ReactElement {
    const requiredProps = merge({}, defaultProps, props);

    const className = !requiredProps.disabled
        ? cn(
              styles.wrapper,
              { [styles.selectedNoBg]: requiredProps.theme === 'selectedNoBg' },
              { [styles.selected]: requiredProps.theme === 'selected' },
              { [styles.unselected]: requiredProps.theme === 'unselected' },
              { [styles.smallWrapper]: requiredProps.size === 'small' },
          )
        : cn(styles.wrapper, styles.disabled, {
              [styles.smallWrapper]: requiredProps.size === 'small',
          });

    return <div className={className}>{requiredProps.content}</div>;
}
