import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from 'components/Atoms/Loader/Loader';
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
        debugger;
        if (!!!userDetails) {
            fetchUserDetails();
        }
    }, [userDetails]);

    return (
        <Loader message="Authenticating user..." isLoading={!!!userDetails} loaderType="spinner">
            {children}
        </Loader>
    );
};

export default AuthProvider;
