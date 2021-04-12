import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import DomainInformationCardComponent from './DomainInformationCard';

const Template: Story = () => <DomainInformationCardComponent />;

export const DomainInformationCard = Template.bind({});

export default {
    title: 'Components/Compounds',
    component: DomainInformationCardComponent,
} as Meta;
