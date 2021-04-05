import { POSPluginIllustration } from 'assets/images/images';
import Button from 'components/Atoms/Button/Button';
import Card from 'components/Atoms/Card/Card';
import Chip from 'components/Atoms/Chip/Chip';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/icons';
import styles from './PluginCard.module.scss';
import { IPluginCardProps } from './PluginCard.types';

export default function PluginCard(props: IPluginCardProps): ReactElement {
    return (
        <Card
            className={{
                cardWrapper: styles.card,
                contentWrapper: styles.contentWrapper,
                actionsWrapper: styles.actionWrapper,
            }}
            media={
                <div className={styles.media}>
                    {props.installed ? (
                        <Chip
                            className={styles.floatingChip}
                            leadingIcon={<ICONS.OTHER.SUCCESS_CHECK_CIRCLE />}
                            label={'Installed'}
                        />
                    ) : null}
                    <img className={styles.thumbnail} src={POSPluginIllustration} />
                </div>
            }
            content={
                <div className={styles.content}>
                    <div className={styles.pluginTitle}>
                        <ICONS.WORKSPACES.POS />
                        <h5>Point of Sale</h5>
                    </div>
                    <p className={styles.pluginContent}>
                        An all purpose point of sale system to handle your everyday sales
                    </p>
                </div>
            }
            actions={
                <div className={styles.pluginActions}>
                    <Button size={'small'} state={'accent'} label={'Explore'} variant={'text'} />
                    <Button
                        state={'default'}
                        label={props.installed ? 'Launch' : 'Install'}
                        variant={'contained'}
                        size={'small'}
                        startIcon={
                            props.installed ? <ICONS.OTHER.LAUNCH /> : <ICONS.OTHER.INSTALL />
                        }
                    />
                </div>
            }
        />
    );
}
