interface ICategory {
    name: string;
    subCategories: ICategory[];
}

export interface IModifyCategoriesProps {
    categoriesData: ICategory[];
}
