import { ICONS } from 'utilities/utilities';
import { themeSelector } from 'store/models/theme';
import { useSelector } from 'react-redux';
import React, { ReactElement } from 'react';
import { Button, Card } from '@sellerspot/universal-components';
import { IPluginCardProps } from './PluginCard.types';
import { Icon } from '@iconify/react';

import styles from './PluginCard.module.scss';
import { colorThemes } from '@sellerspot/universal-components';

export default function PluginCard(props: IPluginCardProps): ReactElement {
    const themeState = useSelector(themeSelector);
    const {
        imageUrl,
        installed,
        pluginDescription,
        pluginIcon,
        pluginName,
        pluginPrimaryCallback,
        pluginSecondaryCallback,
    } = props;
    return (
        <Card
            className={{
                cardWrapper: styles.card,
                mediaWrapper: styles.mediaWrapper,
                contentWrapper: styles.contentWrapper,
                actionsWrapper: styles.actionWrapper,
            }}
            image={imageUrl}
            content={
                <div className={styles.content}>
                    <div className={styles.pluginTitle}>
                        <Icon icon={pluginIcon} height={'22px'} />
                        <h4 className={styles.titleText}>{pluginName}</h4>
                    </div>
                    <p className={styles.pluginContent}>{pluginDescription}</p>
                </div>
            }
            actions={
                <div className={styles.pluginActions}>
                    <Button
                        onClick={pluginSecondaryCallback}
                        size="small"
                        theme="accent"
                        label={'Explore'}
                        variant="text"
                    />
                    <div className={styles.pluginActionsRHSSection}>
                        {installed ? (
                            <Icon
                                icon={ICONS.checkCircleOutline}
                                height="20px"
                                color={colorThemes[themeState.colorTheme].success}
                            />
                        ) : null}
                        <Button
                            theme={installed ? 'success' : 'primary'}
                            label={installed ? 'LAUNCH' : 'INSTALL'}
                            variant="contained"
                            size="small"
                            startIcon={
                                installed ? (
                                    <Icon icon={ICONS.outlineLaunch} />
                                ) : (
                                    <Icon icon={ICONS.outlineFileDownload} />
                                )
                            }
                            onClick={pluginPrimaryCallback}
                        />
                    </div>
                </div>
            }
        />
    );
}
