import cn from 'classnames';
import Avatar from 'components/Atoms/Avatar/Avatar';
import ExpandWorkspaceMenuButton from 'components/Atoms/ExpandWorkspaceMenuButon/ExpandWorkspaceMenuButton';
import Trademark from 'components/Atoms/Trademark/Trademark';
import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import WorkSpaceTile from '../WorkSpaceTile/WorkSpaceTile';
import styles from './WorkSpaceMenu.module.scss';
import { IWorkSpaceMenuProps } from './WorkSpaceMenu.types';

export default function WorkSpaceMenu(props: IWorkSpaceMenuProps): ReactElement {
    const [expandMenu, setExpandMenu] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const menuRef = useRef(null);

    // handler for document onClickListener
    const onClickListener = useCallback(
        (e: MouseEvent) => {
            if (!menuRef.current.contains(e.target)) {
                setExpandMenu(false);
            }
        },
        [menuRef],
    );

    useEffect(() => {
        // Attach a click listener on the document.
        document.addEventListener('click', onClickListener);
        return () => {
            // Detach the click listener on the document.
            document.removeEventListener('click', onClickListener);
        };
    }, []);

    return (
        <div ref={menuRef} className={cn(styles.wrapper, { [styles.wrapperExpanded]: expandMenu })}>
            <div className={cn(styles.expandIcon, { [styles.expandIconVisible]: expandMenu })}>
                <ExpandWorkspaceMenuButton
                    onClick={() => {
                        setExpandMenu(!expandMenu);
                    }}
                />
            </div>
            <div
                className={styles.storeInformationWrapper}
                title={props.storeInformation?.storeName}
            >
                <Avatar
                    content={props.storeInformation.avatarContent}
                    theme={'selected'}
                    varient={'circular'}
                />
                <h6 className={cn(styles.storeName, { [styles.storeNameExpanded]: expandMenu })}>
                    {props.storeInformation.storeName}
                </h6>
            </div>
            <div className={styles.workspacesWrapper}>
                {props.tiles.map((tile, index) => {
                    // checking if the tile is selected
                    const isTileSelected = tile.routesToWatch?.includes(location.pathname);
                    return (
                        <WorkSpaceTile
                            key={index}
                            selected={isTileSelected}
                            expanded={expandMenu}
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
                    [styles.trademarkWrapperExpanded]: expandMenu,
                })}
            >
                <Trademark />
            </div>
        </div>
    );
}
