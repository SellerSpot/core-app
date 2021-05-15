import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useRef } from 'react';
import { BillA4 as BillA4Component, IBillA4Props } from './BillA4';

const Template: Story<IBillA4Props> = (args: IBillA4Props) => {
    const billReference = useRef<HTMLDivElement>(null);
    return <BillA4Component {...args} billReference={billReference} />;
};

export const BillA4 = Template.bind({});
BillA4.args = {} as IBillA4Props;

export default {
    title: 'Components',
    component: BillA4Component,
} as Meta;
