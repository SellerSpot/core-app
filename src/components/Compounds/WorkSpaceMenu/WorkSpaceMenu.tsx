import Icon from '@iconify/react';
import { ExpandWorkspaceMenuButton } from '@sellerspot/universal-components';
import cn from 'classnames';
import React, { Fragment, ReactElement, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { routeSelector } from 'store/models/route';
import create from 'zustand';
import animationStyles from '../../../styles/animation.module.scss';
import { StoreInformationWorkSpaceTile } from '../StoreInformationWorkSpaceTile/StoreInformationWorkSpaceTile';
import { WorkSpaceTile } from '../WorkSpaceTile/WorkSpaceTile';
import styles from './WorkSpaceMenu.module.scss';
import { WorkSpaceMenuService } from './WorkSpaceMenu.service';
import { IUseWorkSpaceMenuStore } from './WorkSpaceMenu.types';

const useWorkSpaceMenuStore = create<IUseWorkSpaceMenuStore>((set) => ({
    expandMenu: false,
    hoverMenu: false,
    setExpandMenu: (value) => {
        set({ expandMenu: value });
    },
    setHoverMenu: (value) => {
        set({ hoverMenu: value });
    },
}));

const ExpandMenuIcon = () => {
    const { expandMenu, hoverMenu, setExpandMenu } = useWorkSpaceMenuStore();
    const className = cn(
        styles.expandIcon,
        { [animationStyles.fadeIn]: hoverMenu && !expandMenu },
        { [styles.expandIconFadeOut]: !hoverMenu && !expandMenu },
        { [styles.expandIconRotate]: expandMenu },
        { [styles.expandIconRotateReverse]: !expandMenu },
    );

    return (
        <div className={className}>
            <ExpandWorkspaceMenuButton
                onClick={() => {
                    setExpandMenu(!expandMenu);
                }}
            />
        </div>
    );
};

const WorkSpaceTiles = () => {
    const expandMenu = useWorkSpaceMenuStore((state) => state.expandMenu);
    const { routeKeys } = useSelector(routeSelector);
    const tiles = WorkSpaceMenuService.getWorkSpaces();
    const history = useHistory();

    return (
        <div className={styles.workSpaceTilesWrapper}>
            {Object.values(tiles).map((tile, tileIndex) => {
                const { icon, title, redirectRoute, routeKey } = tile;
                const handleTileClick = () => {
                    history.push(redirectRoute);
                };
                return (
                    <Fragment key={tileIndex}>
                        <WorkSpaceTile
                            workspaceIcon={<Icon icon={icon} height={'24px'} />}
                            toolTipText={title}
                            workspaceTitle={title}
                            expanded={expandMenu}
                            selected={routeKeys.includes(routeKey)}
                            events={{
                                onClick: handleTileClick,
                            }}
                        />
                    </Fragment>
                );
            })}
        </div>
    );
};

export const WorkSpaceMenu = (): ReactElement => {
    const { setExpandMenu, setHoverMenu, expandMenu } = useWorkSpaceMenuStore();
    const workSpaceMenuRef = useRef(null);

    const handleOnMouseEnter = () => setHoverMenu(true);
    const handleOnMouseLeave = () => setHoverMenu(false);
    const wrapperClassName = cn(styles.wrapper, { [styles.wrapperExpanded]: expandMenu });

    // handler for document onClickListener
    const onClickListener = useCallback(
        (e: MouseEvent) => {
            if (!workSpaceMenuRef.current.contains(e.target)) {
                setExpandMenu(false);
            }
        },
        [workSpaceMenuRef],
    );

    // attaching click listener to close the menu when clicked outside
    useEffect(() => {
        document.addEventListener('click', onClickListener);
        return () => document.removeEventListener('click', onClickListener);
    }, []);

    return (
        <div
            ref={workSpaceMenuRef}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            className={wrapperClassName}
        >
            <ExpandMenuIcon />
            <StoreInformationWorkSpaceTile
                expanded={expandMenu}
                storeName={'Sreenithi Margin Free Store'}
            />
            <WorkSpaceTiles />
        </div>
    );
};
