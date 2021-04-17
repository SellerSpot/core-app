import { POSPluginIllustration } from 'assets/images/images';
import { Button } from '@sellerspot/universal-components';
import Card from 'components/Atoms/Card/Card';
import { colorThemes } from 'config/themes';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'store/models/theme';
import { ICONS } from 'utilities/icons';
import styles from './PluginCard.module.scss';
import { IPluginCardProps } from './PluginCard.types';

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
                        size={'small'}
                        theme={'accent'}
                        label={'Explore'}
                        variant={'text'}
                    />
                    <div className={styles.pluginActionsRHSSection}>
                        {props.installed ? (
                            <ICONS.OTHER.SUCCESS_CHECK_CIRCLE
                                size={'20px'}
                                color={colorThemes[themeState.colorTheme].success}
                            />
                        ) : null}
                        <Button
                            theme={props.installed ? 'success' : 'primary'}
                            label={props.installed ? 'Launch' : 'Install'}
                            variant={'contained'}
                            size={'small'}
                            startIcon={
                                props.installed ? <ICONS.OTHER.LAUNCH /> : <ICONS.OTHER.INSTALL />
                            }
                            onClick={props.pluginPrimaryCallback}
                        />
                    </div>
                </div>
            }
        />
    );
}
