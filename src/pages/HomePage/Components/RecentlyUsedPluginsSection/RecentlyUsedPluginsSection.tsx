import React, { useEffect } from 'react';
import { ReactElement } from 'react';
import styles from './RecentlyUsedPluginsSection.module.scss';
import pluginStoreStyles from '../../../Management/PluginStore/PluginStore.module.scss';
import { ROUTES } from 'config/routes';
import { PLUGIN_ROUTES } from 'config/pluginsBaseRoutes';
import { useHistory } from 'react-router';
import { Button, Skeleton } from '@sellerspot/universal-components';
import { useSelector } from 'react-redux';
import { useState } from '@hookstate/core';
import { tenantSelector } from 'store/models/app';
import { Loader } from 'components/Atoms/Loader/Loader';
import { times } from 'lodash';
import PluginCard from 'components/Compounds/PluginCard/PluginCard';
import { PLUGIN_IMAGES } from 'assets/images/images';
import { ICONS } from 'utilities/utilities';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import { EPLUGINS } from '@sellerspot/universal-types';

export const RecentlyUsedPluginsSection = (): ReactElement => {
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

    const onViewAllInstalledPluginsClickHandler = () =>
        history.push(ROUTES.MANAGEMENT__INSTALLED_PLUGINS);

    // effects
    useEffect(() => {
        isLoading.set(false);
    }, []);

    return (
        <div className={styles.wrapper}>
            <PageHeader
                title="Recently used Plugins"
                actionsLHS={[
                    <Button
                        key="viewAllInstalledPlugins"
                        label={'View All'}
                        variant="text"
                        theme="accent"
                        size="small"
                        onClick={onViewAllInstalledPluginsClickHandler}
                    />,
                ]}
            />
            <Loader
                isLoading={isLoading.get()}
                loaderType="shimmer"
                wrapperDivClassName={pluginStoreStyles.cardsWrapper}
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
                    tenantDetails?.installedPlugins?.map((plugin, key) => {
                        const { shortDescription, icon, id, uniqueName, image, name } =
                            plugin.plugin;
                        return (
                            <PluginCard
                                key={id}
                                isInstalled={true}
                                image={
                                    image || PLUGIN_IMAGES[uniqueName as keyof typeof PLUGIN_IMAGES]
                                }
                                name={name}
                                icon={ICONS.PLUGIN_ICONS[icon as keyof typeof EPLUGINS]}
                                description={shortDescription}
                                installOrLaunchCallBack={launchCallBackHandler(key)}
                                exploreCallBack={exploreCallBackHandler(key)}
                            />
                        );
                    })}
            </Loader>
        </div>
    );
};
