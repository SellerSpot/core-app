import Icon from '@iconify/react';
import {
    Button,
    IInputFieldProps,
    InputField,
    SliderModal,
} from '@sellerspot/universal-components';
import { clone, isNull } from 'lodash';
import React, { ReactElement, useEffect, useState } from 'react';
import { Field, Form, FormProps } from 'react-final-form';
import { ICONS } from 'utilities/utilities';
import { useCatalogueBrandsPageState } from '../../CatalogueBrandsPage';
import styles from './AddEditBrandSliderModal.module.scss';
import { AddEditBrandSliderModalService } from './AddEditBrandSliderModal.service';
// import { AddEditBrandSliderModalService } from './AddEditBrandSliderModal.service';
import {
    IAddEditBrandSliderModalForm,
    IAddEditBrandSliderModalHeaderProps,
} from './AddEditBrandSliderModal.types';

const SliderModalHeader = (props: IAddEditBrandSliderModalHeaderProps) => {
    // props
    const { headerMode, submitting } = props;

    // compute
    const headerTitle = headerMode === 'add' ? 'Add Brand' : 'Edit Brand';
    const primaryButtonLabel =
        headerMode === 'add'
            ? submitting
                ? 'ADDING...'
                : 'ADD BRAND'
            : submitting
            ? 'SAVING...'
            : 'SAVE';

    return (
        <div className={styles.sliderModalHeaderWrapper}>
            <h3>{headerTitle}</h3>
            <div className={styles.actions}>
                {headerMode === 'edit' ? (
                    <Button label="DELETE BRAND" tabIndex={3} theme="danger" variant="outlined" />
                ) : null}
                <Button
                    label={primaryButtonLabel}
                    theme="primary"
                    isLoading={submitting}
                    type="submit"
                    tabIndex={2}
                    variant="contained"
                    startIcon={<Icon icon={ICONS.outlineAdd} />}
                />
            </div>
        </div>
    );
};

export const AddEditBrandSliderModal = (): ReactElement => {
    // state
    const { showAddEditBrandSlider, brandIndexToEdit, brandsData, closeBrandSlider, addBrand } =
        useCatalogueBrandsPageState();
    const [formInitialState, setFormInitialState] = useState<IAddEditBrandSliderModalForm>({
        name: '',
    });

    // handlers
    const handleFormSubmit: FormProps['onSubmit'] = async (
        values: IAddEditBrandSliderModalForm,
    ) => {
        if (isNull(brandIndexToEdit)) {
            const newBrandData = await AddEditBrandSliderModalService.createBrand(values);
            // // debugger;
            addBrand({ brandData: clone(newBrandData) });
        } else {
        }
    };
    const handleSliderCloseActionButtonClick = () => {
        closeBrandSlider();
    };

    // compute
    const headerMode: IAddEditBrandSliderModalHeaderProps['headerMode'] = isNull(brandIndexToEdit)
        ? 'add'
        : 'edit';

    // effects
    useEffect(() => {
        if (!isNull(brandIndexToEdit)) {
            const brandDataToEdit = brandsData[brandIndexToEdit];
            setFormInitialState({
                name: brandDataToEdit['name'],
            });
        }
    }, [showAddEditBrandSlider, brandIndexToEdit]);

    // useEffect(() => {
    //     debugger;
    //     console.log(brandsData);
    // }, [brandsData]);

    return (
        <Form
            subscription={{ submitting: true }}
            onSubmit={handleFormSubmit}
            initialValues={formInitialState}
        >
            {({ handleSubmit, submitting }) => {
                return (
                    <form onSubmit={handleSubmit} noValidate>
                        <SliderModal
                            headerProps={{
                                showActionButton: 'backButton',
                                onActionButtonClick: handleSliderCloseActionButtonClick,
                            }}
                            show={showAddEditBrandSlider}
                            width={'30%'}
                        >
                            <SliderModalHeader headerMode={headerMode} submitting={submitting} />
                            <div className={styles.sliderModalBodyWrapper}>
                                <Field name={'name' as keyof IAddEditBrandSliderModalForm}>
                                    {({ input, meta }) => {
                                        const { value, onChange } = input;
                                        const { error, visited } = meta;

                                        const showError = !!error && visited;
                                        const helperMessage: IInputFieldProps['helperMessage'] = {
                                            enabled: showError,
                                            content: error,
                                            type: 'error',
                                        };
                                        const fieldTheme: IInputFieldProps['theme'] = showError
                                            ? 'danger'
                                            : 'primary';
                                        return (
                                            <InputField
                                                {...input}
                                                name={undefined}
                                                type="text"
                                                fullWidth
                                                tabIndex={1}
                                                value={value}
                                                required
                                                autoFocus={showAddEditBrandSlider}
                                                theme={fieldTheme}
                                                label={'Brand Name'}
                                                helperMessage={helperMessage}
                                                selectTextOnFocus
                                                onChange={onChange}
                                            />
                                        );
                                    }}
                                </Field>
                            </div>
                        </SliderModal>
                    </form>
                );
            }}
        </Form>
    );
};
