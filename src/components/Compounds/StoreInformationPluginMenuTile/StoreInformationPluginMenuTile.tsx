import { Avatar } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import styles from './StoreInformationPluginMenuTile.module.scss';
import { IStoreInformationPluginMenuTileProps } from './StoreInformationPluginMenuTile.types';
import cn from 'classnames';

export { IStoreInformationPluginMenuTileProps } from './StoreInformationPluginMenuTile.types';

const DefaultAvatar = (props: { storeName: string }) => {
    const { storeName } = props;
    const avatarContent = storeName[0].toUpperCase();
    return <Avatar content={<h2>{avatarContent}</h2>} variant="rounded" theme="selected" />;
};

export const StoreInformationPluginMenuTile = (
    props: IStoreInformationPluginMenuTileProps,
): ReactElement => {
    const { storeName, storeLogo, expanded } = props;

    const mediaObject = !!storeLogo ? null : <DefaultAvatar storeName={storeName} />;
    const wrapperClassName = cn(styles.wrapper, { [styles.wrapperExpanded]: expanded });
    const storeNameHolderClassName = cn(styles.storeNameHolder, {
        [styles.storeNameHolderExpanded]: expanded,
        [styles.storeNameHolderCollapsed]: !expanded,
    });

    return (
        <div className={wrapperClassName}>
            <div className={styles.avatarHolder}>{mediaObject}</div>
            <div className={storeNameHolderClassName}>
                <h5>{storeName}</h5>
            </div>
        </div>
    );
};
