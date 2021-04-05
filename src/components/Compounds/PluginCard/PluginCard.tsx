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
            }}
            media={<img className={styles.thumbnail} src={POSPluginIllustration} />}
            content={
                <div className={styles.content}>
                    <div className={styles.pluginTitle}>
                        <ICONS.WORKSPACES.POS />
                        <h5>Point of Sale</h5>
                    </div>
                    <div className={styles.pluginContent}>
                        <p>An all purpose point of sale system to handle your everyday sales</p>
                    </div>
                    <div className={styles.pluginActions}>
                        <Button state={'accent'} label={'Explore'} variant={'text'} />
                    </div>
                </div>
            }
        />
    );
}
