import Icon from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import { EmptyStateIcon } from 'assets/icons/EmptyStateIcon/EmptyStateIcon';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import styles from './NoCategoryView.module.scss';

interface INoCategoryViewProps {
    createRootCategoryCallback: () => void;
}

export const NoCategoryView = (props: INoCategoryViewProps): ReactElement => {
    // props
    const { createRootCategoryCallback } = props;

    // draw
    return (
        <div className={styles.wrapper}>
            <EmptyStateIcon className={styles.icon} />
            <h4>No categories were found</h4>
            <Button
                onClick={createRootCategoryCallback}
                label="NEW CATEGORY"
                size="small"
                variant="contained"
                theme="primary"
                startIcon={<Icon icon={ICONS.outlineAdd} />}
            />
        </div>
    );
};
