import { InputField } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { useField } from 'react-final-form';

interface IStockFieldProps {
    outletId: string;
}

export const StockField = (props: IStockFieldProps): ReactElement => {
    // props
    const { outletId } = props;

    const fieldName = `${outletId}.stock`;

    // hooks
    const { input } = useField(fieldName, {
        validateFields: [],
    });
    const { value } = input;

    // draw
    return (
        <InputField
            {...input}
            name={null}
            value={value as string}
            fullWidth
            size="small"
            theme="primary"
            direction={'rtl'}
            disableHelperTextPlaceholderPadding
            type="number"
        />
    );
};

// export const LandingCostCustomRenderer = () => {
//     // props
//     const { rowData } = props;
//     const fieldName = `${rowData.id}.landingCost`;

//     // hooks
//     const { input } = useField(fieldName, {
//         validateFields: [],
//     });
//     const { value } = input;

//     // draw
//     return (
//         <InputField
//             {...input}
//             name={null}
//             value={value as string}
//             fullWidth
//             size="small"
//             theme="primary"
//             direction={'rtl'}
//             disableHelperTextPlaceholderPadding
//             type="number"
//         />
//     );
// };

// export const MarkupCustomRenderer = () => {
//     // props
//     const { rowData } = props;
//     const fieldName = `${rowData.id}.markup`;

//     // hooks
//     const { input } = useField(fieldName, {
//         validateFields: [],
//     });
//     const { value } = input;

//     // draw
//     return (
//         <InputField
//             {...input}
//             name={null}
//             fullWidth
//             size="small"
//             theme="primary"
//             value={value as string}
//             direction={'rtl'}
//             disableHelperTextPlaceholderPadding
//             type="number"
//         />
//     );
// };

// export const MRPCustomRenderer = () => {
//     // props
//     const { rowData } = props;
//     const fieldName = `${rowData.id}.markup`;

//     // hooks
//     const { input } = useField(fieldName, {
//         validateFields: [],
//     });
//     const { value } = input;

//     // draw
//     return (
//         <InputField
//             {...input}
//             name={null}
//             fullWidth
//             size="small"
//             theme="primary"
//             value={value as string}
//             direction={'rtl'}
//             disableHelperTextPlaceholderPadding
//             type="number"
//         />
//     );
// };

// export const TaxSettingCustomRenderer = () => {
//     // props
//     const { rowData } = props;
//     const fieldName = `${rowData.id}.taxSetting`;

//     // hooks
//     const { input } = useField(fieldName, {
//         validateFields: [],
//     });
//     const { value, onChange } = input;
//     console.log(value);

//     // handlers
//     const loadOptionsHandler = async (): Promise<ISelectOption[]> => {
//         return [];
//     };

//     // draw
//     return (
//         <AsyncCreatableSelect
//             loadOptions={loadOptionsHandler}
//             value={value}
//             disableHelperTextPlaceholderPadding
//             onChange={onChange}
//         />
//     );
// };
