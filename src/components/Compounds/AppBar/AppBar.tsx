import Avatar from 'components/Atoms/Avatar/Avatar';
import { BreadCrumbs } from 'components/Atoms/Breadcrumbs/BreadCrumbs';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/icons';
import WorkSpaceTile from '../WorkSpaceTile/WorkSpaceTile';
import styles from './AppBar.module.scss';

export default function AppBar(): ReactElement {
    return (
        <div className={styles.wrapper}>
            <div className={styles.lhsGroup}>
                <WorkSpaceTile
                    workspaceIcon={<ICONS.WORKSPACES.MANAGEMENT />}
                    workspaceTitle={'Management'}
                    expanded
                    varient={'workspaceIndicator'}
                    selected
                />
                <BreadCrumbs
                    crumbs={[
                        {
                            route: '/management',
                            title: 'Management',
                        },
                    ]}
                />
            </div>
            <div className={styles.rhsGroup}>
                <div>
                    <ICONS.OTHER.MORE_DETAILS size={'25px'} />
                </div>
                <Avatar content={'N'} varient={'circular'} theme={'selected'} />
            </div>
        </div>
    );
}
