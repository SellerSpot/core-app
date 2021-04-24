import { ICONS } from 'utilities/icons';
import { MdKeyboardArrowRight } from 'react-icons/md';
import React, { ReactElement } from 'react';
import { merge } from 'lodash';
import cn from 'classnames';
import { Avatar } from '@sellerspot/universal-components';
import { ISubMenuTileProps } from './SubMenuTile.types';
import styles from './SubMenuTile.module.scss';

const defaultProps: ISubMenuTileProps = {
    icon: <ICONS.BsQuestionSquare />,
    miniTile: false,
    title: 'Home',
    selected: false,
    showTailIcon: false,
    childTilesVisible: false,
    disabled: false,
};

export default function SubMenuTile(props: ISubMenuTileProps): ReactElement {
    const requiredProps = merge({}, defaultProps, props);
    const wrapperClassName = cn(styles.wrapper, {
        [styles.wrapperSelected]: requiredProps.selected,
        [styles.wrapperMini]: requiredProps.miniTile,
        [styles.wrapperDisabled]: requiredProps.disabled,
    });

    const titleClassName = cn(
        styles.title,
        { [styles.titleSelected]: requiredProps.selected && !requiredProps.disabled },
        { [styles.titleMini]: requiredProps.miniTile },
        { [styles.titleDisabled]: requiredProps.disabled },
    );

    const trailingIconClassName = cn(
        styles.trailingIcon,
        {
            [styles.trailingIconSelected]: requiredProps.selected && !requiredProps.disabled,
        },
        { [styles.trailingIconChildTilesVisible]: requiredProps.childTilesVisible },
        {
            [styles.trailingIconDisabled]: requiredProps.disabled,
        },
    );

    return (
        <div
            className={wrapperClassName}
            onClick={requiredProps.events?.onClick}
            onFocus={requiredProps.events?.onFocus}
            onMouseOver={requiredProps.events?.oneMouseOver}
            onMouseLeave={requiredProps.events?.onMouseLeave}
        >
            {!requiredProps.miniTile ? (
                <div className={styles.avatar}>
                    <Avatar
                        content={requiredProps.icon}
                        theme={requiredProps.selected ? 'selectedNoBg' : 'unselected'}
                        variant={'circular'}
                        disabled={requiredProps.disabled}
                    />
                </div>
            ) : null}
            <h5 className={titleClassName}>{requiredProps.title}</h5>
            {!requiredProps.miniTile && requiredProps.showTailIcon ? (
                <div className={trailingIconClassName}>
                    <MdKeyboardArrowRight />
                </div>
            ) : null}
        </div>
    );
}
