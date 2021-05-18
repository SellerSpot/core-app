import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button } from '@sellerspot/universal-components';
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
    title: 'Design System/Compounds/Page Header',
    component: PageHeaderComponent,
} as Meta;
