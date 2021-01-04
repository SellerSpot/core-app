import { AppHolder } from 'components/AppHolder/AppHolder';
import { SectionTitle } from 'components/SectionTitle/SectionTitle';
import { TilesHolder } from 'components/TilesHolder/TilesHolder';
import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IAppResponse } from 'typings/request.types';
import { getAllApps } from './appstorehome.actions';
import { getAppStoreHomeStyles } from './appstorehome.styles';

const styles = getAppStoreHomeStyles();

export const AppStoreHome = (): ReactElement => {
    const [apps, setApps] = useState([] as IAppResponse[]);
    const history = useHistory();

    useEffect(() => {
        (async () => {
            setApps((await getAllApps()).data as IAppResponse[]);
        }).call(null);
    }, []);

    return (
        <div className={styles.appStoreHomeWrapper}>
            <SectionTitle style={{ paddingBottom: 15 }} title={'Latest Apps'} />
            <TilesHolder>
                {apps.map((app, key) => {
                    return (
                        <AppHolder
                            key={key}
                            data={app}
                            type={'app'}
                            onClick={() => history.push(`${ROUTES.APP_STORE_APP}?id=${app._id}`)}
                        />
                    );
                })}
            </TilesHolder>
        </div>
    );
};
