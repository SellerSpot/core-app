import { numberFormatINRCurrency } from 'utilities/general';
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { IPageActionButton } from './PageActionButton.types';
import PageActionButtonComponent from './PageActionButton';

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
    title: 'Design System/Compounds/Page Action Button',
    component: PageActionButtonComponent,
} as Meta;
