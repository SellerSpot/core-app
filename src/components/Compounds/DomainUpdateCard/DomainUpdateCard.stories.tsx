import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import DomainUpdateCardComponent from './DomainUpdateCard';

const Template: Story = () => <DomainUpdateCardComponent />;

export const DomainUpdateCard = Template.bind({});

export default {
    title: 'Components/Compounds',
    component: DomainUpdateCardComponent,
} as Meta;
