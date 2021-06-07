import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import {
    StoreInformationPluginMenuTile as StoreInformationPluginMenuTileComponent,
    IStoreInformationPluginMenuTileProps,
} from './StoreInformationPluginMenuTile';

const Template: Story<IStoreInformationPluginMenuTileProps> = (
    args: IStoreInformationPluginMenuTileProps,
) => <StoreInformationPluginMenuTileComponent {...args} />;

export const StoreInformationPluginMenuTile = Template.bind({});
StoreInformationPluginMenuTile.args = {
    storeName: 'Sreenithi Margin Free Store',
    expanded: false,
} as IStoreInformationPluginMenuTileProps;

export default {
    title: 'Core App/Compounds/Store Information Plugin Menu Tile',
    component: StoreInformationPluginMenuTileComponent,
} as Meta;
