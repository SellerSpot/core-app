import Icon, { IconifyIcon } from '@iconify/react';
import { ExpandWorkspaceMenuButton } from '@sellerspot/universal-components';
import cn from 'classnames';
import React, { Fragment, ReactElement, useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
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

export const getWorkSpaceMenuTileIcon = (iconInstance: IconifyIcon['icon']): ReactElement => {
    return <Icon icon={iconInstance} height={'24px'} />;
};

const WorkSpaceTiles = () => {
    const expandMenu = useWorkSpaceMenuStore((state) => state.expandMenu);
    const tiles = WorkSpaceMenuService.getWorkSpaceTiles();
    const history = useHistory();

    return (
        <div className={styles.workSpaceTilesWrapper}>
            {tiles.map((tile, tileIndex) => {
                const { icon, title, redirectRoute } = tile;
                const handleTileClick = () => {
                    history.push(redirectRoute);
                };
                return (
                    <Fragment key={tileIndex}>
                        <WorkSpaceTile
                            workspaceIcon={icon}
                            toolTipText={title}
                            workspaceTitle={title}
                            expanded={expandMenu}
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

    const wrapperClassName = cn(styles.wrapper, { [styles.wrapperExpanded]: expandMenu });
    const handleOnMouseEnter = () => setHoverMenu(true);
    const handleOnMouseLeave = () => setHoverMenu(false);

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
