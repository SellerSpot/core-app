import { AppHolder } from 'components/AppHolder/AppHolder';
import { SectionTitle } from 'components/SectionTitle/SectionTitle';
import { TilesHolder } from 'components/TilesHolder/TilesHolder';
import React, { ReactElement, useEffect, useState } from 'react';
import { getInstalledAppsHomeStyles } from './installedappshome.styles';
import { getTenantInstalledApps } from './installedappshome.actions';
import { IAppResponse } from 'typings/response.types';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'config/routes';

const styles = getInstalledAppsHomeStyles();

export const InstalledAppsHome = (): ReactElement => {
    const [apps, setApps] = useState([] as IAppResponse[]);
    const history = useHistory();

    useEffect(() => {
        (async () => {
            const response = await getTenantInstalledApps();
            console.log(response);
            const apps = response.data as IAppResponse[];
            setApps(apps);
        }).call(null);
    }, []);

    return (
        <div className={styles.installedAppsHomeWrapper}>
            <SectionTitle style={{ paddingBottom: 15 }} title={'Installed Apps'} />
            <TilesHolder>
                {apps.map((app, key) => {
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
