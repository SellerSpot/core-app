import { State } from '@hookstate/core';
import { Table } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { ITaxSettingsState } from '../../../TaxSettings.types';
import { TaxBracketsTableService } from './TaxBracketTable.service';

// interface IDialogState {
//     showDialog: boolean;
//     taxBracketName: string;
//     taxBracketId: string;
// }

// const DialogComponent = (props: {
//     dialogState: State<IDialogState>;
//     getAllStockUnit: () => Promise<void>;
// }) => {
//     // props
//     const { dialogState, getAllStockUnit } = props;

//     // state
//     const isLoading = useState(false);

//     // handlers
//     const handlePrimaryButtonOnClick = async () => {
//         isLoading.set(true);
//         // request
//         const result = await TaxBracketsTableService.(dialogState.taxBracketId.get());
//         // compute
//         if (result) {
//             await getAllStockUnit();
//             showNotify(`'${dialogState.taxBracketName.get()}' tax bracket deleted successfully!`, {
//                 theme: 'success',
//             });
//         }
//         isLoading.set(false);
//         dialogState.showDialog.set(false);
//     };
//     const handleSecondaryButtonOnClick = () => dialogState.showDialog.set(false);

//     // draw
//     return (
//         <Dialog showDialog={dialogState.showDialog.get()}>
//             <DialogLayoutWrapper>
//                 <DialogHeader title={'Are you sure?'} />
//                 <DialogBody>
//                     <Alert type="error">{`This action will delete stock unit '${dialogState.taxBracketName.get()}'`}</Alert>
//                 </DialogBody>
//                 <DialogFooter>
//                     <Button
//                         variant="outlined"
//                         theme="primary"
//                         disabled={isLoading.get()}
//                         label={'CANCEL'}
//                         onClick={handleSecondaryButtonOnClick}
//                     />
//                     <Button
//                         variant="contained"
//                         theme="danger"
//                         isLoading={isLoading.get()}
//                         label={'DELETE STOCK UNIT'}
//                         onClick={handlePrimaryButtonOnClick}
//                     />
//                 </DialogFooter>
//             </DialogLayoutWrapper>
//         </Dialog>
//     );
// };

export const TaxBracketsTable = (props: { pageState: State<ITaxSettingsState> }): ReactElement => {
    // props
    const { pageState } = props;

    // // handlers
    // const deleteItemClickHandler = (taxBracketData: ITaxBracketData) => async () => {
    //     // props
    //     const { id, name } = taxBracketData;

    //     // state
    //     const dialogState = useState<IDialogState>({
    //         showDialog: false,
    //         taxBracketId: '',
    //         taxBracketName: '',
    //     });

    //     // state update
    //     dialogState.merge({
    //         taxBracketName: name,
    //         taxBracketId: id,
    //         showDialog: true,
    //     });
    // };
    // const editItemClickHandler = (taxBracketData: ITaxBracketData) => async () => {
    //     // state update
    //     pageState.isTaxBracketTableLoading.merge({
    //         prefillData: taxBracketData,
    //         showSliderModal: true,
    //         isEditMode: true,
    //     });
    // };

    // compute
    const tableProps = TaxBracketsTableService.getTableProps({ pageState });

    // state
    return <Table {...tableProps} />;
};
