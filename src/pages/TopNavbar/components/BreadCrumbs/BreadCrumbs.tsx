import { cx } from '@emotion/css';
import React, { Fragment, ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { breadCrumbsSelector } from 'store/models/breadCrumb';
import { ICONS } from 'utilities/icons';
import { breadCrumbsStyles } from './breadcrumbs.styles';
const styles = breadCrumbsStyles();

export const BreadCrumbs = (): ReactElement => {
    const breadCrumbsState = useSelector(breadCrumbsSelector);
    const history = useHistory();
    useEffect(() => {
        console.log(breadCrumbsState);
    }, []);
    return (
        <div className={styles.breadCrumbsWrapper}>
            <div className={styles.breadCrumbsContainer}>
                {breadCrumbsState.breadCrumbs.map((breadCrumb, key) => {
                    return (
                        <Fragment key={key}>
                            {key !== 0 && (
                                <div className={styles.breadCrumbSeparator}>
                                    {<ICONS.FORWARD_SLASH />}
                                </div>
                            )}
                            <div
                                className={cx(styles.breadCrumb, {
                                    [styles.breadCrumbWithLink]: !!breadCrumb.route,
                                })}
                                title={breadCrumb.title}
                                onClick={
                                    breadCrumb.route
                                        ? () => history.push(breadCrumb.route)
                                        : undefined
                                }
                            >
                                {breadCrumb.icon !== undefined && (
                                    <div className={styles.iconHolder}>{<breadCrumb.icon />}</div>
                                )}
                                {breadCrumb.title !== undefined && (
                                    <div className={styles.titleHolder}>{breadCrumb.title}</div>
                                )}
                            </div>
                        </Fragment>
                    );
                })}
            </div>
        </div>
    );
};
