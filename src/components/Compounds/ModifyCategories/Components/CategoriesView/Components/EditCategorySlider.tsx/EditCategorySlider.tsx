import {
    Button,
    IInputFieldProps,
    InputField,
    showNotify,
    SliderModal,
} from '@sellerspot/universal-components';
import { useModifyCategoriesStore } from 'components/Compounds/ModifyCategories/ModifyCategories';
import React, { ReactElement } from 'react';
import { Field, Form, FormProps } from 'react-final-form';
import { addNodeUnderParent, changeNodeAtPath, TreeItem } from 'react-sortable-tree';
import { IEditCategoryForm } from './EditCategory.types';
import styles from './EditCategorySlider.module.scss';
import { EditCategorySliderService } from '../../../../services/EditCategorySlider.service';

const getNodeKey = ({ treeIndex }: { treeIndex: number }) => treeIndex;

const EditCategoryHeader = (props: { isAddMode: boolean; submitting: boolean }) => {
    const { isAddMode, submitting } = props;
    const { setEditableNodeDetails, setToBeAddedNodeDetails, setSelectedNode } =
        useModifyCategoriesStore();

    const handleSliderOnClose = () => {
        // resetting selected node since we lose track of the selected node parents
        setSelectedNode(null);
        if (isAddMode) {
            setToBeAddedNodeDetails(null);
        } else {
            setEditableNodeDetails(null);
        }
    };
    const sliderHeader = isAddMode ? 'Create Category' : 'Edit Category';
    let submitButtonLabel;
    if (isAddMode) {
        if (submitting) {
            submitButtonLabel = 'Creating Category...';
        } else {
            submitButtonLabel = 'Add Category';
        }
    } else {
        if (submitting) {
            submitButtonLabel = 'Saving Changes...';
        } else {
            submitButtonLabel = 'Save Changes';
        }
    }
    const submitButtonDisabled = submitting;
    return (
        <div className={styles.headerWrapper}>
            <h3>{sliderHeader}</h3>
            <div className={styles.actionButtons}>
                <Button
                    label={'Cancel'}
                    variant="outlined"
                    theme="danger"
                    onClick={handleSliderOnClose}
                />
                <Button
                    label={submitButtonLabel}
                    variant="contained"
                    theme="primary"
                    disabled={submitButtonDisabled}
                    type="submit"
                />
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
        toBeAddedNodeDetails,
        setToBeAddedNodeDetails,
        setSelectedNode,
    } = useModifyCategoriesStore();

    const showSlider = !!editableNodeDetails || !!toBeAddedNodeDetails;
    const isAddMode = !!toBeAddedNodeDetails;

    const currentNode = isAddMode ? toBeAddedNodeDetails?.node : editableNodeDetails?.node;
    const currentNodePath = isAddMode ? toBeAddedNodeDetails?.path : editableNodeDetails?.path;

    const categoryFormInitialValues: IEditCategoryForm = {
        categoryName: `${currentNode?.title}`,
        categoryDescription: `${currentNode?.subtitle ?? ''}`,
    };

    const handleFormSubmitAddMode: FormProps['onSubmit'] = async (values: IEditCategoryForm) => {
        const { categoryDescription, categoryName } = values;
        // pushed category to server
        const categoryId = await EditCategorySliderService.createNewCategory({
            category: { title: categoryName, subtitle: categoryDescription },
        });
        const newTreeData = addNodeUnderParent({
            treeData,
            parentKey: currentNodePath[currentNodePath.length - 2],
            expandParent: true,
            getNodeKey,
            newNode: {
                title: categoryName,
                subtitle: categoryDescription,
                id: categoryId,
            },
            addAsFirstChild: true,
        }).treeData;
        setTreeData(newTreeData);
        // closing the slider
        setToBeAddedNodeDetails(null);
    };

    const handleFormSubmitEditMode: FormProps['onSubmit'] = async (values: IEditCategoryForm) => {
        const { categoryDescription, categoryName } = values;
        const newNode: TreeItem = {
            ...currentNode,
            title: categoryName,
            subtitle: categoryDescription,
        };
        await EditCategorySliderService.updateCategory({ category: newNode });
        // updated node details
        const newTreeData = changeNodeAtPath({
            getNodeKey,
            newNode,
            path: currentNodePath,
            treeData,
        });
        setTreeData(newTreeData);
        showNotify('Category updated successfully', {
            showNotifyAction: true,
            placement: 'bottomLeft',
            theme: 'success',
            autoHideDuration: 3000,
        });
        // resetting selected node since we lose track of the selected node parents
        setSelectedNode(null);
        // closing the slider
        setEditableNodeDetails(null);
    };

    const formOnSubmit = isAddMode ? handleFormSubmitAddMode : handleFormSubmitEditMode;

    return (
        <Form
            subscription={{ submitting: true }}
            onSubmit={formOnSubmit}
            initialValues={categoryFormInitialValues}
        >
            {({ handleSubmit, submitting }) => {
                return (
                    <form onSubmit={handleSubmit} noValidate>
                        <SliderModal show={showSlider} type="absolute" width={'40%'}>
                            <EditCategoryHeader isAddMode={isAddMode} submitting={submitting} />
                            <div className={styles.bodyWrapper}>
                                <Field
                                    name={'categoryName' as keyof IEditCategoryForm}
                                    validate={(value) =>
                                        EditCategorySliderService.validateField({
                                            fieldName: 'categoryName',
                                            path: currentNodePath,
                                            treeData,
                                            value,
                                        })
                                    }
                                >
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
                                            path: currentNodePath,
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
                        </SliderModal>
                    </form>
                );
            }}
        </Form>
    );
};
