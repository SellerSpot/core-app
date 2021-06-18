import React, { ReactElement, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Button, ImageCarousel, showNotify, Image } from '@sellerspot/universal-components';
import { EPLUGINS, IErrorResponse, IPlugin } from '@sellerspot/universal-types';
import { useState } from '@hookstate/core';

import { ROUTES } from 'config/routes';
import styles from './ViewPlugin.module.scss';
import ViewPluginServie from './ViewPlugin.service';
import { Loader } from 'components/Atoms/Loader/Loader';
import { isArray, isString, times } from 'lodash';
import { useSelector } from 'react-redux';
import { appSelector } from 'store/models/app';
import { PLUGIN_IMAGES } from 'assets/images/images';
import Icon from '@iconify/react';
import { ICONS } from 'utilities/utilities';
import { PLUGIN_ROUTES } from 'config/pluginsBaseRoutes';
import { IViewPluginLocationState } from './ViewPlugin.types';

export const ViewPlugin = (): ReactElement => {
    // hooks
    const params = useParams<{ id: string }>();
    const history = useHistory();
    const location = useLocation<IViewPluginLocationState>();

    // state
    const plugin = useState<IPlugin>(null);
    const isInstalled = useState(false);
    const { tenantDetails } = useSelector(appSelector);
    const isInstalling = useState(false);
    const isUnInstalling = useState(false);

    // handlers
    const errorRedirect = (errorMessage: string) => {
        showNotify(errorMessage);
        history.push(ROUTES.MANAGEMENT__PLUGIN_STORE);
    };

    const checkIsPluginInstalled = (pluginId: string) => {
        const isPluginInstalled = tenantDetails.installedPlugins?.some(
            (installedPlugin) => installedPlugin.plugin.pluginId === pluginId,
        );
        isInstalled.set(isPluginInstalled);
        return isPluginInstalled;
    };

    const onInstallClickHandler = async () => {
        // handle install
        try {
            isInstalling.set(true);
            const response = await ViewPluginServie.installPlugin(plugin.value.pluginId);
            if (response) {
                isInstalling.set(false);
                showNotify('Plugin installed successfully');
            } else {
                throw null;
            }
        } catch (err) {
            const error = (err as IErrorResponse) ?? {
                message: 'Something went wrong, please try again later',
            };
            showNotify(error.message);
            isInstalling.set(false);
        }
    };

    const onUnInstallClickHandler = async () => {
        try {
            isUnInstalling.set(true);
            const response = await ViewPluginServie.unInstallPlugin(plugin.value.pluginId);
            if (response) {
                isUnInstalling.set(false);
                showNotify('Plugin uninstalled successfully');
            } else {
                throw null;
            }
        } catch (err) {
            const error = (err as IErrorResponse) ?? {
                message: 'Something went wrong, please try again later',
            };
            showNotify(error.message);
            isUnInstalling.set(false);
        }
    };

    const onLaunchClickHandler = () => {
        history.push(PLUGIN_ROUTES[plugin.value.pluginId as keyof typeof PLUGIN_ROUTES]);
    };

    // effects
    useEffect(() => {
        const pluginId = params.id;
        if (!pluginId) errorRedirect('Invalid plugin');
        ViewPluginServie.fetchPluginDetails(pluginId)
            .then(async (data) => {
                const isInstalled = checkIsPluginInstalled(data.pluginId);
                plugin.set(data);
                if (!isInstalled && location.state?.install) {
                    // trigger install sequence
                    onInstallClickHandler();
                }
            })
            .catch((err) => {
                errorRedirect(err.message);
            });
    }, []);

    // updates the installation status, listening the installedPlugins from app state
    useEffect(() => {
        if (plugin?.pluginId?.get()) checkIsPluginInstalled(plugin?.pluginId?.get());
    }, [tenantDetails.installedPlugins]);

    // unInstallation label
    const unInstallLabel = isUnInstalling.get() ? 'Uninstalling' : 'Uninstall';

    return (
        <Loader isLoading={!plugin.get()}>
            {plugin.get() && (
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <div className={styles.pluginImageHolder}>
                            <Image
                                src={
                                    plugin.value.image ||
                                    PLUGIN_IMAGES[
                                        plugin.value.pluginId as keyof typeof PLUGIN_IMAGES
                                    ]
                                }
                            />
                        </div>
                        <div className={styles.pluginInfoHolder}>
                            <div className={styles.pluginTitleHolder}>
                                <div className={styles.pluginIcon}>
                                    <Icon
                                        icon={
                                            ICONS.PLUGIN_ICONS[
                                                plugin.value.icon as keyof typeof EPLUGINS
                                            ]
                                        }
                                    />
                                </div>
                                <h2 className={styles.pluginTitle}>{plugin.value.name}</h2>
                            </div>
                            <h6 className={styles.shortDescription}>
                                {plugin.value.shortDescription}
                            </h6>
                            <div className={styles.actions}>
                                {isInstalled.get() ? (
                                    <>
                                        <Button
                                            variant="contained"
                                            theme="success"
                                            size="large"
                                            label="Launch"
                                            onClick={onLaunchClickHandler}
                                            disabled={isUnInstalling.get()}
                                        />
                                        <Button
                                            label={unInstallLabel}
                                            theme="danger"
                                            variant="text"
                                            onClick={onUnInstallClickHandler}
                                            isLoading={isUnInstalling.get()}
                                        />
                                    </>
                                ) : (
                                    <Button
                                        label={isInstalling.get() ? 'Installing' : 'Install'}
                                        variant="contained"
                                        theme="primary"
                                        size="large"
                                        isLoading={isInstalling.get()}
                                        onClick={onInstallClickHandler}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.bannersWrapper}>
                        <ImageCarousel
                            height={250}
                            images={(isArray(plugin.value.bannerImages) &&
                            plugin.value.bannerImages.length
                                ? plugin.value.bannerImages
                                : times(5)
                            ).map((imageUrl: string | number) => ({
                                imageUrl: isString(imageUrl)
                                    ? imageUrl
                                    : 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                            }))}
                        />
                    </div>
                    <p className={styles.descriptWrapper}>
                        {plugin.value.longDescription}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo voluptas quod
                        vitae ab modi. Esse deleniti, ipsa necessitatibus distinctio voluptate,
                        numquam id nesciunt odit similique, dolores nobis vero ipsum dolorem! Vel
                        atque rem, fugit distinctio, ab quis explicabo numquam est inventore dolor
                        omnis iste facilis nemo. Esse corporis praesentium impedit saepe temporibus
                        architecto natus odit eos eligendi quidem! Facere, fuga! Ipsa labore
                        molestias vero sapiente quas asperiores impedit atque dolore fugit ea. Ab
                        magni harum, hic quae nisi velit excepturi libero mollitia vel laborum
                        maxime sit cupiditate quaerat commodi rem. Tempore aspernatur consequuntur
                        adipisci sint cum! A et illum, facilis distinctio quae vero voluptate quod,
                        ea impedit culpa reiciendis nostrum odit cum molestiae voluptas est quas
                        enim veniam ad esse. Atque, quas aliquam! Eligendi culpa necessitatibus
                        tenetur tempore fugiat facilis sit provident. Ducimus aliquam adipisci in a
                        Commodi provident nostrum autem, excepturi perspiciatis veritatis error
                        corrupti consectetur, vel fuga ipsa. Minima quis voluptatum consequatur?
                        Voluptas architecto voluptatibus nobis maiores, id rem animi.
                    </p>
                </div>
            )}
        </Loader>
    );
};
