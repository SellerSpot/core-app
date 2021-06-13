import { State } from '@hookstate/core';
import { ITableProps, TTableCellCustomRenderer } from '@sellerspot/universal-components';
import { IProductData } from 'requests/Catalogue/CatalogueServer';
import { IProductsPageState } from '../../Products.types';

export class ProductsTableService {
    static getTableProps = (props: {
        pageState: State<IProductsPageState>;
    }): ITableProps<IProductData> => {
        // props
        const { pageState } = props;

        // custom renderers
        const sNoCustomRenderer: TTableCellCustomRenderer<IProductData> = (props) => {
            // props
            const { rowIndex } = props;

            // draw
            return rowIndex + 1;
        };

        // draw
        return {
            data: pageState.products.get(),
            shape: [
                {
                    columnName: 'S.No',
                    width: '5%',
                    customRenderer: sNoCustomRenderer,
                },
                {
                    dataKey: 'name',
                    columnName: 'Product',
                    width: '40%',
                },
                {
                    dataKey: 'brand',
                    columnName: 'Brand',
                },
                {
                    dataKey: 'barcode',
                    columnName: 'Barcode',
                },
                {
                    dataKey: 'category',
                    columnName: 'Category',
                },
            ],
        };
    };
}
