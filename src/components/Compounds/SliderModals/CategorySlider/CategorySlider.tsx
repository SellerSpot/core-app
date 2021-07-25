import {
    ISliderModalProps,
    SliderModal,
    SliderModalLayoutWrapper,
} from '@sellerspot/universal-components';
import React, { ReactElement, useEffect } from 'react';
import { Form } from 'react-final-form';
import { rawClone } from 'utilities/general';
import { IModalBodyProps, ModalBody } from './Components/ModalBody/ModalBody';
import { IModalFooterProps, ModalFooter } from './Components/ModalFooter/ModalFooter';
import { IModalHeaderProps, ModalHeader } from './Components/ModalHeader/ModalHeader';
import { CategorySliderService } from './CategorySlider.service';
import styles from './CategorySlider.module.scss';
import { ICategorySliderForm, ICategorySliderProps } from './CategorySlider.types';
import { useState } from '@hookstate/core';
import { TreeItem } from 'react-sortable-tree';

export const CategorySlider = (props: ICategorySliderProps): ReactElement => {
    // props
    const {
        mode = 'create',
        level = 1,
        showModal,
        onClose,
        onSubmit,
        prefillData,
        contextData,
        formRef,
    } = props;
    const sliderModalWidth = '30%';

    // state
    const currentNodeSiblings = useState<string[]>([]);

    // special props
    const {
        sliderModalProps,
        closeButtonType,
        modalTitle,
        modalFooterPrimaryButtonIcon,
        modalFooterPrimaryButtonLabel,
        initialFormValues,
    } = CategorySliderService.getDynamicProps({
        level,
        mode,
        prefillData,
        width: sliderModalWidth,
    });

    // handlers
    const onSubmitHandler = async (values: ICategorySliderForm) => {
        await onSubmit({ values });
    };
    const onBackdropClickHandler: ISliderModalProps['onBackdropClick'] = (event) => {
        // props
        const formState = formRef.current?.getState();
        // callback
        onClose({
            dirty: formState?.dirty,
            submitting: formState?.submitting,
            source: 'backdrop',
            event,
        });
    };

    // used to find the siblings for the children of the current node (since new node is added as a child)
    const findSiblingsForCurrentNodeChildren = () => {
        // If current node is present, that means the (+) icon has been clicked on a node
        if (!!contextData.currentNode) {
            const currentNodeChildren = contextData.currentNode.children as TreeItem[];
            if (!!currentNodeChildren) {
                return currentNodeChildren.map((child) =>
                    (child.title as string).toLocaleLowerCase(),
                );
            } else {
                return [];
            }
        } else {
            // now we have to use to parent data (root node) as this operation is from the (+New Category) button
            // calling the other function as it already works using the parent node in contextData
            // to prevent rewriting the same logic
            return findSiblingsForCurrentNode();
        }
    };

    // used to find the siblings for the current node (since current node siblings are required for edit)
    const findSiblingsForCurrentNode = () => {
        const currentNodeParentChildren = contextData.parentNode?.children as TreeItem[];
        if (!!currentNodeParentChildren) {
            return currentNodeParentChildren.map((child) =>
                (child.title as string).toLocaleLowerCase(),
            );
        } else {
            return [];
        }
    };

    useEffect(() => {
        if (showModal) {
            if (mode === 'create') {
                currentNodeSiblings.set(findSiblingsForCurrentNodeChildren());
            } else {
                currentNodeSiblings.set(findSiblingsForCurrentNode());
            }
        } else {
            currentNodeSiblings.set([]);
        }
    }, [showModal]);

    // draw
    return (
        <SliderModal
            showModal={showModal}
            type={sliderModalProps.type}
            width={sliderModalProps.width}
            showBackdrop={sliderModalProps.showBackdrop}
            onBackdropClick={onBackdropClickHandler}
        >
            <Form
                onSubmit={onSubmitHandler}
                initialValues={rawClone(initialFormValues)}
                subscription={{
                    submitting: true,
                    dirty: true,
                }}
            >
                {({ handleSubmit, submitting, dirty, form }) => {
                    // form reference to access for outside
                    formRef.current = form;

                    // props
                    const modalHeaderProps: IModalHeaderProps = {
                        closeButtonType,
                        dirty,
                        modalTitle,
                        onClose,
                        submitting,
                    };
                    const modalBodyProps: IModalBodyProps = {
                        showModal,
                        submitting,
                        currentNodeSiblings: currentNodeSiblings.get(),
                    };
                    const modalFooterProps: IModalFooterProps = {
                        dirty,
                        onClose,
                        modalFooterPrimaryButtonIcon,
                        modalFooterPrimaryButtonLabel,
                        submitting,
                    };

                    return (
                        <form className={styles.form} onSubmit={handleSubmit} noValidate>
                            <SliderModalLayoutWrapper>
                                <ModalHeader {...modalHeaderProps} />
                                <ModalBody {...modalBodyProps} />
                                <ModalFooter {...modalFooterProps} />
                            </SliderModalLayoutWrapper>
                        </form>
                    );
                }}
            </Form>
        </SliderModal>
    );
};
