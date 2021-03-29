import cn from 'classnames';
import Trademark from 'components/Atoms/Trademark/Trademark';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import WorkspaceTile from '../WorkspaceTile/WorkspaceTile';
import styles from './WorkSpaceMenu.module.scss';
import { IWorkSpaceMenuProps } from './WorkSpaceMenu.types';

export default function WorkSpaceMenu(props: IWorkSpaceMenuProps) {
    const [userHovering, setUserHovering] = useState(false);
    const location = useLocation();
    const history = useHistory();
    console.log(location.pathname);

    return (
        <div
            className={cn(styles.wrapper, { [styles.wrapperExpanded]: userHovering })}
            onMouseOver={() => setUserHovering(true)}
            onMouseLeave={() => setUserHovering(false)}
        >
            <div className={styles.storeInformationWrapper}></div>
            <div className={styles.workspacesWrapper}>
                {props.tiles.map((tile, index) => {
                    // checking if the tile is selected
                    const isTileSelected = tile.routesToWatch?.includes(location.pathname);
                    return (
                        <WorkspaceTile
                            key={index}
                            selected={isTileSelected}
                            expanded={userHovering}
                            workspaceTitle={tile.title}
                            workspaceIcon={tile.icon}
                            events={{
                                onClick: () => {
                                    // redirecting page
                                    history.push(tile.redirectRoute);
                                },
                            }}
                        />
                    );
                })}
            </div>
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
