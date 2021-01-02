import { cx } from '@emotion/css';
import { SectionTitle } from 'components/SectionTitle/SectionTitle';
import { TilesHolder } from 'components/TilesHolder/TilesHolder';
import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearAndPushBreadCrumbs } from 'store/models/breadCrumb';
import { ICONS } from 'utilities/icons';
import { getHomeStyles } from './home.styles';

export const Home = (): ReactElement => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            clearAndPushBreadCrumbs([
                {
                    icon: ICONS.HOME,
                    route: ROUTES.HOME,
                    title: 'Home',
                },
            ]),
        );
    }, []);
    const styles = getHomeStyles();
    return (
        <div className={cx(styles.homeWrapper)}>
            <SectionTitle style={{ paddingBottom: 15 }} title={'Installed Apps'} />
            <TilesHolder />
        </div>
    );
};
