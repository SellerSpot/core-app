import { ICONS } from 'utilities/icons/icons';
import { themeSelector } from 'store/models/theme';
import { useSelector } from 'react-redux';
import React, { ReactElement } from 'react';
import { colorThemes } from 'config/themes';
import { Button, Card } from '@sellerspot/universal-components';
import { IPluginCardProps } from './PluginCard.types';
import { Icon } from '@iconify/react';

import styles from './PluginCard.module.scss';

export default function PluginCard(props: IPluginCardProps): ReactElement {
    const themeState = useSelector(themeSelector);

    return (
        <Card
            className={{
                cardWrapper: styles.card,
                contentWrapper: styles.contentWrapper,
                actionsWrapper: styles.actionWrapper,
            }}
            media={
                <div className={styles.media}>
                    <img className={styles.thumbnail} src={props.imageUrl} />
                </div>
            }
            content={
                <div className={styles.content}>
                    <div className={styles.pluginTitle}>
                        <div className={styles.logo}>{props.pluginIcon}</div>
                        <h5 className={styles.titleText}>{props.pluginName}</h5>
                    </div>
                    <p className={styles.pluginContent}>{props.pluginDescription}</p>
                </div>
            }
            actions={
                <div className={styles.pluginActions}>
                    <Button
                        onClick={props.pluginSecondaryCallback}
                        size="small"
                        theme="accent"
                        label={'Explore'}
                        variant="text"
                    />
                    <div className={styles.pluginActionsRHSSection}>
                        {props.installed ? (
                            <Icon
                                icon={ICONS.checkCircleOutline}
                                height="20px"
                                color={colorThemes[themeState.colorTheme].success}
                            />
                        ) : null}
                        <Button
                            theme={props.installed ? 'success' : 'primary'}
                            label={props.installed ? 'LAUNCH' : 'INSTALL'}
                            variant="contained"
                            size="small"
                            startIcon={
                                props.installed ? (
                                    <Icon icon={ICONS.outlineLaunch} />
                                ) : (
                                    <Icon icon={ICONS.outlineFileDownload} />
                                )
                            }
                            onClick={props.pluginPrimaryCallback}
                        />
                    </div>
                </div>
            }
        />
    );
}
