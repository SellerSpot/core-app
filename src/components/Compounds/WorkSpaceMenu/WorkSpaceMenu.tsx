import cn from 'classnames';
import Trademark from 'components/Atoms/Trademark/Trademark';
import React, { useState } from 'react';
import styles from './WorkSpaceMenu.module.scss';

export default function WorkSpaceMenu() {
    const [userHovering, setUserHovering] = useState(false);

    return (
        <div
            className={cn(styles.wrapper, { [styles.wrapperExpanded]: userHovering })}
            onMouseOver={() => setUserHovering(true)}
            onMouseLeave={() => setUserHovering(false)}
        >
            <div className={styles.storeInformationWrapper}></div>
            <div className={styles.workspacesWrapper}></div>
            <div
                className={cn(styles.trademarkWrapper, {
                    [styles.trademarkWrapperExpanded]: userHovering,
                })}
            >
                <Trademark />
            </div>
        </div>
    );
}
