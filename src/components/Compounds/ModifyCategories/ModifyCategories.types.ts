interface ICategory {
    title: string;
    children: ICategory[];
}

export interface IModifyCategoriesProps {
    categoriesData: ICategory[];
}
