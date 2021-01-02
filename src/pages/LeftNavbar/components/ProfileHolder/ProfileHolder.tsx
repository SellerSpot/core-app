import React, { ReactElement, useEffect, useState } from 'react';
import { getProfileHolderStyles } from './profileholder.styles';
import { MenuItem, IMenuItemProps } from '../MenuHolder/MenuHolder';
import { cx } from '@emotion/css';
import { animationStyles } from 'styles/animation.styles';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'config/routes';
import { batch, useDispatch, useSelector } from 'react-redux';
import { authSelector, unAuthenticate } from 'store/models/auth';
import { ICONS } from 'utilities/icons';
import { clearSubDomain } from 'store/models/subDomain';
const styles = getProfileHolderStyles();

export const ProfileHolder = (): ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isProfileMenuActive, setIsProfileMenuActive] = useState(false);
    const authState = useSelector(authSelector);

    const profileMenuItems: IMenuItemProps[] = [
        {
            Icon: ICONS.SETTINGS,
            title: 'Settings',
            onClick: () => {
                history.push(ROUTES.SETTINGS);
            },
        },
        {
            Icon: ICONS.LOGOUT,
            title: 'Logout',
            onClick: () => {
                batch(() => {
                    dispatch(unAuthenticate());
                    dispatch(clearSubDomain());
                });
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
                            <ICONS.USER_ALT />
                        </div>
                    </div>
                    <div className={styles.profileUserDetailsHolder}>
                        <div className={styles.profileUserName}>{authState.name}</div>
                        <div className={styles.profileUserEmail}>{authState.email}</div>
                    </div>
                    <div className={styles.caretHolder}>
                        <ICONS.CARET_UP
                            className={cx(
                                {
                                    [animationStyles.compose.animate(
                                        'rotate0to180',
                                        'fadeIn',
                                    )]: isProfileMenuActive,
                                },
                                {
                                    [animationStyles.compose.animate(
                                        'rotate180to0',
                                        'fadeIn',
                                    )]: !isProfileMenuActive,
                                },
                                animationStyles.compose.duration(0.5),
                                { [styles.caretOnMenuOpen]: isProfileMenuActive },
                            )}
                        />
                    </div>
                </div>
                {isProfileMenuActive && (
                    <div
                        className={cx(
                            styles.profileMenuWrapper,
                            animationStyles.compose.animate('fadeIn'),
                            animationStyles.compose.duration(0.5),
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
