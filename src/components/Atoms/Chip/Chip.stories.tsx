import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { ICONS } from 'utilities/icons';
import ChipComponent from './Chip';
import { IChipProps } from './Chip.types';

const Template: Story<IChipProps> = (args: IChipProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <ChipComponent {...args} />
        </ThemeProvider>
    </Provider>
);

export const Chip = Template.bind({});
Chip.args = {
    label: 'Installed',
    state: 'success',
    leadingIcon: <ICONS.OTHER.SUCCESS_CHECK_CIRCLE />,
} as IChipProps;

export default {
    title: 'Components/Atoms',
    component: ChipComponent,
} as Meta;
