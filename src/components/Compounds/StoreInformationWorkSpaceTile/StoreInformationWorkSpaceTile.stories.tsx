import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import {
    StoreInformationWorkSpaceTile as StoreInformationWorkSpaceTileComponent,
    IStoreInformationWorkSpaceTileProps,
} from './StoreInformationWorkSpaceTile';

const Template: Story<IStoreInformationWorkSpaceTileProps> = (
    args: IStoreInformationWorkSpaceTileProps,
) => <StoreInformationWorkSpaceTileComponent {...args} />;

export const StoreInformationWorkSpaceTile = Template.bind({});
StoreInformationWorkSpaceTile.args = {
    storeName: 'Sreenithi Margin Free Store',
    expanded: false,
} as IStoreInformationWorkSpaceTileProps;

export default {
    title: 'Design System/Compounds/Store Information Work Space Tile',
    component: StoreInformationWorkSpaceTileComponent,
} as Meta;
