import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import SubMenuTileComponent from './SubMenuTile';
import { ISubMenuTileProps } from './SubMenuTile.types';

const Template: Story<ISubMenuTileProps> = (args: ISubMenuTileProps) => (
    <SubMenuTileComponent {...args} />
);

export const SubMenuTile = Template.bind({});
SubMenuTile.args = {
    miniTile: false,
    title: 'Home',
    selected: false,
    childTilesVisible: false,
    showTailIcon: false,
    disabled: false,
} as ISubMenuTileProps;

export default {
    title: 'Components',
    component: SubMenuTileComponent,
} as Meta;
