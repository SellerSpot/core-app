import React from 'react';
import styles from './SubmenuTile.module.scss';
import cn from 'classnames';
import { ISubmenuTileProps } from './SubmenuTile.types';
import { merge } from 'lodash';
import Avatar from 'components/Atoms/Avatar/Avatar';
import { ICONS } from 'utilities/icons';

const defaultProps: ISubmenuTileProps = {
    leading: <ICONS.HomeWorkspace />,
    miniTile: false,
};

export default function SubmenuTile(props: ISubmenuTileProps) {
    const requiredProps = merge(defaultProps, props);

    const wrapperClassName = cn(styles.wrapper);

    return (
        <div className={wrapperClassName}>
            {!requiredProps.miniTile ? (
                <Avatar
                    className={requiredProps.className?.avatar}
                    content={requiredProps.leading}
                    theme={'selectedNoBg'}
                    varient={'circle'}
                    style={requiredProps.style?.avatar}
                />
            ) : null}
            <h5></h5>
        </div>
    );
}
