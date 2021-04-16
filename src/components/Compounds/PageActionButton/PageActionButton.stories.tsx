import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { numberFormatINRCurrency } from 'utilities/general';
import PageActionButtonComponent from './PageActionButton';
import { IPageActionButton } from './PageActionButton.types';

const Template: Story = (args: IPageActionButton) => (
    <div
        style={{
            width: '400px',
        }}
    >
        <PageActionButtonComponent {...args} />
    </div>
);

export const PageActionButton = Template.bind({});
PageActionButton.args = {
    messageLeft: 'Pay',
    messageRight: numberFormatINRCurrency(200),
} as IPageActionButton;

export default {
    title: 'Components/Compounds',
    component: PageActionButtonComponent,
} as Meta;
