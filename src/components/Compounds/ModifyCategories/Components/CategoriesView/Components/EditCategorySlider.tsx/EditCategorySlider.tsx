import { Button, InputField, SliderModal } from '@sellerspot/universal-components';
import { useModifyCategoriesStore } from 'components/Compounds/ModifyCategories/ModifyCategories';
import React, { ReactElement } from 'react';
import { Field, Form, FormProps } from 'react-final-form';
import { IEditCategoryForm } from './EditCategory.types';
import styles from './EditCategorySlider.module.scss';

const EditCategoryHeader = () => {
    return (
        <div className={styles.headerWrapper}>
            <h3>Edit Category</h3>
        </div>
    );
};

const EditCategoryFooter = () => {
    return (
        <div className={styles.footerWrapper}>
            <Button label={'Cancel'} variant="outlined" theme="danger" />
            <Button label={'Save'} variant="contained" theme="primary" />
        </div>
    );
};

const categoryFormInitialValues: IEditCategoryForm = {
    categoryName: '',
    categoryDescription: '',
};

export const EditCategorySlider = (): ReactElement => {
    const { editableNodeId, setEditableNodeId } = useModifyCategoriesStore();
    const showSlider = !!editableNodeId;

    const handleSliderOnClose = () => {
        setEditableNodeId(null);
    };

    const handleFormSubmit: FormProps['onSubmit'] = (values: IEditCategoryForm) => {
        console.log(values);
    };

    return (
        <SliderModal
            show={showSlider}
            sliderHeader={<EditCategoryHeader />}
            sliderFooter={<EditCategoryFooter />}
            showBackButton
            width={'100%'}
            onClose={handleSliderOnClose}
        >
            <div className={styles.bodyWrapper}>
                <Form initialValues={categoryFormInitialValues} onSubmit={handleFormSubmit}>
                    {({ handleSubmit }) => (
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <Field name={'categoryName' as keyof IEditCategoryForm}>
                                {({ input }) => {
                                    const { value, onChange } = input;
                                    return (
                                        <InputField
                                            fullWidth
                                            value={value}
                                            autoFocus={showSlider}
                                            theme="primary"
                                            label={'Category Name'}
                                            selectTextOnFocus
                                            onChange={onChange}
                                        />
                                    );
                                }}
                            </Field>
                            <Field name={'categoryDescription' as keyof IEditCategoryForm}>
                                {({ input }) => {
                                    const { value, onChange } = input;
                                    return (
                                        <InputField
                                            fullWidth
                                            value={value}
                                            theme="primary"
                                            multiline
                                            rows={4}
                                            maxRows={5}
                                            label={'Category Description'}
                                            selectTextOnFocus
                                            onChange={onChange}
                                        />
                                    );
                                }}
                            </Field>
                        </form>
                    )}
                </Form>
            </div>
        </SliderModal>
    );
};
