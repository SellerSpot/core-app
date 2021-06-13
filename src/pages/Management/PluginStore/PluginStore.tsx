import React, { ReactElement } from 'react';
import styles from './PluginStore.module.scss';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import PluginCard from 'components/Compounds/PluginCard/PluginCard';
import { ICONS } from 'utilities/utilities';
import { PosPluginImage } from 'assets/images/images';
import { useState } from '@hookstate/core';
import { IPlugin } from './PluginStore.types';

export const PluginStore = (): ReactElement => {
    const plugins = useState<IPlugin[]>([
        {
            name: 'Point of Sale',
            description:
                'Day to day store sales with inventory control and bill generation and printing',
            iconName: 'cashRegister',
            id: 'pointofsale',
            image: PosPluginImage,
        },
    ]);
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

    return (
        <div className={styles.wrapper}>
            <PageHeader title="Plugin Store" />
            <div className={styles.bodyWrapper}>
                <div className={styles.cardsWrapper}>
                    {plugins.map((plugin, key) => {
                        const { description, iconName, id, image, name } = plugin.get();
                        const isInstalled = installedPlugin.some(
                            (installedPlugin) => installedPlugin.id.get() === id,
                        );
                        return (
                            <PluginCard
                                key={id}
                                isInstalled={isInstalled}
                                image={image}
                                name={name}
                                icon={ICONS[iconName]}
                                description={description}
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
