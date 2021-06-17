import React, { ReactElement, useEffect } from 'react';
import styles from './PluginStore.module.scss';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import PluginCard from 'components/Compounds/PluginCard/PluginCard';
import { ICONS } from 'utilities/utilities';
import { PLUGIN_IMAGES } from 'assets/images/images';
import { useState } from '@hookstate/core';
import PluginStoreService from './PluginStore.service';
import { IPlugin } from '@sellerspot/universal-types';
import { introduceDelay, showNotify, Skeleton } from '@sellerspot/universal-components';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'config/routes';
import { Loader } from 'components/Atoms/Loader/Loader';
import { times } from 'lodash';
import { useSelector } from 'react-redux';
import { appSelector } from 'store/models/app';
import { PLUGIN_ROUTES } from 'config/pluginsBaseRoutes';
import { IViewPluginLocationState } from '../ViewPlugin/ViewPlugin.types';

export const PluginStore = (): ReactElement => {
    // state
    const plugins = useState<IPlugin[]>([]);
    const isLoading = useState<boolean>(true);
    const { tenantDetails } = useSelector(appSelector);

    // hooks
    const history = useHistory();

    // handlers
    const getPluginUrl = (pluginId: string): string =>
        ROUTES.MANAGEMENT__PLUGIN_STORE__VIEW_PLUGIN.replace(':id', pluginId);

    const installOrLaunchCallBackHandler = (pluginIndex: number, isInstalled: boolean) => () => {
        const currentPlugin = plugins[pluginIndex].get();
        if (isInstalled) {
            // perform launch sequence
            history.push(PLUGIN_ROUTES[currentPlugin.uniqueName as keyof typeof PLUGIN_ROUTES]);
        } else {
            // perform install sequence - trigger installation flow by passing in history state install:true along with push
            history.push(getPluginUrl(currentPlugin.id), {
                install: true, // triggers installation sequence in view plugin component
            } as IViewPluginLocationState);
        }
    };

    const exploreCallBackHandler = (pluginIndex: number) => () => {
        const currentPlugin = plugins[pluginIndex].get();
        history.push(getPluginUrl(currentPlugin.id));
    };

    // effects
    useEffect(() => {
        PluginStoreService.fetchAllPlugins()
            .then(async (data) => {
                plugins.set(data);
                await introduceDelay(2000);
                isLoading.set(false);
            })
            .catch((err) => showNotify(err.message));
    }, []);

    return (
        <div className={styles.wrapper}>
            <PageHeader title="Plugin Store" />
            <div className={styles.bodyWrapper}>
                <div className={styles.cardsWrapper}>
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
                                const { shortDescription, iconName, id, image, name, uniqueName } =
                                    plugin.get();
                                const isInstalled = tenantDetails?.installedPlugins?.some(
                                    (installedPlugin) => installedPlugin.plugin.id === id,
                                );
                                return (
                                    <PluginCard
                                        key={id}
                                        isInstalled={isInstalled}
                                        image={
                                            image ||
                                            PLUGIN_IMAGES[uniqueName as keyof typeof PLUGIN_IMAGES]
                                        }
                                        name={name}
                                        icon={ICONS[iconName as keyof typeof ICONS]}
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
        </div>
    );
};
