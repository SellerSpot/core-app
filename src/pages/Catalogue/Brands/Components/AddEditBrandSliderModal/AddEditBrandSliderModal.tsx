import Icon from '@iconify/react';
import { Button, SliderModal } from '@sellerspot/universal-components';
import { isNull } from 'lodash';
import React, { ReactElement, useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import { ICONS } from 'utilities/utilities';
import { useCatalogueBrandsPageState } from '../../CatalogueBrandsPage';
import styles from './AddEditBrandSliderModal.module.scss';
import {
    IAddEditBrandSliderModalForm,
    IAddEditBrandSliderModalHeaderProps,
} from './AddEditBrandSliderModal.types';

const SliderModalHeader = (props: IAddEditBrandSliderModalHeaderProps) => {
    // props
    const { headerMode } = props;
    let headerTitle = 'Add Brand';
    let primaryBtnTitle = 'ADD BRAND';

    // compute
    if (headerMode === 'edit') {
        headerTitle = 'Edit Brand';
        primaryBtnTitle = 'SAVE CHANGES';
    }

    return (
        <div className={styles.sliderModalHeaderWrapper}>
            <h3>{headerTitle}</h3>
            <div className={styles.actions}>
                {headerMode === 'edit' ? (
                    <Button label="DELETE BRAND" theme="danger" variant="outlined" />
                ) : null}
                <Button
                    label={primaryBtnTitle}
                    theme="primary"
                    variant="contained"
                    startIcon={<Icon icon={ICONS.outlineAdd} />}
                />
            </div>
        </div>
    );
};

export const AddEditBrandSliderModal = (): ReactElement => {
    // state
    const { showAddEditBrandSlider, brandIndexToEdit, brandsData, closeBrandSlider } =
        useCatalogueBrandsPageState();
    const [formInitialState, setFormInitialState] = useState<IAddEditBrandSliderModalForm>({
        name: '',
        description: '',
    });

    // effects
    useEffect(() => {
        if (!!brandIndexToEdit) {
            const brandDataToEdit = brandsData[brandIndexToEdit];
            setFormInitialState({
                name: brandDataToEdit['name'],
                description: brandDataToEdit['description'],
            });
        }
    }, [showAddEditBrandSlider, brandIndexToEdit]);

    // handlers
    const handleFormSubmit = () => {
        console.log('Submitted');
    };
    const handleSliderCloseActionButtonClick = () => {
        closeBrandSlider();
    };

    // compute
    const headerMode: IAddEditBrandSliderModalHeaderProps['headerMode'] = isNull(brandIndexToEdit)
        ? 'add'
        : 'edit';
    console.log(headerMode);

    return (
        <Form
            subscription={{ submitting: true }}
            onSubmit={handleFormSubmit}
            initialValues={formInitialState}
        >
            {({ handleSubmit }) => {
                return (
                    <form onSubmit={handleSubmit} noValidate>
                        <SliderModal
                            headerProps={{
                                showActionButton: 'backButton',
                                onActionButtonClick: handleSliderCloseActionButtonClick,
                            }}
                            show={showAddEditBrandSlider}
                            width={'40%'}
                        >
                            <SliderModalHeader headerMode={headerMode} />
                            <div></div>
                        </SliderModal>
                    </form>
                );
            }}
        </Form>
    );
};
