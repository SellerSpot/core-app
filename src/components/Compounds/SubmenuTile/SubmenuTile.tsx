import cn from 'classnames';
import Avatar from 'components/Atoms/Avatar/Avatar';
import { merge } from 'lodash';
import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { ICONS } from 'utilities/icons';
import styles from './SubmenuTile.module.scss';
import { ISubmenuTileProps } from './SubmenuTile.types';

const defaultProps: ISubmenuTileProps = {
    leading: <ICONS.HomeWorkspace />,
    miniTile: false,
    title: 'Home',
    selected: false,
    showTailIcon: false,
};

export default function SubmenuTile(props: ISubmenuTileProps) {
    const requiredProps = merge(defaultProps, props);

    const wrapperClassName = cn(styles.wrapper, {
        [styles.wrapperSelected]: requiredProps.selected,
        [styles.wrapperMini]: requiredProps.miniTile,
    });

    const titleClassName = cn(
        styles.title,
        { [styles.titleSelected]: requiredProps.selected },
        { [styles.titleMini]: requiredProps.miniTile },
    );

    const trailingIconClassName = cn(styles.trailingIcon, {
        [styles.trailingIconSelected]: requiredProps.selected,
    });

    return (
        <div className={wrapperClassName}>
            {!requiredProps.miniTile ? (
                <div className={styles.avatar}>
                    <Avatar
                        content={requiredProps.leading}
                        theme={requiredProps.selected ? 'selectedNoBg' : 'unselected'}
                        varient={'circle'}
                    />
                </div>
            ) : null}
            <h5 className={titleClassName}>{requiredProps.title}</h5>
            {!requiredProps.miniTile ? (
                <div className={trailingIconClassName}>
                    <MdKeyboardArrowRight />
                </div>
            ) : null}
        </div>
    );
}
