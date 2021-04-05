import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { ICONS } from 'utilities/icons';
import Chip from './Chip';
import { IChipProps } from './Chip.types';

const Template: Story<IChipProps> = (args: IChipProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <Chip {...args} />
        </ThemeProvider>
    </Provider>
);

export const Component = Template.bind({});
Component.args = {
    label: 'Installed',
    state: 'success',
    leadingIcon: <ICONS.OTHER.SUCCESS_CHECK_CIRCLE />,
} as IChipProps;

export default {
    title: 'Components/Atoms/Chip',
    component: Component,
} as Meta;
