import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import ExpandableCardComponent from './ExpandableCard';
import { IExpandableCardProps } from './ExpandableCard.types';

const Template: Story<IExpandableCardProps> = (args: IExpandableCardProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <ExpandableCardComponent {...args} />
        </ThemeProvider>
    </Provider>
);

export const ExpandableCard = Template.bind({});
ExpandableCard.args = {
    expanded: true,
    content: {
        summaryContent: <div>Summary Content</div>,
        detailsContent: <div>Details Content</div>,
    },
} as IExpandableCardProps;

export default {
    title: 'Components/Atoms',
    component: ExpandableCardComponent,
    parameters: {
        layout: 'padded',
    },
} as Meta;
