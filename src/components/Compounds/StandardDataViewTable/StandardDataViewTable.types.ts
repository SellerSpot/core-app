interface ITableData {
    name: string;
    description: string;
    noOfProducts: number;
}

export interface IStandardDataViewTableProps {
    tableData: ITableData[];
}
