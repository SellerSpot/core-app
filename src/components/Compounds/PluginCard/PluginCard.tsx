import { POSPluginIllustration } from 'assets/images/images';
import Button from 'components/Atoms/Button/Button';
import Card from 'components/Atoms/Card/Card';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/icons';
import styles from './PluginCard.module.scss';

export default function PluginCard(): ReactElement {
    return (
        <Card
            className={{
                cardWrapper: styles.card,
                contentWrapper: styles.contentWrapper,
                actionsWrapper: styles.actionWrapper,
            }}
            media={<img className={styles.thumbnail} src={POSPluginIllustration} />}
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
                        label={'Install'}
                        variant={'contained'}
                        size={'small'}
                        startIcon={<ICONS.OTHER.INSTALL />}
                    />
                </div>
            }
        />
    );
}
