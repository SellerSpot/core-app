import { State, useState } from '@hookstate/core';
import { Skeleton } from '@sellerspot/universal-components';
import { Loader } from 'components/Atoms/Loader/Loader';
import React, { ReactElement, useEffect, useRef } from 'react';
import styles from '../../Categories.module.scss';
import { IUseCategoriesStore } from '../../Categories.types';
import { SortableTreeComponent } from './Components/SortableTreeComponent/SortableTreeComponent';

// const AddTopLevelCategory = (props: { pageState: State<IUseCategoriesStore> }) => {
//     // props
//     const { pageState } = props;

//     // state
//     const { toBeAddedNodeDetails } = useState(pageState);

//     // handlers
//     const onClickHandler = () => {
//         toBeAddedNodeDetails.set({
//             node: {
//                 title: 'New Category',
//             },
//             path: ['-1'],
//         });
//     };

//     // draw
//     return (
//         <div className={styles.addTopLevelCategoryWrapper}>
//             <Button
//                 label={'NEW CATEGORY'}
//                 theme="primary"
//                 startIcon={<Icon icon={ICONS.outlineAdd} />}
//                 variant="contained"
//                 onClick={onClickHandler}
//             />
//         </div>
//     );
// };

const LoadingSkeleton = () => {
    // draw
    return (
        <>
            {Array(4)
                .fill(0)
                .map((_, index) => {
                    return (
                        <div className={styles.loaderSkeleton} key={index}>
                            <Skeleton variant="circle" height={16} width={16} />
                            <div className={styles.skeletonNode}>
                                <Skeleton variant="rect" height={56} width={44} />
                                <Skeleton variant="rect" height={56} width={230} />
                            </div>
                        </div>
                    );
                })}
        </>
    );
};

export const CategoriesView = (props: { pageState: State<IUseCategoriesStore> }): ReactElement => {
    // props
    const { pageState } = props;

    // state
    const state = pageState;
    const categoriesViewHeight = useState<number>(100);
    const isLoading = useState(true);

    // hooks
    const categoriesViewWrapperRef = useRef<HTMLDivElement>(null);

    // compute
    // setting computed height for the tree component
    const categoriesViewStyle: React.CSSProperties = {
        height: `${categoriesViewHeight.get()}px`,
    };

    // effects
    useEffect(() => {
        categoriesViewHeight.set(categoriesViewWrapperRef.current?.clientHeight);
        isLoading.set(false);
    }, [categoriesViewWrapperRef]);

    // draw
    return (
        <div ref={categoriesViewWrapperRef} className={styles.categoriesViewWrapper}>
            <Loader
                isLoading={isLoading.get()}
                loaderType={'shimmer'}
                skeleton={<LoadingSkeleton />}
            >
                <div className={styles.categoriesView} style={categoriesViewStyle}>
                    <SortableTreeComponent pageState={state} />
                </div>
            </Loader>
        </div>
    );
};
