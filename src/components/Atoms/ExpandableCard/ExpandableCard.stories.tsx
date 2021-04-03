import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import ExpandableCard from './ExpandableCard';
import { IExpandableCardProps } from './ExpandableCard.types';

const Template: Story<IExpandableCardProps> = (args: IExpandableCardProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <ExpandableCard {...args} />
        </ThemeProvider>
    </Provider>
);

export const Component = Template.bind({});
Component.args = {
    expanded: true,
    content: {
        summaryContent: <div>Summary Content</div>,
        detailsContent: <div>Details Content</div>,
    },
} as IExpandableCardProps;

export default {
    title: 'Components/Atoms/ExpandableCard',
    component: Component,
} as Meta;
