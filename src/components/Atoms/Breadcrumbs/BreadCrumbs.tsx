import cn from 'classnames';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { ICONS } from 'utilities/icons';
import styles from './BreadCrumbs.module.scss';
import { IBreadCrumbsProps } from './Breadcrumbs.types';

export const BreadCrumbs = (props: IBreadCrumbsProps): ReactElement => {
    const history = useHistory();
    return (
        <div className={styles.breadCrumbsWrapper}>
            <div className={styles.breadCrumbsContainer}>
                {props.crumbs.map((breadCrumb, key) => {
                    return (
                        <div className={cn(styles.breadCrumbNode)} key={key}>
                            {key !== 0 && (
                                <div className={styles.breadCrumbSeparator}>
                                    <ICONS.OTHER.FORWARD_SLASH />
                                </div>
                            )}
                            <div
                                className={cn(styles.breadCrumb, {
                                    [styles.breadCrumbWithLink]: !!breadCrumb.route,
                                })}
                                title={breadCrumb.title}
                                onClick={
                                    breadCrumb.route
                                        ? () => history.push(breadCrumb.route)
                                        : undefined
                                }
                            >
                                {/* {breadCrumb.icon !== undefined && (
                                    <div className={styles.iconHolder}>{<breadCrumb.icon />}</div>
                                )} */}
                                {breadCrumb.title !== undefined && (
                                    <div
                                        className={cn(styles.titleHolder, {
                                            [styles.currentBreadCrumbsNode]:
                                                key === props.crumbs.length - 1,
                                        })}
                                    >
                                        {breadCrumb.title}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
