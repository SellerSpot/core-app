import {
    AsyncCreatableSelect,
    Button,
    IAsyncCreatableSelectProps,
    IButtonProps,
    IInputFieldProps,
    InputField,
    ISelectOption,
    Switch,
} from '@sellerspot/universal-components';
import { FieldsService } from './Fields.service';
import {
    IInventorySliderModalFormFields,
    IInventorySliderModalProps,
    IInventorySubSliderHandlers,
} from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.types';
import { FieldState } from 'final-form';
import React, { ReactElement } from 'react';
import { useField } from 'react-final-form';
import { saleService } from 'services/services';
import styles from './Fields.module.scss';

interface ICommonFieldProps {
    outletId: string;
}

interface IStockFieldProps extends ICommonFieldProps {
    stockUnit: string;
}

interface IMarkupCustomRendererProps extends ICommonFieldProps {
    formRef: IInventorySliderModalProps['formRef'];
}

interface ILandingCostCustomRendererProps extends ICommonFieldProps {
    formRef: IInventorySliderModalProps['formRef'];
}

type ITaxBracketCustomRenderer = ICommonFieldProps &
    Pick<IInventorySubSliderHandlers, 'onCreateTaxBracket' | 'onCreateTaxGroup'>;

export const StockFieldCustomRenderer = (props: IStockFieldProps): ReactElement => {
    // props
    const { outletId, stockUnit } = props;
    const propertyName: keyof IInventorySliderModalFormFields = 'stock';
    const fieldName = `${outletId}.${propertyName}`;

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
            selectTextOnFocus
            suffix={stockUnit}
            minNumericValue={0}
            label={'Stock'}
            theme="primary"
            direction={'rtl'}
            type="number"
        />
    );
};

export const LandingCostCustomRenderer = (props: ILandingCostCustomRendererProps): ReactElement => {
    // props
    const { outletId, formRef } = props;
    const propertyName: keyof IInventorySliderModalFormFields = 'landingCost';
    const fieldName = `${outletId}.${propertyName}`;

    // getting value from other fields
    const markupFieldName = `${outletId}.${'markup' as keyof IInventorySliderModalFormFields}`;
    const sellingPriceFieldName = `${outletId}.${
        'sellingPrice' as keyof IInventorySliderModalFormFields
    }`;

    // hooks
    const { input } = useField(fieldName, {
        validateFields: [],
    });
    const { value, onChange } = input;

    // handlers
    // manual onChange handler to help compute selling price
    const onChangeHandler: IInputFieldProps['onChange'] = (event) => {
        onChange(event);
        const inputValue = +event.target.value;
        // getting required values
        const sellingPriceFieldState = formRef.current.getFieldState(
            sellingPriceFieldName,
        ) as FieldState<IInventorySliderModalFormFields['sellingPrice']>;
        const markupFieldState = formRef.current.getFieldState(markupFieldName) as FieldState<
            IInventorySliderModalFormFields['landingCost']
        >;

        // changing selling price
        sellingPriceFieldState.change(
            saleService.computeSellingPrice({
                landingCost: +inputValue,
                markupPercentage: +markupFieldState.value,
            }),
        );
    };

    // draw
    return (
        <InputField
            {...input}
            onChange={onChangeHandler}
            name={null}
            value={value as string}
            fullWidth
            selectTextOnFocus
            prefix={'₹'}
            minNumericValue={0}
            label={'Landing Cost'}
            theme="primary"
            direction={'rtl'}
            type="number"
        />
    );
};

export const SellingPriceCustomRenderer = (props: ICommonFieldProps): ReactElement => {
    // props
    const { outletId } = props;
    const propertyName: keyof IInventorySliderModalFormFields = 'sellingPrice';
    const fieldName = `${outletId}.${propertyName}`;

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
            minNumericValue={0}
            selectTextOnFocus
            label={'Selling Price'}
            theme="primary"
            prefix={'₹'}
            value={value as string}
            direction={'rtl'}
            type="number"
        />
    );
};

export const MarkupCustomRenderer = (props: IMarkupCustomRendererProps): ReactElement => {
    // props
    const { outletId, formRef } = props;
    const propertyName: keyof IInventorySliderModalFormFields = 'markup';
    const fieldName = `${outletId}.${propertyName}`;

    // getting value from other fields
    const landingCostFieldName = `${outletId}.${
        'landingCost' as keyof IInventorySliderModalFormFields
    }`;
    const sellingPriceFieldName = `${outletId}.${
        'sellingPrice' as keyof IInventorySliderModalFormFields
    }`;

    // hooks
    const { input } = useField(fieldName, {
        validateFields: [],
    });
    const { value, onChange } = input;

    // handlers
    // manual onChange handler to help compute selling price
    const onChangeHandler: IInputFieldProps['onChange'] = (event) => {
        onChange(event);
        const inputValue = +event.target.value;
        // getting required values
        const sellingPriceFieldState = formRef.current.getFieldState(
            sellingPriceFieldName,
        ) as FieldState<IInventorySliderModalFormFields['sellingPrice']>;
        const landingCostFieldState = formRef.current.getFieldState(
            landingCostFieldName,
        ) as FieldState<IInventorySliderModalFormFields['landingCost']>;

        // changing selling price
        sellingPriceFieldState.change(
            saleService.computeSellingPrice({
                landingCost: +landingCostFieldState.value,
                markupPercentage: +inputValue,
            }),
        );
    };

    // draw
    return (
        <InputField
            {...input}
            onChange={onChangeHandler}
            name={null}
            fullWidth
            minNumericValue={0}
            selectTextOnFocus
            label={'Markup'}
            theme="primary"
            suffix={'%'}
            value={value as string}
            direction={'rtl'}
            type="number"
        />
    );
};

export const MRPCustomRenderer = (props: ICommonFieldProps): ReactElement => {
    // props
    const { outletId } = props;
    const propertyName: keyof IInventorySliderModalFormFields = 'mrp';
    const fieldName = `${outletId}.${propertyName}`;

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
            selectTextOnFocus
            prefix={'₹'}
            label={'MRP'}
            minNumericValue={0}
            theme="primary"
            value={value as string}
            direction={'rtl'}
            type="number"
        />
    );
};

export const TaxSettingCustomRenderer = (props: ITaxBracketCustomRenderer): ReactElement => {
    // props
    const { outletId, onCreateTaxBracket, onCreateTaxGroup } = props;
    const propertyName: keyof IInventorySliderModalFormFields = 'taxBracket';
    const fieldName = `${outletId}.${propertyName}`;

    // hooks
    const { input } = useField(fieldName, {
        validateFields: [],
    });
    const { value, onChange } = input;

    // handlers
    const loadOptionsHandler: IAsyncCreatableSelectProps['loadOptions'] = async (
        query,
    ): Promise<ISelectOption[]> => {
        const allTaxBrakets = await FieldsService.searchTaxBrackets(query);
        return allTaxBrakets.map((bracket) => {
            return FieldsService.convertITaxBracketDataToISelect(bracket);
        });
    };
    const formatCreateLabelHandler: IAsyncCreatableSelectProps['formatCreateLabel'] = (query) => {
        // handlers
        const taxBracketOnClickHandler: IButtonProps['onClick'] = () => {
            onCreateTaxBracket(outletId, query);
        };
        const taxGroupOnClickHandler: IButtonProps['onClick'] = () => {
            onCreateTaxGroup(outletId, query);
        };

        // draw
        return (
            <div className={styles.taxBracketCreateLabelWrapper}>
                <Button
                    label={`Create Tax Bracket "${query}"`}
                    fullWidth
                    variant="contained"
                    theme="accent"
                    onClick={taxBracketOnClickHandler}
                />
                <Button
                    label={`Create Tax Group "${query}"`}
                    fullWidth
                    variant="contained"
                    theme="primary"
                    onClick={taxGroupOnClickHandler}
                />
            </div>
        );
    };
    const onCreateOptionHandler: IAsyncCreatableSelectProps['onCreateOption'] = () => void 0;

    // draw
    return (
        <AsyncCreatableSelect
            loadOptions={loadOptionsHandler}
            value={value}
            formatCreateLabel={formatCreateLabelHandler}
            onCreateOption={onCreateOptionHandler}
            label="Tax Setting"
            onChange={onChange}
        />
    );
};

export const IsActiveToggleCustomRenderer = (props: ICommonFieldProps): ReactElement => {
    // props
    const { outletId } = props;
    const propertyName: keyof IInventorySliderModalFormFields = 'isActive';
    const fieldName = `${outletId}.${propertyName}`;

    // hooks
    const { input } = useField(fieldName, {
        validateFields: [],
        type: 'checkbox',
    });
    const { checked, onChange } = input;

    // draw
    return (
        <div className={styles.toggleWrapper}>
            <Switch checked={checked} theme="primary" onChange={onChange} />
            <h5>Is Active</h5>
        </div>
    );
};

export const TrackInventoryToggleCustomRenderer = (props: ICommonFieldProps): ReactElement => {
    // props
    const { outletId } = props;
    const propertyName: keyof IInventorySliderModalFormFields = 'isTrack';
    const fieldName = `${outletId}.${propertyName}`;

    // hooks
    const { input } = useField(fieldName, {
        validateFields: [],
        type: 'checkbox',
    });
    const { checked, onChange } = input;

    // draw
    return (
        <div className={styles.toggleWrapper}>
            <Switch checked={checked} theme="primary" onChange={onChange} />
            <h5>Track Toggle</h5>
        </div>
    );
};
