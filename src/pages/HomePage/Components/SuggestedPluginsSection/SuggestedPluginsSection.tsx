import React, { useEffect } from 'react';
import { ReactElement } from 'react';
import styles from './SuggestedPluginsSection.module.scss';
import pluginStoreStyles from '../../../Management/PluginStore/PluginStore.module.scss';
import { ROUTES } from 'config/routes';
import { PLUGIN_ROUTES } from 'config/pluginsBaseRoutes';
import { IViewPluginLocationState } from 'pages/Management/ViewPlugin/ViewPlugin.types';
import { useHistory } from 'react-router';
import { Button, showNotify, Skeleton, useIsMounted } from '@sellerspot/universal-components';
import { useSelector } from 'react-redux';
import { EPLUGINS, IPlugin } from '@sellerspot/universal-types';
import { useState } from '@hookstate/core';
import { tenantSelector } from 'store/models/app';
import PluginStoreService from 'pages/Management/PluginStore/PluginStore.service';
import { introduceDelay } from 'utilities/general';
import { Loader } from 'components/Atoms/Loader/Loader';
import { times } from 'lodash';
import PluginCard from 'components/Compounds/PluginCard/PluginCard';
import { PLUGIN_IMAGES } from 'assets/images/images';
import { ICONS } from 'utilities/utilities';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';

export const SuggestedPluginsSection = (): ReactElement => {
    // state
    const plugins = useState<IPlugin[]>([]);
    const isLoading = useState<boolean>(true);
    const tenantDetails = useSelector(tenantSelector);

    // hooks
    const history = useHistory();
    const isMounted = useIsMounted();

    // handlers
    const getPluginUrl = (pluginId: string): string =>
        ROUTES.MANAGEMENT__PLUGIN_STORE__VIEW_PLUGIN.replace(':id', pluginId);

    const installOrLaunchCallBackHandler = (pluginIndex: number, isInstalled: boolean) => () => {
        const currentPlugin = plugins[pluginIndex].get();
        if (isInstalled) {
            // perform launch sequence
            history.push(PLUGIN_ROUTES[currentPlugin.pluginId as keyof typeof PLUGIN_ROUTES]);
        } else {
            // perform install sequence - trigger installation flow by passing in history state install:true along with push
            history.push(getPluginUrl(currentPlugin.pluginId), {
                install: true, // triggers installation sequence in view plugin component
            } as IViewPluginLocationState);
        }
    };

    const exploreCallBackHandler = (pluginIndex: number) => () => {
        const currentPlugin = plugins[pluginIndex].get();
        history.push(getPluginUrl(currentPlugin.pluginId));
    };

    const onExploreAllPluginsClickHandler = () => history.push(ROUTES.MANAGEMENT__PLUGIN_STORE);

    // effects
    useEffect(() => {
        PluginStoreService.fetchAllPlugins()
            .then(async (data) => {
                if (isMounted.current) plugins.set(data);
                await introduceDelay(1000);
                if (isMounted.current) isLoading.set(false);
            })
            .catch((err) => showNotify(err.message));
    }, []);

    return (
        <div className={styles.wrapper}>
            <PageHeader
                title="Suggested Plugins"
                actionsLHS={[
                    <Button
                        key="exploreAllPlugins"
                        label={'Explore All'}
                        variant="text"
                        theme="accent"
                        size="small"
                        onClick={onExploreAllPluginsClickHandler}
                    />,
                ]}
            />
            <div className={pluginStoreStyles.cardsWrapper}>
                <Loader
                    isLoading={isLoading.get()}
                    loaderType="shimmer"
                    skeleton={
                        <>
                            {times(3).map((key) => (
                                <Skeleton
                                    key={key}
                                    animation={'wave'}
                                    height={'300px'}
                                    width={'300px'}
                                    variant={'rect'}
                                />
                            ))}
                        </>
                    }
                >
                    {!isLoading.get() &&
                        plugins.map((plugin, key) => {
                            const { shortDescription, icon, pluginId, image, name } = plugin.get();
                            const isInstalled = tenantDetails?.installedPlugins?.some(
                                (installedPlugin) => installedPlugin.plugin.pluginId === pluginId,
                            );
                            return (
                                <PluginCard
                                    key={pluginId}
                                    isInstalled={isInstalled}
                                    image={
                                        image ||
                                        PLUGIN_IMAGES[pluginId as keyof typeof PLUGIN_IMAGES]
                                    }
                                    name={name}
                                    icon={ICONS.PLUGIN_ICONS[icon as keyof typeof EPLUGINS]}
                                    description={shortDescription}
                                    installOrLaunchCallBack={installOrLaunchCallBackHandler(
                                        key,
                                        isInstalled,
                                    )}
                                    exploreCallBack={exploreCallBackHandler(key)}
                                />
                            );
                        })}
                </Loader>
            </div>
        </div>
    );
};
