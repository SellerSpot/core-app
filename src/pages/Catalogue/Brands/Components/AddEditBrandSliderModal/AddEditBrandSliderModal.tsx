import { State } from '@hookstate/core';
import Icon from '@iconify/react';
import {
    Button,
    IInputFieldProps,
    InputField,
    SliderModal,
} from '@sellerspot/universal-components';
import { isNull } from 'lodash';
import React, { ReactElement, useEffect, useState } from 'react';
import { Field, Form, FormProps } from 'react-final-form';
import { ICONS } from 'utilities/utilities';
import { ICatalogueBrandsPageState } from '../../CatalogueBrandsPage.types';
import styles from './AddEditBrandSliderModal.module.scss';
import { AddEditBrandSliderModalService } from './AddEditBrandSliderModal.service';
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

export const AddEditBrandSliderModal = (props: {
    pageState: State<ICatalogueBrandsPageState>;
}): ReactElement => {
    // props
    const { pageState } = props;

    // state
    const [formInitialState, setFormInitialState] = useState<IAddEditBrandSliderModalForm>({
        name: '',
    });

    // handlers
    const handleFormSubmit: FormProps['onSubmit'] = async (
        values: IAddEditBrandSliderModalForm,
    ) => {
        if (isNull(pageState.brandIndexToEdit.get())) {
            const newBrandData = await AddEditBrandSliderModalService.createBrand(values);
            pageState.brandsData.set((state) => {
                const newState = [newBrandData, ...state];
                return newState;
            });
        } else {
        }
    };
    const handleSliderCloseActionButtonClick = () => {
        pageState.merge({
            showAddEditBrandSlider: false,
            brandIndexToEdit: null,
        });
    };

    // compute
    const headerMode: IAddEditBrandSliderModalHeaderProps['headerMode'] = isNull(
        pageState.brandIndexToEdit.get(),
    )
        ? 'add'
        : 'edit';

    // effects
    useEffect(() => {
        if (!isNull(pageState.brandIndexToEdit.get())) {
            const brandDataToEdit = pageState.brandsData.get()[pageState.brandIndexToEdit.get()];
            setFormInitialState({
                name: brandDataToEdit['name'],
            });
        }
    }, [pageState.showAddEditBrandSlider, pageState.brandIndexToEdit]);

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
                            show={pageState.showAddEditBrandSlider.get()}
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
                                                autoFocus={pageState.showAddEditBrandSlider.get()}
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
