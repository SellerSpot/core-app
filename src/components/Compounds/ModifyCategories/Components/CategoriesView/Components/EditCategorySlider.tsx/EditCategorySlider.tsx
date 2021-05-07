import {
    Button,
    IInputFieldProps,
    InputField,
    showNotify,
    SliderModal,
    SliderModalBody,
    SliderModalHeader,
} from '@sellerspot/universal-components';
import { useModifyCategoriesStore } from 'components/Compounds/ModifyCategories/ModifyCategories';
import React, { ReactElement } from 'react';
import { Field, Form, FormProps } from 'react-final-form';
import { changeNodeAtPath, TreeItem } from 'react-sortable-tree';
import { IEditCategoryForm } from './EditCategory.types';
import styles from './EditCategorySlider.module.scss';
import { EditCategorySliderService } from '../../../../services/EditCategorySlider.service';

const getNodeKey = ({ treeIndex }: { treeIndex: number }) => treeIndex;

const EditCategoryHeader = () => {
    const { setEditableNodeDetails } = useModifyCategoriesStore();

    const handleSliderOnClose = () => {
        setEditableNodeDetails(null);
    };
    return (
        <div className={styles.headerWrapper}>
            <h3>Edit Category</h3>
            <div className={styles.actionButtons}>
                <Button
                    label={'Cancel'}
                    variant="outlined"
                    theme="danger"
                    onClick={handleSliderOnClose}
                />
                <Button label={'Save'} variant="contained" theme="primary" type="submit" />
            </div>
        </div>
    );
};

export const EditCategorySlider = (): ReactElement => {
    const {
        editableNodeDetails,
        setEditableNodeDetails,
        treeData,
        setTreeData,
    } = useModifyCategoriesStore();
    const showSlider = !!editableNodeDetails;
    const { node: editableNode, path: editableNodePath } = editableNodeDetails || {};

    const categoryFormInitialValues: IEditCategoryForm = {
        categoryName: `${editableNode?.title}`,
        categoryDescription: '',
    };

    const handleFormSubmit: FormProps['onSubmit'] = (values: IEditCategoryForm) => {
        const { categoryDescription, categoryName } = values;
        const newNode: TreeItem = {
            ...editableNode,
            title: categoryName,
            subtitle: categoryDescription,
        };
        // updated node details
        const newTreeData = changeNodeAtPath({
            getNodeKey,
            newNode,
            path: editableNodePath,
            treeData,
        });
        setTreeData(newTreeData);
        showNotify('Category updated successfully', {
            showNotifyAction: true,
            placement: 'bottomLeft',
            theme: 'success',
            autoHideDuration: 3000,
        });
        // closing the slider
        setEditableNodeDetails(null);
    };

    return (
        <SliderModal show={showSlider} width={'100%'}>
            <Form
                subscription={{}}
                onSubmit={handleFormSubmit}
                initialValues={categoryFormInitialValues}
            >
                {({ handleSubmit }) => {
                    return (
                        <form onSubmit={handleSubmit} noValidate>
                            <SliderModalHeader>
                                <EditCategoryHeader />
                            </SliderModalHeader>
                            <SliderModalBody>
                                <div className={styles.bodyWrapper}>
                                    <Field
                                        name={'categoryName' as keyof IEditCategoryForm}
                                        validate={(value) =>
                                            EditCategorySliderService.validateField({
                                                fieldName: 'categoryName',
                                                path: editableNodePath,
                                                treeData,
                                                value,
                                            })
                                        }
                                    >
                                        {({ input, meta }) => {
                                            const { value, onChange } = input;
                                            const { error, dirty } = meta;
                                            const showError = !!error && dirty;
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
                                                    value={value}
                                                    required
                                                    autoFocus={showSlider}
                                                    theme={fieldTheme}
                                                    label={'Category Name'}
                                                    helperMessage={helperMessage}
                                                    selectTextOnFocus
                                                    onChange={onChange}
                                                />
                                            );
                                        }}
                                    </Field>
                                    <Field
                                        name={'categoryDescription' as keyof IEditCategoryForm}
                                        validate={(value) =>
                                            EditCategorySliderService.validateField({
                                                fieldName: 'categoryDescription',
                                                path: editableNodePath,
                                                treeData,
                                                value,
                                            })
                                        }
                                    >
                                        {({ input, meta }) => {
                                            const { value, onChange } = input;
                                            const { error, dirty } = meta;
                                            const showError = !!error && dirty;
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
                                                    value={value}
                                                    theme={fieldTheme}
                                                    multiline
                                                    rows={4}
                                                    maxRows={5}
                                                    label={'Category Description'}
                                                    helperMessage={helperMessage}
                                                    selectTextOnFocus
                                                    onChange={onChange}
                                                />
                                            );
                                        }}
                                    </Field>
                                </div>
                            </SliderModalBody>
                        </form>
                    );
                }}
            </Form>
        </SliderModal>
    );
};
