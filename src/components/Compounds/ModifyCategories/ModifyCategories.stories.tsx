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
            id: Math.random().toString(36).substr(2, 5),
            title: 'Shirts',
            children: [
                {
                    id: Math.random().toString(36).substr(2, 5),
                    title: 'T-Shirt',
                },
                {
                    id: Math.random().toString(36).substr(2, 5),
                    title: 'Formals',
                },
                {
                    id: Math.random().toString(36).substr(2, 5),
                    title: 'Casuals',
                },
            ],
        },
        {
            id: Math.random().toString(36).substr(2, 5),
            title: 'Shoes',
            children: [
                {
                    id: Math.random().toString(36).substr(2, 5),
                    title: 'Casuals',
                    children: [
                        {
                            id: Math.random().toString(36).substr(2, 5),
                            title: 'Lace',
                        },
                        {
                            id: Math.random().toString(36).substr(2, 5),
                            title: 'Velcro',
                        },
                    ],
                },
                {
                    id: Math.random().toString(36).substr(2, 5),
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
