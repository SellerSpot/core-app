import Icon from '@iconify/react';
import { ExpandPluginMenuButton, Trademark } from '@sellerspot/universal-components';
import cn from 'classnames';
import React, { Fragment, ReactElement, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { routeSelector } from 'store/models/route';
import animationStyles from '../../../styles/animation.module.scss';
import { StoreInformationPluginMenuTile } from '../StoreInformationPluginMenuTile/StoreInformationPluginMenuTile';
import { PluginMenuTile } from '../PluginMenuTile/PluginMenuTile';
import styles from './PluginMenu.module.scss';
import { IUsePluginMenuStore } from './PluginMenu.types';
import { State, useState } from '@hookstate/core';
import { CONFIG } from 'config/config';
import { tenantSelector } from 'store/models/app';
import { PLUGIN_ROUTES } from 'config/pluginsBaseRoutes';
import { EPLUGINS } from '@sellerspot/universal-types';
import { PLUGIN_ICONS } from 'utilities/utilities';
import { PluginMenuService } from './PluginMenu.service';

const ExpandMenuIcon = (props: { componentState: State<IUsePluginMenuStore> }) => {
    const { componentState } = props;
    const { expandMenu, hoverMenu } = componentState;

    // compute
    const className = cn(
        styles.expandIcon,
        { [animationStyles.fadeIn]: hoverMenu.get() && !expandMenu.get() },
        { [styles.expandIconFadeOut]: !hoverMenu.get() && !expandMenu.get() },
        { [styles.expandIconRotate]: expandMenu.get() },
        { [styles.expandIconRotateReverse]: !expandMenu.get() },
    );

    return (
        <div className={className}>
            <ExpandPluginMenuButton
                onClick={() => {
                    expandMenu.set(!expandMenu.get());
                }}
            />
        </div>
    );
};

const PluginMenuTiles = (props: { componentState: State<IUsePluginMenuStore> }) => {
    // props
    const { componentState } = props;
    const { expandMenu } = componentState;

    // hooks
    const history = useHistory();
    const { routeKeys } = useSelector(routeSelector);
    const tenantDetails = useSelector(tenantSelector);

    const allPlugins = [
        ...PluginMenuService.getDefaultPlugins(),
        ...(tenantDetails?.installedPlugins ?? []),
    ];

    return (
        <div className={styles.pluginMenuTilesWrapper}>
            {allPlugins?.map((installedPlugin) => {
                const { isVisibleInPluginMenu, icon, name, id, uniqueName } =
                    installedPlugin.plugin;
                const redirectRoute = PLUGIN_ROUTES[uniqueName as keyof typeof EPLUGINS];
                const handleTileClick = () => {
                    history.push(redirectRoute);
                };
                return (
                    <Fragment key={id}>
                        {isVisibleInPluginMenu && (
                            <PluginMenuTile
                                pluginIcon={
                                    <Icon
                                        icon={PLUGIN_ICONS[icon as keyof typeof EPLUGINS]}
                                        height={'24px'}
                                    />
                                }
                                pluginTitle={name}
                                expanded={expandMenu.get()}
                                selected={routeKeys.includes(uniqueName as keyof typeof EPLUGINS)}
                                events={{
                                    onClick: handleTileClick,
                                }}
                            />
                        )}
                    </Fragment>
                );
            })}
        </div>
    );
};

const SellerSpotFooterBanner = (props: { componentState: State<IUsePluginMenuStore> }) => {
    const { componentState } = props;
    const { expandMenu } = componentState;
    const bannerWrapperClassName = cn(styles.bannerWrapper, {
        [styles.bannerWrapperExpanded]: expandMenu.get(),
        [styles.bannerWrapperCollapsed]: !expandMenu.get(),
    });
    return (
        <div className={bannerWrapperClassName}>
            <Trademark url={CONFIG.LANDING_APP_URL} />
        </div>
    );
};

export const PluginMenu = (): ReactElement => {
    // state
    const componentState = useState<IUsePluginMenuStore>({
        expandMenu: false,
        hoverMenu: false,
    });
    const { expandMenu, hoverMenu } = componentState;
    const PluginMenuRef = useRef(null);

    const handleOnMouseEnter = () => hoverMenu.set(true);
    const handleOnMouseLeave = () => hoverMenu.set(false);
    const wrapperClassName = cn(styles.wrapper, { [styles.wrapperExpanded]: expandMenu.get() });

    // handler for document onClickListener
    const onClickListener = useCallback(
        (e: MouseEvent) => {
            if (!PluginMenuRef.current.contains(e.target)) {
                expandMenu.set(false);
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
            <ExpandMenuIcon componentState={componentState} />
            <StoreInformationPluginMenuTile
                expanded={expandMenu.get()}
                storeName={'Sreenithi Margin Free Store'}
            />
            <PluginMenuTiles componentState={componentState} />
            <SellerSpotFooterBanner componentState={componentState} />
        </div>
    );
};
