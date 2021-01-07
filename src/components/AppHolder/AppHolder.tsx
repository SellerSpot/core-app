import React, { ReactElement } from 'react';
import { IAppResponse } from 'typings/response.types';
import { ICONS } from 'utilities/icons';
import { getAppHolderStyles } from './appholder.styles';
import lodash from 'lodash';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'config/routes';

export interface IAppHolderProps {
    data?: IAppResponse;
    type?: 'app' | 'plugin';
    showBadge?: boolean;
    installed?: boolean;
    onClick?: React.DOMAttributes<HTMLDivElement>['onClick'];
}

export const AppHolder = (props: IAppHolderProps): ReactElement => {
    const history = useHistory();
    const defaultProps: IAppHolderProps = {
        data: {
            name: 'Install App Now',
            iconUrl: 'INSTALL_APP' as keyof typeof ICONS,
            shortDescription: 'Install Apps and Improve your sales.',
        },
        installed: false,
        showBadge: true,
        type: 'app',
        onClick: () => history.push(ROUTES.APP_STORE),
    };
    const requiredProps = lodash.merge(defaultProps, props);
    const styles = getAppHolderStyles(requiredProps);
    const { data, installed, type, showBadge, onClick } = requiredProps;
    const iconName = data.iconUrl as keyof typeof ICONS;
    const Icon = ICONS[iconName];
    return (
        <div className={styles.appHolderWrapper} title={`${data.name} - ${type}`} onClick={onClick}>
            <div className={styles.iconHolder}>
                <Icon />
            </div>
            <div className={styles.titleHolder}>{data.name}</div>
            <div className={styles.descriptionHolder}>{data.shortDescription}</div>
            {showBadge && (
                <div className={styles.holderType} title={type}>
                    <div className={styles.holderTypeIcon}>
                        {type === 'app' ? <ICONS.APP /> : <ICONS.PLUGIN />}
                    </div>
                    {installed && <div className={styles.holderTypeText}>Installed</div>}
                </div>
            )}
        </div>
    );
};
