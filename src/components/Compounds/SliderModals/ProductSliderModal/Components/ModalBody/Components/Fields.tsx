import Icon from '@iconify/react';
import {
    AsyncCreatableSelect,
    Button,
    IAsyncCreatableSelectProps,
    IInputFieldProps,
    InputField,
    ISelectOption,
} from '@sellerspot/universal-components';
import { BrandService } from 'pages/Catalogue/Brand/Brand.service';
import { StockUnitService } from 'pages/Catalogue/StockUnit/StockUnit.service';
import React, { ReactElement } from 'react';
import { useField } from 'react-final-form';
import { ICONS } from 'utilities/utilities';
import { ProductSliderModalService } from '../../../ProductSliderModal.service';
import { IProductSliderForm, IProductSliderModalProps } from '../../../ProductSliderModal.types';
import styles from './Fields.module.scss';
import { ProductSliderFieldsService } from './Fields.service';

interface ICommonProps {
    submitting: boolean;
}

type IProductNameFieldProps = ICommonProps & {
    autoFocus: boolean;
};

type IBarcodeFieldProps = ICommonProps;

type IDescriptionFieldProps = ICommonProps;

type IBrandFieldProps = Pick<IProductSliderModalProps, 'onCreateBrand'> & ICommonProps;

type IStockUnitFieldProps = Pick<IProductSliderModalProps, 'onCreateStockUnit'> & ICommonProps;

type ICategoryFieldProps = Pick<IProductSliderModalProps, 'onInvokeCategoryChoice'> & ICommonProps;

const ProductNameField = (props: IProductNameFieldProps): ReactElement => {
    // props
    const { autoFocus, submitting } = props;
    const fieldName: keyof IProductSliderForm = 'name';

    // hooks
    const { input, meta } = useField(fieldName, {
        validate: ProductSliderModalService.validateField(fieldName),
        validateFields: [],
    });
    const { value } = input;

    // compute
    const specialInputFieldProps = ProductSliderModalService.getSpecialInputFieldProps(meta);
    const helperMessage: IInputFieldProps['helperMessage'] = {
        enabled: specialInputFieldProps.enabled,
        content: specialInputFieldProps.content,
        type: specialInputFieldProps.type,
    };

    // draw
    return (
        <InputField
            {...input}
            value={value as string}
            type="text"
            disabled={submitting}
            name={undefined}
            autoFocus={autoFocus}
            fullWidth
            size="medium"
            theme={specialInputFieldProps.theme}
            label="Product Name"
            helperMessage={helperMessage}
            placeHolder="Bracket Name"
        />
    );
};

const BarcodeField = (props: IBarcodeFieldProps): ReactElement => {
    // props
    const { submitting } = props;
    const fieldName: keyof IProductSliderForm = 'barcode';

    // hooks
    const { input, meta } = useField(fieldName, {
        validate: ProductSliderModalService.validateField(fieldName),
        validateFields: [],
    });
    const { value } = input;

    // compute
    const specialInputFieldProps = ProductSliderModalService.getSpecialInputFieldProps(meta);
    const helperMessage: IInputFieldProps['helperMessage'] = {
        enabled: specialInputFieldProps.enabled,
        content: specialInputFieldProps.content,
        type: specialInputFieldProps.type,
    };

    // draw
    return (
        <InputField
            {...input}
            value={value as string}
            type="text"
            disabled={submitting}
            name={undefined}
            maxNumericValue={100}
            minNumericValue={0}
            fullWidth
            size="medium"
            theme={specialInputFieldProps.theme}
            label="Barcode"
            helperMessage={helperMessage}
            placeHolder="Product Barcode"
        />
    );
};

const DescriptionField = (props: IDescriptionFieldProps): ReactElement => {
    // props
    const { submitting } = props;
    const fieldName: keyof IProductSliderForm = 'description';

    // hooks
    const { input, meta } = useField(fieldName, {
        validate: ProductSliderModalService.validateField(fieldName),
        validateFields: [],
    });
    const { value } = input;

    // compute
    const specialInputFieldProps = ProductSliderModalService.getSpecialInputFieldProps(meta);
    const helperMessage: IInputFieldProps['helperMessage'] = {
        enabled: specialInputFieldProps.enabled,
        content: specialInputFieldProps.content,
        type: specialInputFieldProps.type,
    };

    // draw
    return (
        <InputField
            {...input}
            value={value as string}
            type="text"
            disabled={submitting}
            name={undefined}
            maxNumericValue={100}
            minNumericValue={0}
            fullWidth
            multiline
            rows={5}
            size="medium"
            theme={specialInputFieldProps.theme}
            label="Description"
            helperMessage={helperMessage}
            placeHolder="Product description..."
        />
    );
};

const BrandField = (props: IBrandFieldProps): ReactElement => {
    // props
    const { submitting, onCreateBrand } = props;
    const fieldName: keyof IProductSliderForm = 'brand';

    // hooks
    const { input, meta } = useField(fieldName, {
        validate: ProductSliderModalService.validateField(fieldName),
        validateFields: [],
    });
    const { value, onChange } = input;

    // compute
    const specialInputFieldProps = ProductSliderModalService.getSpecialSelectFieldProps(
        meta as string,
    );
    const helperMessage: IAsyncCreatableSelectProps['helperMessage'] = {
        enabled: specialInputFieldProps.enabled,
        content: specialInputFieldProps.content,
        type: specialInputFieldProps.type,
    };

    // handlers
    const loadOptionsHandler: IAsyncCreatableSelectProps['loadOptions'] = async (query) => {
        // getting search results
        const searchResults = await BrandService.searchBrand(query);
        return searchResults.map((brand) => {
            return {
                label: brand.name,
                value: brand.id,
            };
        });
    };

    // draw
    return (
        <AsyncCreatableSelect
            loadOptions={loadOptionsHandler}
            label="Brand"
            value={value as ISelectOption}
            isDisabled={submitting}
            formatCreateLabel={(inputValue) => `Create brand "${inputValue}"`}
            helperMessage={{
                enabled: helperMessage.enabled,
                content: helperMessage.content,
                type: helperMessage.type,
            }}
            placeholder={'Search for brand...'}
            onCreateOption={onCreateBrand}
            onChange={onChange}
        />
    );
};

const StockUnitField = (props: IStockUnitFieldProps): ReactElement => {
    // props
    const { submitting, onCreateStockUnit } = props;
    const fieldName: keyof IProductSliderForm = 'stockUnit';

    // hooks
    const { input, meta } = useField(fieldName, {
        validate: ProductSliderModalService.validateField(fieldName),
        validateFields: [],
    });
    const { value, onChange } = input;

    // compute
    const specialInputFieldProps = ProductSliderModalService.getSpecialSelectFieldProps(
        meta as string,
    );
    const helperMessage: IAsyncCreatableSelectProps['helperMessage'] = {
        enabled: specialInputFieldProps.enabled,
        content: specialInputFieldProps.content,
        type: specialInputFieldProps.type,
    };

    // handlers
    const loadOptionsHandler: IAsyncCreatableSelectProps['loadOptions'] = async (query) => {
        // getting search results
        const searchResults = await StockUnitService.searchStockUnit(query);
        // draw
        return searchResults.map((stockUnit) => {
            return ProductSliderFieldsService.formatStockUnitDataForSelectComponent(stockUnit);
        });
    };

    // draw
    return (
        <AsyncCreatableSelect
            loadOptions={loadOptionsHandler}
            label="Stock Unit"
            value={value as ISelectOption}
            isDisabled={submitting}
            formatCreateLabel={(inputValue) => `Create stock unit "${inputValue}"`}
            helperMessage={{
                enabled: helperMessage.enabled,
                content: helperMessage.content,
                type: helperMessage.type,
            }}
            placeholder={'Search for stock unit...'}
            onCreateOption={onCreateStockUnit}
            onChange={onChange}
        />
    );
};

const CategorySelectButton = (props: ICategoryFieldProps): ReactElement => {
    // props
    const { submitting, onInvokeCategoryChoice } = props;

    // draw
    return (
        <Button
            className={{
                wrapper: styles.buttonWrapper,
            }}
            onClick={onInvokeCategoryChoice}
            label="CHOOSE CATEGORY"
            theme="primary"
            size="large"
            variant="outlined"
            fullWidth
            startIcon={<Icon icon={ICONS.bxCategoryAlt} />}
            disabled={submitting}
        />
    );
};

export default {
    ProductNameField,
    BarcodeField,
    DescriptionField,
    BrandField,
    CategorySelectButton,
    StockUnitField,
};
