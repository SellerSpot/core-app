import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { pushBreadCrumbs } from 'store/models/breadCrumb';
import { IAppResponse, IResponse } from 'typings/request.types';
import { ICONS } from 'utilities/icons';
import { getAppById } from './appenlargedview.actions';

export const AppEnlargedView = (): ReactElement => {
    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [appDetails, setAppDetails] = useState({} as IAppResponse);
    useEffect(() => {
        try {
            console.log(params);
            const { id: appId } = params as { id: string };
            if (!appId) throw 'Invalid Url';
            (async () => {
                const response = await getAppById(appId);
                const { status, data } = response as IResponse & { data: IAppResponse };
                if (!status || !data._id) throw response;
                dispatch(
                    pushBreadCrumbs([
                        {
                            icon: ICONS.APP,
                            route: ROUTES.APP_STORE,
                            title: 'Apps',
                        },
                        {
                            icon: ICONS[data.iconUrl as keyof typeof ICONS],
                            route: `${ROUTES.APP_STORE_APPS}/${data._id}`,
                            title: data.name,
                        },
                    ]),
                );
                setAppDetails(data);
            }).call(null);
        } catch (error) {
            console.log(error);
            // show notificaiton
            history.push(ROUTES.APP_STORE);
        }
    }, []);
    return <div>{JSON.stringify(appDetails)}</div>;
};
