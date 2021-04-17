import cn from 'classnames';
import { Avatar } from '@sellerspot/universal-components';
import ExpandWorkspaceMenuButton from 'components/Atoms/ExpandWorkspaceMenuButton/ExpandWorkspaceMenuButton';
import Trademark from 'components/Atoms/Trademark/Trademark';
import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import animationStyles from '../../../styles/animation.module.scss';
import WorkSpaceTile from '../WorkSpaceTile/WorkSpaceTile';
import styles from './WorkSpaceMenu.module.scss';
import { IWorkSpaceMenuProps } from './WorkSpaceMenu.types';

export default function WorkSpaceMenu(props: IWorkSpaceMenuProps): ReactElement {
    const [expandMenu, setExpandMenu] = useState(false);
    const [hoverMenu, setHoverMenu] = useState(false);
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
        <div
            ref={menuRef}
            onMouseEnter={() => setHoverMenu(true)}
            onMouseLeave={() => setHoverMenu(false)}
            className={cn(styles.wrapper, { [styles.wrapperExpanded]: expandMenu })}
        >
            <div
                className={cn(
                    styles.expandIcon,
                    { [animationStyles.fadeIn]: hoverMenu && !expandMenu },
                    { [styles.expandIconFadeOut]: !hoverMenu && !expandMenu },
                    { [styles.expandIconRotate]: expandMenu },
                    { [styles.expandIconRotateReverse]: !expandMenu },
                )}
            >
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
                <div>
                    <Avatar
                        content={props.storeInformation.avatarContent}
                        theme={'selected'}
                        variant={'circular'}
                    />
                </div>
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
                            toolTipText={tile.title}
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
