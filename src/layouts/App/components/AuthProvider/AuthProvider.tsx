import { Loader } from 'components/Atoms/Loader/Loader';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appSelector, updateUserDetails } from 'store/models/app';
import { TReactChildren } from 'typings/common.types';
import AuthProviderService from './AuthProvider.service';

interface IAuthProviderProps {
    children?: TReactChildren;
}

const AuthProvider = (props: IAuthProviderProps): ReactElement => {
    // props
    const { children } = props;

    // helpers
    const dispatch = useDispatch();

    // selectors
    const { userDetails } = useSelector(appSelector);

    // state
    const [hasValidUserDetails, setHasValidUserDetails] = useState(false);

    // handlers
    const fetchUserDetails = async () => {
        // fetch tenant details from server
        const userDetails = await AuthProviderService.getUserDetails();
        if (userDetails) {
            dispatch(updateUserDetails(userDetails));
        } else {
            // redirect to accounts app identifystore route
            AuthProviderService.redirectToAccountsAppSignInRoute();
        }
    };

    // effects
    useEffect(() => {
        if (userDetails) {
            setHasValidUserDetails(true);
        } else {
            setHasValidUserDetails(false);
            fetchUserDetails();
        }
    }, [userDetails]);

    return (
        <Loader
            message={'Authenticating user...'}
            isLoading={!hasValidUserDetails}
            loaderType="spinner"
        >
            {children}
        </Loader>
    );
};

export default AuthProvider;
