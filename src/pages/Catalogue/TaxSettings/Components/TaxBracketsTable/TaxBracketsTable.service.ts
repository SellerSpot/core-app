import { State } from '@hookstate/core';
import { ITableProps } from '@sellerspot/universal-components';
import { ITaxBracket, ITaxSettingsState } from '../../TaxSettings.types';

export class TaxBracketsTableService {
    static getTableProps = (props: {
        pageState: State<ITaxSettingsState>;
    }): ITableProps<ITaxBracket> => {
        // props
        const { pageState } = props;

        // draw
        return {
            data: pageState.taxBrackets.get(),
            shape: [
                {
                    columnName: 'S.No',
                    align: 'center',
                    width: '5%',
                },
                {
                    dataKey: 'name',
                    columnName: 'Bracket Name',
                    align: 'left',
                    width: '60%',
                },
                {
                    dataKey: 'rate',
                    columnName: 'Rate',
                    align: 'right',
                    width: '10%',
                },
            ],
        };
    };
}
