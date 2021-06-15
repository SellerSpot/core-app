import React, { ReactElement, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, ImageCarousel, showNotify, Image } from '@sellerspot/universal-components';
import { IPlugin } from '@sellerspot/universal-types';
import { useState } from '@hookstate/core';

import { ROUTES } from 'config/routes';
import styles from './ViewPlugin.module.scss';
import ViewPluginServie from './ViewPlugin.service';
import { Loader } from 'components/Atoms/Loader/Loader';
import { isArray, isString, times } from 'lodash';
import { useSelector } from 'react-redux';
import { appSelector } from 'store/models/app';
import { PosPluginImage } from 'assets/images/plugins';
import Icon from '@iconify/react';
import { ICONS } from 'utilities/utilities';

export const ViewPlugin = (): ReactElement => {
    // hooks
    const params = useParams<{ id: string }>();
    const history = useHistory();

    // state
    const plugin = useState<IPlugin>(null);
    const isInstalled = useState(false);
    const { tenantDetails } = useSelector(appSelector);

    // handlers
    const errorRedirect = (errorMessage: string) => {
        showNotify(errorMessage);
        history.push(ROUTES.MANAGEMENT__PLUGIN_STORE);
    };

    const onInstallClickHandler = () => {
        // handle install
    };

    const onUnInstallClickHandler = () => {
        // handle install
    };

    const onLaunchClickHandler = () => {
        // handle install
    };

    // effects
    useEffect(() => {
        const pluginId = params.id;
        if (!pluginId) errorRedirect('Invalid plugin');
        ViewPluginServie.fetchPluginDetails(pluginId)
            .then(async (data) => {
                const isPluginInstalled = tenantDetails.installedPlugins?.some(
                    (installedPlugin) => installedPlugin.id === data.id,
                );
                isInstalled.set(isPluginInstalled);
                plugin.set(data);
            })
            .catch((err) => {
                errorRedirect(err.message);
            });
    }, []);
    return (
        <Loader isLoading={!plugin.get()}>
            {plugin.get() && (
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <div className={styles.pluginImageHolder}>
                            <Image src={plugin.value.image || PosPluginImage} />
                        </div>
                        <div className={styles.pluginInfoHolder}>
                            <div className={styles.pluginTitleHolder}>
                                <div className={styles.pluginIcon}>
                                    <Icon
                                        icon={
                                            ICONS.PLUGINS[
                                                plugin.value.iconName as keyof typeof ICONS.PLUGINS
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
                                            theme="primary"
                                            size="large"
                                            label="Launch"
                                            onClick={onLaunchClickHandler}
                                        />
                                        <Button
                                            label="Uninstall"
                                            theme="danger"
                                            variant="text"
                                            onClick={onUnInstallClickHandler}
                                        />
                                    </>
                                ) : (
                                    <Button
                                        label="Install"
                                        variant="contained"
                                        theme="primary"
                                        size="large"
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
