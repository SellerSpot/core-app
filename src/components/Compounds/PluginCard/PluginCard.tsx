import { ICONS } from 'utilities/utilities';
import { themeSelector } from 'store/models/theme';
import { useSelector } from 'react-redux';
import React, { ReactElement } from 'react';
import { Button, Card } from '@sellerspot/universal-components';
import { IPluginCardProps } from './PluginCard.types';
import { Icon } from '@iconify/react';

import styles from './PluginCard.module.scss';
import { colorThemes } from '@sellerspot/universal-components';

const PluginCard = (props: IPluginCardProps): ReactElement => {
    const themeState = useSelector(themeSelector);
    const {
        image,
        isInstalled,
        description,
        icon,
        name,
        installOrLaunchCallBack,
        exploreCallBack,
    } = props;
    return (
        <Card
            className={{
                cardWrapper: styles.card,
                mediaWrapper: styles.mediaWrapper,
                contentWrapper: styles.contentWrapper,
                actionsWrapper: styles.actionWrapper,
            }}
            image={image}
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
                        onClick={exploreCallBack}
                        size="small"
                        theme="accent"
                        label={'Explore'}
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
                            onClick={installOrLaunchCallBack}
                        />
                    </div>
                </div>
            }
        />
    );
};

export default PluginCard;
