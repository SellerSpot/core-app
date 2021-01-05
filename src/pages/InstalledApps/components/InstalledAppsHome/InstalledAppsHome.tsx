import { AppHolder } from 'components/AppHolder/AppHolder';
import { SectionTitle } from 'components/SectionTitle/SectionTitle';
import { TilesHolder } from 'components/TilesHolder/TilesHolder';
import React, { ReactElement, useEffect, useState } from 'react';
import { getInstalledAppsHomeStyles } from './installedappshome.styles';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'config/routes';
import { useSelector } from 'react-redux';
import { installedAppsSelector } from 'store/models/installedApps';

const styles = getInstalledAppsHomeStyles();

export const InstalledAppsHome = (): ReactElement => {
    const installedAppsState = useSelector(installedAppsSelector);
    const history = useHistory();

    return (
        <div className={styles.installedAppsHomeWrapper}>
            <SectionTitle style={{ paddingBottom: 15 }} title={'Installed Apps'} />
            <TilesHolder>
                {installedAppsState.apps.map((app, key) => {
                    return (
                        <AppHolder
                            key={key}
                            data={app}
                            type={'app'}
                            installed={true}
                            onClick={() =>
                                history.push(`${ROUTES.INSTALLED_APPS_APP}?id=${app._id}`)
                            }
                        />
                    );
                })}
            </TilesHolder>
        </div>
    );
};
