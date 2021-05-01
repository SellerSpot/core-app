interface ICategory {
    title: string;
    children: ICategory[];
}

export interface IChooseCategoryProps {
    categoriesData: ICategory[];
}
