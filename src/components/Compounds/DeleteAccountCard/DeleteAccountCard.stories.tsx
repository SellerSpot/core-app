import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import DeleteAccountCardComponent from './DeleteAccountCard';

const Template: Story = () => <DeleteAccountCardComponent />;

export const DeleteAccountCard = Template.bind({});

export default {
    title: 'Components',
    component: DeleteAccountCardComponent,
} as Meta;
