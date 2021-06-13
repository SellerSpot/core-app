import React, { ReactElement, useEffect } from 'react';
import styles from './PluginStore.module.scss';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import PluginCard from 'components/Compounds/PluginCard/PluginCard';
import { ICONS } from 'utilities/utilities';
import { PosPluginImage } from 'assets/images/images';
import { useState } from '@hookstate/core';
import PluginStoreService from './PluginStore.service';
import { IPlugin } from '@sellerspot/universal-types/dist';
import { showNotify } from '@sellerspot/universal-components';

export const PluginStore = (): ReactElement => {
    const plugins = useState<IPlugin[]>([]);
    const installedPlugin = useState<IPlugin[]>([]);

    // handlers
    const installOrLaunchCallBackHandler = (pluginIndex: number, isInstalled: boolean) => () => {
        const currentPlugin = plugins[pluginIndex].get();
        if (isInstalled && currentPlugin) {
            // perform launch or install operation
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
        PluginStoreService.getAllPlugins()
            .then((data) => plugins.set(data))
            .catch((err) => showNotify(err.message));
    }, []);

    return (
        <div className={styles.wrapper}>
            <PageHeader title="Plugin Store" />
            <div className={styles.bodyWrapper}>
                <div className={styles.cardsWrapper}>
                    {plugins.map((plugin, key) => {
                        const { shortDescription, iconName, id, image, name } = plugin.get();
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
                </div>
            </div>
        </div>
    );
};
