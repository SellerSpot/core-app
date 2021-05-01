import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import {
    ModifyCategories as ModifyCategoriesComponent,
    IModifyCategoriesProps,
} from './ModifyCategories';

const Template: Story<IModifyCategoriesProps> = (args: IModifyCategoriesProps) => (
    <ModifyCategoriesComponent {...args} />
);

export const ModifyCategories = Template.bind({});
ModifyCategories.args = {
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
} as IModifyCategoriesProps;

export default {
    title: 'Components',
    component: ModifyCategoriesComponent,
} as Meta;
