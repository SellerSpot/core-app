import { AsyncCreatableSelect, InputField, ISelectOption } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { useField } from 'react-final-form';

interface ICommonFieldProps {
    outletId: string;
}

export const StockField = (props: ICommonFieldProps): ReactElement => {
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
            label={'Stock'}
            theme="primary"
            direction={'rtl'}
            type="number"
        />
    );
};

export const LandingCostCustomRenderer = (props: ICommonFieldProps): ReactElement => {
    // props
    const { outletId } = props;
    const fieldName = `${outletId}.landingCost`;

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
            label={'Landing Cost'}
            theme="primary"
            direction={'rtl'}
            type="number"
        />
    );
};

export const MarkupCustomRenderer = (props: ICommonFieldProps): ReactElement => {
    // props
    const { outletId } = props;
    const fieldName = `${outletId}.markup`;

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
            fullWidth
            label={'Markup'}
            theme="primary"
            value={value as string}
            direction={'rtl'}
            type="number"
        />
    );
};

export const MRPCustomRenderer = (props: ICommonFieldProps): ReactElement => {
    // props
    const { outletId } = props;
    const fieldName = `${outletId}.markup`;

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
            fullWidth
            label={'MRP'}
            theme="primary"
            value={value as string}
            direction={'rtl'}
            type="number"
        />
    );
};

export const TaxSettingCustomRenderer = (props: ICommonFieldProps): ReactElement => {
    // props
    const { outletId } = props;
    const fieldName = `${outletId}.taxSetting`;

    // hooks
    const { input } = useField(fieldName, {
        validateFields: [],
    });
    const { value, onChange } = input;
    console.log(value);

    // handlers
    const loadOptionsHandler = async (): Promise<ISelectOption[]> => {
        return [];
    };

    // draw
    return (
        <AsyncCreatableSelect
            loadOptions={loadOptionsHandler}
            value={value}
            label="Tax Setting"
            onChange={onChange}
        />
    );
};
