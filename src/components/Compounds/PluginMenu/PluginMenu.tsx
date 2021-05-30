import Icon from '@iconify/react';
import { ExpandPluginMenuButton, Trademark } from '@sellerspot/universal-components';
import cn from 'classnames';
import React, { Fragment, ReactElement, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { routeSelector } from 'store/models/route';
import create from 'zustand';
import animationStyles from '../../../styles/animation.module.scss';
import { StoreInformationPluginMenuTile } from '../StoreInformationPluginMenuTile/StoreInformationPluginMenuTile';
import { PluginMenuTile } from '../PluginMenuTile/PluginMenuTile';
import styles from './PluginMenu.module.scss';
import { PluginMenuService } from './PluginMenu.service';
import { IUsePluginMenuStore } from './PluginMenu.types';
import { CONFIG } from 'config/config';

const usePluginMenuStore = create<IUsePluginMenuStore>((set) => ({
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
    const { expandMenu, hoverMenu, setExpandMenu } = usePluginMenuStore();
    const className = cn(
        styles.expandIcon,
        { [animationStyles.fadeIn]: hoverMenu && !expandMenu },
        { [styles.expandIconFadeOut]: !hoverMenu && !expandMenu },
        { [styles.expandIconRotate]: expandMenu },
        { [styles.expandIconRotateReverse]: !expandMenu },
    );

    return (
        <div className={className}>
            <ExpandPluginMenuButton
                onClick={() => {
                    setExpandMenu(!expandMenu);
                }}
            />
        </div>
    );
};

const PluginMenuTiles = () => {
    const expandMenu = usePluginMenuStore((state) => state.expandMenu);
    const { routeKeys } = useSelector(routeSelector);
    const tiles = PluginMenuService.getPlugins();
    const history = useHistory();

    return (
        <div className={styles.pluginMenuTilesWrapper}>
            {Object.values(tiles).map((tile, tileIndex) => {
                const { icon, title, redirectRoute, routeKey } = tile;
                const handleTileClick = () => {
                    history.push(redirectRoute);
                };
                return (
                    <Fragment key={tileIndex}>
                        <PluginMenuTile
                            pluginIcon={<Icon icon={icon} height={'24px'} />}
                            toolTipText={title}
                            pluginTitle={title}
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

const SellerSpotFooterBanner = () => {
    const expandMenu = usePluginMenuStore((state) => state.expandMenu);
    const bannerWrapperClassName = cn(styles.bannerWrapper, {
        [styles.bannerWrapperExpanded]: expandMenu,
        [styles.bannerWrapperCollapsed]: !expandMenu,
    });
    return (
        <div className={bannerWrapperClassName}>
            <Trademark url={CONFIG.LANDING_APP_URL} />
        </div>
    );
};

export const PluginMenu = (): ReactElement => {
    const { setExpandMenu, setHoverMenu, expandMenu } = usePluginMenuStore();
    const PluginMenuRef = useRef(null);

    const handleOnMouseEnter = () => setHoverMenu(true);
    const handleOnMouseLeave = () => setHoverMenu(false);
    const wrapperClassName = cn(styles.wrapper, { [styles.wrapperExpanded]: expandMenu });

    // handler for document onClickListener
    const onClickListener = useCallback(
        (e: MouseEvent) => {
            if (!PluginMenuRef.current.contains(e.target)) {
                setExpandMenu(false);
            }
        },
        [PluginMenuRef],
    );

    // attaching click listener to close the menu when clicked outside
    useEffect(() => {
        document.addEventListener('click', onClickListener);
        return () => document.removeEventListener('click', onClickListener);
    }, []);

    return (
        <div
            ref={PluginMenuRef}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            className={wrapperClassName}
        >
            <ExpandMenuIcon />
            <StoreInformationPluginMenuTile
                expanded={expandMenu}
                storeName={'Sreenithi Margin Free Store'}
            />
            <PluginMenuTiles />
            <SellerSpotFooterBanner />
        </div>
    );
};
