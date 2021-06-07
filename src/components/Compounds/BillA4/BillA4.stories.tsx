import { CSSProperties } from '@material-ui/styles';
import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useRef } from 'react';
import { BillA4 as BillA4Component, IBillA4Props } from './BillA4';

const Template: Story<IBillA4Props> = (args: IBillA4Props) => {
    const billReference = useRef<HTMLDivElement>(null);
    const wrapperStyle: CSSProperties = {
        width: '100vw',
        height: '100vh',
        padding: '5px',
        overflow: 'scroll',
    };
    return (
        <div style={wrapperStyle}>
            <BillA4Component {...args} billReference={billReference} />
        </div>
    );
};

export const BillA4 = Template.bind({});
BillA4.args = {} as IBillA4Props;

export default {
    title: 'Core App/Compounds/Bill A 4',
    parameters: {
        layout: 'fullscreen',
    },
    component: BillA4Component,
} as Meta;
