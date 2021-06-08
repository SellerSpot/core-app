import { ITableProps, TTableCellCustomRenderer } from '@sellerspot/universal-components';
import { IBrandsPageProps } from '../../Brands.types';

export class BrandsTableService {
    static getTableProps = (
        brands: IBrandsPageProps['brands'],
    ): ITableProps<IBrandsPageProps['brands'][0]> => {
        // custom renderers
        const snoCustomRenderer: TTableCellCustomRenderer<IBrandsPageProps['brands'][0]> = (
            props,
        ) => {
            const { rowIndex } = props;
            return rowIndex + 1;
        };

        // return
        return {
            data: brands,
            shape: [
                {
                    columnName: 'Sno',
                    align: 'center',
                    width: '5%',
                    customRenderer: snoCustomRenderer,
                },
            ],
        };
    };
}
