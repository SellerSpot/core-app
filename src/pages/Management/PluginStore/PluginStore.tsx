import React, { ReactElement, useEffect, Fragment } from 'react';
import styles from './PluginStore.module.scss';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import PluginCard from 'components/Compounds/PluginCard/PluginCard';
import { ICONS } from 'utilities/utilities';
import { PLUGIN_IMAGES } from 'assets/images/images';
import { useState } from '@hookstate/core';
import PluginStoreService from './PluginStore.service';
import { EPLUGINS, IPlugin } from '@sellerspot/universal-types';
import {
    introduceDelay,
    showNotify,
    Skeleton,
    useIsMounted,
} from '@sellerspot/universal-components';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'config/routes';
import { Loader } from 'components/Atoms/Loader/Loader';
import { times } from 'lodash';
import { useSelector } from 'react-redux';
import { tenantSelector } from 'store/models/app';
import { PLUGIN_ROUTES } from 'config/pluginsBaseRoutes';
import { IViewPluginLocationState } from '../ViewPlugin/ViewPlugin.types';

export const PluginStore = (): ReactElement => {
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
                if (isMounted.current) plugins.set(data);
                await introduceDelay(1000);
                if (isMounted.current) isLoading.set(false);
            })
            .catch((err) => showNotify(err.message));
    }, []);

    return (
        <div className={styles.wrapper}>
            <PageHeader title="Plugin Store" />
            <div className={styles.bodyWrapper}>
                <Loader
                    isLoading={isLoading.get()}
                    loaderType="shimmer"
                    skeleton={
                        <div className={styles.cardsWrapper}>
                            {times(3).map((key) => (
                                <Skeleton
                                    key={key}
                                    animation={'wave'}
                                    height={'300px'}
                                    width={'300px'}
                                    variant={'rect'}
                                />
                            ))}
                        </div>
                    }
                >
                    <div className={styles.cardsWrapper}>
                        {!isLoading.get() &&
                            plugins.map((plugin, key) => {
                                const {
                                    shortDescription,
                                    icon,
                                    id,
                                    uniqueName,
                                    image,
                                    name,
                                    isVisibleInPluginStore,
                                } = plugin.get();
                                const isInstalled = tenantDetails?.installedPlugins?.some(
                                    (installedPlugin) => installedPlugin.plugin.id === id,
                                );
                                if (!isVisibleInPluginStore) return <Fragment key={id} />;
                                return (
                                    <PluginCard
                                        key={id}
                                        isInstalled={isInstalled}
                                        image={
                                            image ||
                                            PLUGIN_IMAGES[uniqueName as keyof typeof PLUGIN_IMAGES]
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
                    </div>
                </Loader>
            </div>
        </div>
    );
};
