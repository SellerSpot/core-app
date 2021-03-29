import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import SubMenuTile from './SubMenuTile';
import { ISubMenuTileProps } from './SubMenuTile.types';

const Template: Story<ISubMenuTileProps> = (args: ISubMenuTileProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <SubMenuTile {...args} />
        </ThemeProvider>
    </Provider>
);

export const SubMenuTileComponent = Template.bind({});
SubMenuTileComponent.args = {
    miniTile: false,
    title: 'Home',
    selected: false,
    childTilesVisible: false,
    showTailIcon: false,
    disabled: false,
} as ISubMenuTileProps;

export default {
    title: 'Components/Compounds/SubMenuTileComponent',
    component: SubMenuTileComponent,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;
