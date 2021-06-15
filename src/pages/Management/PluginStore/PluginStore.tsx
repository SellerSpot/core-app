import React, { ReactElement, useEffect } from 'react';
import styles from './PluginStore.module.scss';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import PluginCard from 'components/Compounds/PluginCard/PluginCard';
import { ICONS } from 'utilities/utilities';
import { PosPluginImage } from 'assets/images/images';
import { useState } from '@hookstate/core';
import PluginStoreService from './PluginStore.service';
import { IPlugin } from '@sellerspot/universal-types/dist';
import { showNotify, Skeleton } from '@sellerspot/universal-components';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'config/routes';
import { Loader } from 'components/Atoms/Loader/Loader';
import { times } from 'lodash';

export const PluginStore = (): ReactElement => {
    // state
    const plugins = useState<IPlugin[]>([]);
    const installedPlugin = useState<IPlugin[]>([]);
    const isLoading = useState<boolean>(true);

    // hooks
    const history = useHistory();

    // handlers
    const installOrLaunchCallBackHandler = (pluginIndex: number, isInstalled: boolean) => () => {
        const currentPlugin = plugins[pluginIndex].get();
        if (currentPlugin) {
            if (isInstalled) {
                // perform launch sequence
            } else {
                const pluginUrl = ROUTES.MANAGEMENT__PLUGIN_STORE__VIEW_PLUGIN.replace(
                    ':id',
                    currentPlugin.id,
                );
                history.push(pluginUrl);
            }
        }
    };

    const exploreCallBackHandler = (pluginIndex: number) => () => {
        const currentPlugin = plugins[pluginIndex].get();
        if (currentPlugin) {
            // perform launch or install operation
        }
    };

    // effects
    useEffect(() => {
        PluginStoreService.fetchAllPlugins()
            .then((data) => {
                plugins.set(data);
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
                                {times(5).map((key) => (
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
                                const { shortDescription, iconName, id, image, name } =
                                    plugin.get();
                                const isInstalled = installedPlugin.some(
                                    (installedPlugin) => installedPlugin.id.get() === id,
                                );
                                return (
                                    <PluginCard
                                        key={id}
                                        isInstalled={isInstalled}
                                        image={image || PosPluginImage}
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
