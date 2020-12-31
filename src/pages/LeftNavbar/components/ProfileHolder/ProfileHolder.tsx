import React, { ReactElement, useEffect, useState } from 'react';
import { getProfileHolderStyles } from './profileholder.styles';
import { FaUserAlt, FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { RiLogoutBoxFill, RiSettings3Fill } from 'react-icons/ri';
import { MenuItem, IMenuItemProps } from '../MenuHolder/MenuHolder';
import { cx } from '@emotion/css';
import { animationStyles } from 'styles/animation.styles';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'config/routes';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, unAuthenticate } from 'store/models/auth';
const styles = getProfileHolderStyles();

export const ProfileHolder = (): ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isProfileMenuActive, setIsProfileMenuActive] = useState(false);
    const authState = useSelector(authSelector);

    const profileMenuItems: IMenuItemProps[] = [
        {
            Icon: RiSettings3Fill,
            title: 'Settings',
            onClick: () => {
                history.push(ROUTES.SETTINGS);
            },
        },
        {
            Icon: RiLogoutBoxFill,
            title: 'Logout',
            onClick: () => {
                dispatch(unAuthenticate());
            },
        },
    ];

    // listener to close dropup on document click outside
    useEffect(() => {
        const menuOnClickOutsideHandler = () => {
            setIsProfileMenuActive(false);
        };
        if (isProfileMenuActive) {
            document.addEventListener('click', menuOnClickOutsideHandler);
        }
        return () => {
            document.removeEventListener('click', menuOnClickOutsideHandler);
        };
    }, [isProfileMenuActive]);

    return (
        <div className={styles.profileHolderWrapper}>
            <div className={styles.profileHolderContainer}>
                <div
                    className={cx(styles.profileContentWrapper, {
                        [styles.activeHoverGray]: isProfileMenuActive,
                    })}
                    onClick={() => setIsProfileMenuActive(!isProfileMenuActive)}
                >
                    <div className={styles.profileImageWrapper}>
                        <div className={styles.profileImageHolder}>
                            <FaUserAlt />
                        </div>
                    </div>
                    <div className={styles.profileUserDetailsHolder}>
                        <div className={styles.profileUserName}>{authState.name}</div>
                        <div className={styles.profileUserEmail}>{authState.email}</div>
                    </div>
                    <div className={styles.caretHolder}>
                        <FaCaretUp
                            className={cx(
                                { [animationStyles.names.rotate0to180]: isProfileMenuActive },
                                { [animationStyles.names.rotate180to0]: !isProfileMenuActive },
                                animationStyles.durations.pointFiveSecond,
                                { [styles.caretOnMenuOpen]: isProfileMenuActive },
                            )}
                        />
                    </div>
                </div>
                {isProfileMenuActive && (
                    <div
                        className={cx(
                            styles.profileMenuWrapper,
                            animationStyles.names.fadeIn,
                            animationStyles.durations.pointFiveSecond,
                        )}
                    >
                        {profileMenuItems.map((profileMenuItem, key) => (
                            <MenuItem
                                key={key}
                                {...profileMenuItem}
                                customClassNames={{
                                    menuItem: cx(styles.menuItem, styles.activeHoverGray),
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
