import React, { ReactElement } from 'react';
import { IAppResponse } from 'typings/request.types';
import { ICONS } from 'utilities/icons';
import { getAppHolderStyles } from './appholder.styles';
import lodash from 'lodash';
import { icons } from 'react-icons';

export interface IAppHolderProps {
    data?: IAppResponse;
    type?: 'app' | 'plugin';
    installed?: boolean;
}

export const AppHolder = (props: IAppHolderProps): ReactElement => {
    const defaultProps: IAppHolderProps = {
        data: {
            name: 'App Name',
            iconUrl: 'APP',
            shortDescription: 'App Description',
        },
        installed: false,
        type: 'app',
    };
    const requiredProps = lodash.merge(defaultProps, props);
    const styles = getAppHolderStyles(requiredProps);
    const { data, installed, type } = requiredProps;
    const iconName = data.iconUrl as keyof typeof ICONS;
    const Icon = ICONS[iconName];
    return (
        <div className={styles.appHolderWrapper} title={`${data.name} - ${type}`}>
            <div className={styles.iconHolder}>
                <Icon />
            </div>
            <div className={styles.titleHolder}>{data.name}</div>
            <div className={styles.descriptionHolder}>{data.shortDescription}</div>
            <div className={styles.holderType} title={type}>
                <div className={styles.holderTypeIcon}>
                    {type === 'app' ? <ICONS.APP /> : <ICONS.PLUGIN />}
                </div>
                {installed && <div className={styles.holderTypeText}>Installed</div>}
            </div>
        </div>
    );
};
