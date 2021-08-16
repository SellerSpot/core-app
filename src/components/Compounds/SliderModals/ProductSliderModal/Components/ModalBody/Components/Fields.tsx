import { BrandService } from 'pages/Catalogue/Brand/Brand.service';
import { StockUnitService } from 'pages/Catalogue/StockUnit/StockUnit.service';
import React, { ReactElement } from 'react';
import { useField } from 'react-final-form';
import { ICONS } from 'utilities/utilities';
import Icon from '@iconify/react';
import {
    AsyncCreatableSelect,
    Button,
    IAsyncCreatableSelectProps,
    IInputFieldProps,
    ISelectOption,
    InputField,
} from '@sellerspot/universal-components';
import { ProductSliderModalService } from '../../../ProductSliderModal.service';
import {
    IProductSliderModalForm,
    IProductSliderModalProps,
} from '../../../ProductSliderModal.types';
import styles from './Fields.module.scss';
import { ProductSliderModalFieldsService } from './Fields.service';

interface ICommonProps {
    submitting: boolean;
}
type IProductNameFieldProps = ICommonProps & {
    autoFocus: boolean;
};
type IBarcodeFieldProps = ICommonProps;
type IDescriptionFieldProps = ICommonProps;
type IBrandFieldProps = ICommonProps & {
    onCreateBrand: (value: string) => void;
};
type IStockUnitFieldProps = Pick<IProductSliderModalProps, 'onCreateStockUnit'> & ICommonProps;
type ICategorySelectButtonProps = Pick<IProductSliderModalProps, 'onInvokeCategoryChoice'> &
    ICommonProps;
type ISelectedCategoryViewProps = Pick<
    IProductSliderModalProps,
    'selectedCategory' | 'onInvokeCategoryChoice' | 'treeData' | 'onCancelCategoryChoice'
> &
    ICommonProps;

const ProductNameField = (props: IProductNameFieldProps): ReactElement => {
    // props
    const { autoFocus, submitting } = props;
    const fieldName: keyof IProductSliderModalForm = 'name';

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
    const fieldName: keyof IProductSliderModalForm = 'barcode';

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
    const fieldName: keyof IProductSliderModalForm = 'description';

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
    const fieldName: keyof IProductSliderModalForm = 'brand';

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
            return ProductSliderModalFieldsService.formatBrandDataForSelectComponent(brand);
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
            onCreateOption={onCreateBrand}
            helperMessage={{
                enabled: helperMessage.enabled,
                content: helperMessage.content,
                type: helperMessage.type,
            }}
            placeholder={'Search for brand...'}
            onChange={onChange}
        />
    );
};

const StockUnitField = (props: IStockUnitFieldProps): ReactElement => {
    // props
    const { submitting, onCreateStockUnit } = props;
    const fieldName: keyof IProductSliderModalForm = 'stockUnit';

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
            return ProductSliderModalFieldsService.formatStockUnitDataForSelectComponent(stockUnit);
        });
    };

    // const formatOptionLabelHandler: IAsyncCreatableSelectProps['formatOptionLabel'] = (option) => {
    //     const currOption = option as ISelectOption<IStockUnitData>;
    //     return (
    //         <div className={styles.stockUnitSelectLabel}>
    //             <p>{currOption.meta.name}</p>
    //             <p>
    //                 <b>{`  [${currOption.meta.unit}]`}</b>
    //             </p>
    //         </div>
    //     );
    // };

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

const CategorySelectButton = (props: ICategorySelectButtonProps): ReactElement => {
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

const SelectedCategoryView = (props: ISelectedCategoryViewProps): ReactElement => {
    // props
    const {
        selectedCategory,
        treeData,
        onInvokeCategoryChoice,
        submitting,
        onCancelCategoryChoice,
    } = props;

    const ancestry = ProductSliderModalFieldsService.constructCategoryAncestry({
        category: selectedCategory,
        treeData,
    });

    // draw
    return (
        <div className={styles.selectedCategoryView}>
            <h4>Category</h4>
            <div className={styles.ancestryWrapper}>
                {ancestry.map((category, index) => {
                    if (category === selectedCategory.title) {
                        return (
                            <span key={index}>
                                <b>{category}</b>
                            </span>
                        );
                    } else {
                        return <span key={index}>{`${category} > `}</span>;
                    }
                })}
            </div>
            <div className={styles.selectedCategoryViewButtonsWrapper}>
                <Button
                    onClick={onCancelCategoryChoice}
                    label="CANCEL"
                    theme="danger"
                    size="large"
                    variant="outlined"
                    fullWidth
                    startIcon={<Icon icon={ICONS.close} />}
                    disabled={submitting}
                />
                <Button
                    onClick={onInvokeCategoryChoice}
                    label="CHANGE CATEGORY"
                    theme="primary"
                    size="large"
                    variant="contained"
                    fullWidth
                    startIcon={<Icon icon={ICONS.bxCategoryAlt} />}
                    disabled={submitting}
                />
            </div>
        </div>
    );
};

export default {
    ProductNameField,
    BarcodeField,
    DescriptionField,
    BrandField,
    CategorySelectButton,
    StockUnitField,
    SelectedCategoryView,
};
