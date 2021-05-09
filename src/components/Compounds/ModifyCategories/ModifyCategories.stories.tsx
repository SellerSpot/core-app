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
            id: 'incididunt',
            title: 'Shirts',
            children: [
                {
                    id: 'exd',
                    title: 'T-Shirt',
                },
                {
                    id: 'in',
                    title: 'Formals',
                },
                {
                    id: 'nullafa',
                    title: 'Casuals',
                },
            ],
        },
        {
            id: 'cupidatat',
            title: 'Shoes',
            children: [
                {
                    id: 'nostrud',
                    title: 'Casuals',
                    children: [
                        {
                            id: 'nulla',
                            title: 'Lace',
                        },
                        {
                            id: 'irure',
                            title: 'Velcro',
                        },
                    ],
                },
                {
                    id: 'ex',
                    title: 'Office',
                },
            ],
        },
    ],
} as IModifyCategoriesProps;

export default {
    title: 'Components/Fullscreen',
    component: ModifyCategoriesComponent,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;
