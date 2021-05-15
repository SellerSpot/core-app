import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from 'components/Atoms/Loader/Loader';
import { appSelector, updateTenantDetails } from 'store/models/app';
import { TReactChildren } from 'typings/common.types';
import TenantProviderService from './TenantProvider.service';

interface ITenantProviderProps {
    children?: TReactChildren;
}

const TenantProvider = (props: ITenantProviderProps): ReactElement => {
    // props
    const { children } = props;

    // helpers
    const dispatch = useDispatch();

    // selectors
    const { tenantDetails } = useSelector(appSelector);

    // state
    const [hasValidTenantDetails, setHasValidTenantDetails] = useState(false);

    // handlers
    const fetchTenant = async () => {
        // fetch tenant details from server
        const currentTenantDetails = await TenantProviderService.getTenantDetails();
        if (currentTenantDetails) {
            dispatch(updateTenantDetails(currentTenantDetails));
        } else {
            // redirect to accounts app identifystore route
            TenantProviderService.redirectToAccountsAppIdentifyStoreRoute();
        }
    };

    // effects
    useEffect(() => {
        if (tenantDetails) {
            setHasValidTenantDetails(true);
        } else {
            setHasValidTenantDetails(false);
            fetchTenant();
        }
    }, [tenantDetails]);

    return (
        <Loader
            loaderType="spinner"
            isLoading={!hasValidTenantDetails}
            message={'Validating your store...'}
        >
            {children}
        </Loader>
    );
};

export default TenantProvider;
