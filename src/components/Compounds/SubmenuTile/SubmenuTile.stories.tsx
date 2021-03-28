import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { ICONS } from 'utilities/icons';
import { ISubmenuTileProps } from './SubmenuTile.types';
import SubmenuTile from './SubmenuTile';

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
} as ISubmenuTileProps;

export default {
    title: 'Components/Compounds',
    component: SubmenuTileComponent,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;
