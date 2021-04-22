import { Button } from '@sellerspot/universal-components';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { PageHeader as PageHeaderComponent, IPageHeaderProps } from './PageHeader';

const Template: Story<IPageHeaderProps> = (args: IPageHeaderProps) => (
    <PageHeaderComponent {...args} />
);

export const PageHeader = Template.bind({});
PageHeader.args = {
    title: 'Brand',
    actions: [
        <Button key={'adsfd'} label={'Another Action'} variant={'contained'} theme={'success'} />,
        <Button key={'adsf'} label={'Add Brand'} variant={'contained'} theme={'primary'} />,
    ],
} as IPageHeaderProps;

export default {
    title: 'Components',
    component: PageHeaderComponent,
} as Meta;
