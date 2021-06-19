import { ICONS } from 'utilities/utilities';
import { themeSelector } from 'store/models/theme';
import { useSelector } from 'react-redux';
import React, { ReactElement } from 'react';
import { Button, Card, TOnNodeClickHandler } from '@sellerspot/universal-components';
import { IPluginCardProps } from './PluginCard.types';
import { Icon } from '@iconify/react';

import styles from './PluginCard.module.scss';
import { colorThemes } from '@sellerspot/universal-components';

const PluginCard = (props: IPluginCardProps): ReactElement => {
    // hooks
    const themeState = useSelector(themeSelector);

    // props
    const {
        image,
        isInstalled,
        description,
        icon,
        name,
        installOrLaunchCallBack,
        exploreCallBack,
    } = props;

    const onButtonClickHandler =
        (type: 'explore' | 'install'): TOnNodeClickHandler<HTMLButtonElement> =>
        (e) => {
            e.stopPropagation();
            if (type === 'explore') {
                exploreCallBack?.(e);
                return;
            }
            installOrLaunchCallBack?.(e);
        };

    return (
        <Card
            className={{
                cardWrapper: styles.card,
                mediaWrapper: styles.mediaWrapper,
                contentWrapper: styles.contentWrapper,
                actionsWrapper: styles.actionWrapper,
            }}
            image={image}
            onClick={exploreCallBack}
            content={
                <div className={styles.content}>
                    <div className={styles.pluginTitle}>
                        <Icon icon={icon} height={'22px'} />
                        <h4 className={styles.titleText}>{name}</h4>
                    </div>
                    <p className={styles.pluginContent}>{description}</p>
                </div>
            }
            actions={
                <div className={styles.pluginActions}>
                    <Button
                        onClick={onButtonClickHandler('explore')}
                        size="small"
                        theme="accent"
                        label="Explore"
                        variant="text"
                    />
                    <div className={styles.pluginActionsRHSSection}>
                        {isInstalled ? (
                            <Icon
                                icon={ICONS.checkCircleOutline}
                                height="20px"
                                color={colorThemes[themeState.colorTheme].success}
                            />
                        ) : null}
                        <Button
                            theme={isInstalled ? 'success' : 'primary'}
                            label={isInstalled ? 'LAUNCH' : 'INSTALL'}
                            variant="contained"
                            size="small"
                            startIcon={
                                isInstalled ? (
                                    <Icon icon={ICONS.outlineLaunch} />
                                ) : (
                                    <Icon icon={ICONS.outlineFileDownload} />
                                )
                            }
                            onClick={onButtonClickHandler('install')}
                        />
                    </div>
                </div>
            }
        />
    );
};

export default PluginCard;
