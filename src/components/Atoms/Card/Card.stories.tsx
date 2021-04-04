import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import Card from './Card';
import { ICardProps } from './Card.types';

const Template: Story<ICardProps> = (args: ICardProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <Card {...args} />
        </ThemeProvider>
    </Provider>
);

export const Component = Template.bind({});
Component.args = {
    content: <div>This is sample Card Content</div>,
} as ICardProps;

export default {
    title: 'Components/Atoms/Card',
    component: Component,
} as Meta;
