import React, { ReactElement, useEffect } from 'react';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import PluginCard from 'components/Compounds/PluginCard/PluginCard';
import { ICONS } from 'utilities/utilities';
import { PLUGIN_IMAGES } from 'assets/images/images';
import { useState } from '@hookstate/core';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'config/routes';
import { Loader } from 'components/Atoms/Loader/Loader';
import { useSelector } from 'react-redux';
import { tenantSelector } from 'store/models/app';
import { PLUGIN_ROUTES } from 'config/pluginsBaseRoutes';
import styles from './InstalledPlugins.module.scss';
import pluginStoreStyles from '../PluginStore/PluginStore.module.scss';
import { Button, TableEmptyState } from '@sellerspot/universal-components';

export const InstalledPlugins = (): ReactElement => {
    // state
    const isLoading = useState<boolean>(true);
    const tenantDetails = useSelector(tenantSelector);

    // hooks
    const history = useHistory();

    // handlers
    const getPluginUrl = (pluginId: string): string =>
        ROUTES.MANAGEMENT__PLUGIN_STORE__VIEW_PLUGIN.replace(':id', pluginId);

    const launchCallBackHandler = (pluginIndex: number) => () => {
        const currentPlugin = tenantDetails?.installedPlugins?.[pluginIndex].plugin;
        history.push(PLUGIN_ROUTES[currentPlugin.uniqueName as keyof typeof PLUGIN_ROUTES]);
    };

    const exploreCallBackHandler = (pluginIndex: number) => () => {
        const currentPlugin = tenantDetails?.installedPlugins?.[pluginIndex].plugin;
        history.push(getPluginUrl(currentPlugin.id));
    };

    const onInstallPluginsClickHandler = () => {
        history.push(ROUTES.MANAGEMENT__PLUGIN_STORE);
    };

    // effects
    useEffect(() => {
        isLoading.set(false);
    }, []);

    return (
        <Loader isLoading={isLoading.get()} loaderType="spinner">
            <div className={styles.wrapper}>
                <PageHeader title="Installed Plugins" />
                <div className={styles.bodyWrapper}>
                    {tenantDetails?.installedPlugins.length === 0 ? (
                        <>
                            <div className={styles.emptyInstallBannder}>
                                <TableEmptyState
                                    message="No plugins were installed!"
                                    tableContainerHeight={500}
                                    primaryCallToAction={
                                        <Button
                                            label={'Install plugins'}
                                            variant="contained"
                                            theme="primary"
                                            size="large"
                                            onClick={onInstallPluginsClickHandler}
                                        />
                                    }
                                />
                            </div>
                        </>
                    ) : (
                        <div className={pluginStoreStyles.cardsWrapper}>
                            {tenantDetails?.installedPlugins?.map((plugin, key) => {
                                const { shortDescription, iconName, id, image, name, uniqueName } =
                                    plugin.plugin;
                                return (
                                    <PluginCard
                                        key={id}
                                        isInstalled={true}
                                        image={
                                            image ||
                                            PLUGIN_IMAGES[uniqueName as keyof typeof PLUGIN_IMAGES]
                                        }
                                        name={name}
                                        icon={ICONS[iconName as keyof typeof ICONS]}
                                        description={shortDescription}
                                        installOrLaunchCallBack={launchCallBackHandler(key)}
                                        exploreCallBack={exploreCallBackHandler(key)}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </Loader>
    );
};
