import Icon from '@iconify/react';
import cn from 'classnames';
import { merge } from 'lodash';
import React, { ReactElement } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { ICONS } from 'utilities/utilities';
import styles from './SubMenuTile.module.scss';
import { ISubMenuTileProps } from './SubMenuTile.types';

const defaultProps: ISubMenuTileProps = {
    icon: ICONS.helpCircleOutline,
    miniTile: false,
    title: 'Home',
    selected: false,
    showTailIcon: false,
    childTilesVisible: false,
    disabled: false,
};

export default function SubMenuTile(props: ISubMenuTileProps): ReactElement {
    const { childTilesVisible, disabled, events, icon, miniTile, selected, showTailIcon, title } =
        merge({}, defaultProps, props);
    const wrapperClassName = cn(styles.wrapper, {
        [styles.wrapperSelected]: selected,
        [styles.wrapperMini]: miniTile,
        [styles.wrapperDisabled]: disabled,
    });

    const avatarIconClassName = cn(styles.avatarIcon, {
        [styles.avatarIconSelected]: selected,
        [styles.avatarIconDisabled]: disabled,
    });

    const titleClassName = cn(
        styles.title,
        { [styles.titleSelected]: selected && !disabled },
        { [styles.titleMini]: miniTile },
        { [styles.titleDisabled]: disabled },
    );

    const trailingIconClassName = cn(
        styles.trailingIcon,
        {
            [styles.trailingIconSelected]: selected && !disabled,
        },
        { [styles.trailingIconChildTilesVisible]: childTilesVisible },
        {
            [styles.trailingIconDisabled]: disabled,
        },
    );

    return (
        <div
            className={wrapperClassName}
            onClick={events?.onClick}
            onFocus={events?.onFocus}
            onMouseOver={events?.oneMouseOver}
            onMouseLeave={events?.onMouseLeave}
        >
            {!miniTile && (
                <div className={styles.avatar}>
                    <Icon className={avatarIconClassName} icon={icon} height={'22px'} />
                </div>
            )}
            <h6 className={titleClassName}>{title}</h6>
            {!miniTile && showTailIcon ? (
                <div className={trailingIconClassName}>
                    <MdKeyboardArrowRight />
                </div>
            ) : null}
        </div>
    );
}
