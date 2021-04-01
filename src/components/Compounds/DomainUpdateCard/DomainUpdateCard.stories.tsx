import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import DomainUpdateCard from './DomainUpdateCard';
import { IDomainUpdateCardProps } from './DomainUpdateCard.types';

const Template: Story<IDomainUpdateCardProps> = (args: IDomainUpdateCardProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <DomainUpdateCard />
        </ThemeProvider>
    </Provider>
);

export const Component = Template.bind({});
Component.args = {} as IDomainUpdateCardProps;

export default {
    title: 'Components/Compounds/DomainUpdateCard',
    component: Component,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;
