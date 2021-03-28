import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import SubmenuTile from './SubmenuTile';
import { ISubmenuTileProps } from './SubmenuTile.types';

const Template: Story<ISubmenuTileProps> = (args: ISubmenuTileProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <SubmenuTile {...args} />
        </ThemeProvider>
    </Provider>
);

export const SubmenuTileComponent = Template.bind({});
SubmenuTileComponent.args = {
    miniTile: false,
    title: 'Home',
    selected: false,
    childTilesVisible: false,
    showTailIcon: false,
    disabled: false,
} as ISubmenuTileProps;

export default {
    title: 'Components/Compounds',
    component: SubmenuTileComponent,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;
