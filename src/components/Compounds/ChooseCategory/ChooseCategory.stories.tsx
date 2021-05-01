import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { ChooseCategory as ChooseCategoryComponent, IChooseCategoryProps } from './ChooseCategory';

const Template: Story<IChooseCategoryProps> = (args: IChooseCategoryProps) => (
    <ChooseCategoryComponent {...args} />
);

export const ChooseCategory = Template.bind({});
ChooseCategory.args = {
    categoriesData: [
        {
            title: 'Shirts',
            children: [
                {
                    title: 'T-Shirts',
                },
                {
                    title: 'Formals',
                },
                {
                    title: 'Casuals',
                },
            ],
        },
        {
            title: 'Shoes',
            children: [
                {
                    title: 'Casuals',
                    children: [
                        {
                            title: 'Lace',
                        },
                        {
                            title: 'Velcro',
                        },
                    ],
                },
                {
                    title: 'Office',
                },
            ],
        },
    ],
} as IChooseCategoryProps;

export default {
    title: 'Components',
    component: ChooseCategoryComponent,
} as Meta;
