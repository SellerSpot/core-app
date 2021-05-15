import { Loader } from 'components/Atoms/Loader/Loader';
import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { appSelector, updateUserDetails } from 'store/models/app';
import { TReactChildren } from 'typings/common.types';
import AuthProviderService from './AuthProvider.service';

interface IAuthProviderProps {
    children?: TReactChildren;
}

const AuthProvider = (props: IAuthProviderProps): ReactElement => {
    // props
    const { children } = props;

    // selectors
    const { userDetails } = useSelector(appSelector);

    // handlers
    const fetchUserDetails = async () => {
        // fetch tenant details from server
        const userDetails = await AuthProviderService.getUserDetails();
        debugger;
        if (userDetails) {
            updateUserDetails(userDetails);
        } else {
            // redirect to accounts app identifystore route
            AuthProviderService.redirectToAccountsAppSignInRoute();
        }
    };

    // effects
    useEffect(() => {
        // fetch and validate tenant details
        fetchUserDetails();
    }, []);

    return (
        <Loader isLoading={!!!userDetails} loaderType="spinner">
            {children}
        </Loader>
    );
};

export default AuthProvider;
