import { State } from '@hookstate/core';
import {
    Button,
    IInputFieldProps,
    InputField,
    showNotify,
    SliderModal,
    SliderModalBody,
    SliderModalFooter,
    SliderModalHeader,
    SliderModalLayoutWrapper,
} from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { Field, Form, FormProps } from 'react-final-form';
import { addNodeUnderParent, changeNodeAtPath, TreeItem } from 'react-sortable-tree';
import { rawClone } from 'utilities/general';
import { IUseCategoriesStore } from '../../../../Categories.types';
import { EditCategorySliderService } from '../../../../services/EditCategorySlider.service';
import { IEditCategoryForm } from './EditCategory.types';
import styles from './EditCategorySlider.module.scss';

const getNodeKey = ({ treeIndex }: { treeIndex: number }) => treeIndex;

export const EditCategorySlider = (props: {
    componentState: State<IUseCategoriesStore>;
}): ReactElement => {
    // props
    const { componentState } = props;

    // state
    const { editableNodeDetails, treeData, toBeAddedNodeDetails, selectedNode } = componentState;
    const showSlider = !!editableNodeDetails.get() || !!toBeAddedNodeDetails.get();
    const isAddMode = !!toBeAddedNodeDetails.get();

    // compute
    const currentNode = isAddMode
        ? toBeAddedNodeDetails.get()?.node
        : editableNodeDetails.get()?.node;
    const currentNodePath = isAddMode
        ? toBeAddedNodeDetails.get()?.path
        : editableNodeDetails.get()?.path;
    const categoryFormInitialValues: IEditCategoryForm = {
        categoryName: `${currentNode?.title}`,
        categoryDescription: `${currentNode?.subtitle ?? ''}`,
    };

    // handlers
    const handleFormSubmitAddMode: FormProps['onSubmit'] = async (values: IEditCategoryForm) => {
        const { categoryDescription, categoryName } = values;
        // pushed category to server
        const categoryId = await EditCategorySliderService.createNewCategory({
            category: { title: categoryName, subtitle: categoryDescription },
        });
        const newTreeData = addNodeUnderParent({
            treeData: rawClone(treeData.get()),
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
        treeData.set(newTreeData);
        // closing the slider
        toBeAddedNodeDetails.set(null);
    };
    const handleFormSubmitEditMode: FormProps['onSubmit'] = async (values: IEditCategoryForm) => {
        const { categoryDescription, categoryName } = values;
        const newNode: TreeItem = {
            ...rawClone(currentNode),
            title: categoryName,
            subtitle: categoryDescription,
        };
        await EditCategorySliderService.updateCategory({ category: newNode });
        // updated node details
        const newTreeData = changeNodeAtPath({
            getNodeKey,
            newNode,
            path: currentNodePath,
            treeData: rawClone(treeData.get()),
        });
        treeData.set(newTreeData);
        showNotify('Category updated successfully', {
            showNotifyAction: true,
            placement: 'bottomLeft',
            theme: 'success',
            autoHideDuration: 3000,
        });
        // resetting selected node since we lose track of the selected node parents
        selectedNode.set(null);
        // closing the slider
        editableNodeDetails.set(null);
    };
    const formOnSubmit = isAddMode ? handleFormSubmitAddMode : handleFormSubmitEditMode;

    // draw
    return (
        <SliderModal showModal={showSlider} type="fixed" width={'40%'}>
            <SliderModalLayoutWrapper>
                <SliderModalHeader title={isAddMode ? 'Create Category' : 'Edit Category'} />
                <SliderModalBody>
                    <Form
                        subscription={{ submitting: true }}
                        onSubmit={formOnSubmit}
                        initialValues={categoryFormInitialValues}
                    >
                        {({ handleSubmit }) => {
                            return (
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className={styles.bodyWrapper}>
                                        <Field
                                            name={'categoryName' as keyof IEditCategoryForm}
                                            validate={(value) =>
                                                EditCategorySliderService.validateField({
                                                    fieldName: 'categoryName',
                                                    path: currentNodePath,
                                                    treeData: treeData.get(),
                                                    value,
                                                })
                                            }
                                        >
                                            {({ input, meta }) => {
                                                const { value, onChange } = input;
                                                const { error, visited } = meta;

                                                const showError = !!error && visited;
                                                const helperMessage: IInputFieldProps['helperMessage'] =
                                                    {
                                                        enabled: showError,
                                                        content: error,
                                                        type: 'error',
                                                    };
                                                const fieldTheme: IInputFieldProps['theme'] =
                                                    showError ? 'danger' : 'primary';
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
                                                    treeData: treeData.get(),
                                                    value,
                                                })
                                            }
                                        >
                                            {({ input, meta }) => {
                                                const { value, onChange } = input;
                                                const { error, dirty } = meta;
                                                const showError = !!error && dirty;
                                                const helperMessage: IInputFieldProps['helperMessage'] =
                                                    {
                                                        enabled: showError,
                                                        content: error,
                                                        type: 'error',
                                                    };
                                                const fieldTheme: IInputFieldProps['theme'] =
                                                    showError ? 'danger' : 'primary';
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
                                </form>
                            );
                        }}
                    </Form>
                </SliderModalBody>
                <SliderModalFooter>
                    <Button label={'Cancel'} variant="outlined" theme="danger" />
                    <Button label={'Submit'} variant="contained" theme="primary" type="submit" />
                </SliderModalFooter>
            </SliderModalLayoutWrapper>
        </SliderModal>
    );
};
