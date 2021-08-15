import Icon from '@iconify/react';
import { CategoryView } from 'components/Compounds/CategoryView/CategoryView';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import { IInputFieldProps, InputField, SliderModalBody } from '@sellerspot/universal-components';
import { ISelectCategorySliderModalProps } from '../../SelectCategorySliderModal.types';
import styles from './ModalBody.module.scss';

type IModalBodyProps = Pick<ISelectCategorySliderModalProps, 'categoryViewProps' | 'onSearch'>;

type ISearchFieldProps = Pick<ISelectCategorySliderModalProps, 'onSearch'>;

const SearchField = (props: ISearchFieldProps) => {
    // props
    const { onSearch } = props;

    // handlers
    const onChangeHandler: IInputFieldProps['onChange'] = (event) => {
        onSearch(event.target.value);
    };

    // draw
    return (
        <InputField
            fullWidth
            label="Search"
            theme="primary"
            autoFocus
            prefix={<Icon icon={ICONS.outlineSearch} />}
            placeHolder="Search for categories"
            onChange={onChangeHandler}
        />
    );
};

export const ModalBody = (props: IModalBodyProps): ReactElement => {
    // props
    const { categoryViewProps, onSearch } = props;

    // draw
    return (
        <SliderModalBody>
            <div className={styles.wrapper}>
                <SearchField onSearch={onSearch} />
                <CategoryView {...categoryViewProps} />
            </div>
        </SliderModalBody>
    );
};
