import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import CardComponent from './Card';
import { ICardProps } from './Card.types';

const Template: Story<ICardProps> = (args: ICardProps) => <CardComponent {...args} />;

export const Card = Template.bind({});
Card.args = {
    content: <div>This is sample Card Content</div>,
} as ICardProps;

export default {
    title: 'Components/Atoms',
    component: CardComponent,
} as Meta;
