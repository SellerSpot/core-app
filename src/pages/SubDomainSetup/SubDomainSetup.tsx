import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { Loader } from 'components/Loader/Loader';
import { css, cx } from '@emotion/css';
import { getSubDomainSetupStyles } from './subdomainsetup.styles';
import { animationStyles } from 'styles/animation.styles';
import { batch, useSelector } from 'react-redux';
import { subDomainSelector } from 'store/models/subDomain';
import { AlertMessage, Button, InputField } from '@sellerspot/universal-components';
import { COLORS } from 'config/colors';
import {
    checkDomainAvailability,
    createTenantSubDomain,
    updateTenantSubDomain,
} from './subDomainSetup.actions';
import { ROUTES } from 'config/routes';
import { useHistory, useLocation } from 'react-router-dom';

export const SubDomainSetup = (): ReactElement => {
    const styles = getSubDomainSetupStyles();
    const history = useHistory();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const [isLoading, setIsLoading] = useState(true);
    const subDomainState = useSelector(subDomainSelector);
    const [isStartedSearching, setIsStartedSearching] = useState(false);
    const [isDomainAvailable, setIsDomainAvailable] = useState(false);
    const [inputDomain, setInputDomain] = useState('');

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const onCreateDomainHandler = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (isDomainAvailable && inputDomain) {
                const isRegistered = subDomainState.registered;
                const isDomainUpdated = subDomainState.registered
                    ? await updateTenantSubDomain(inputDomain)
                    : await createTenantSubDomain(inputDomain);
                if (isDomainUpdated) {
                    /**
                     * show notification
                     * reset input field
                     * if from auth redirect to home
                     */
                    const returnPath = query.get('return');
                    if (returnPath) {
                        // validate somehow before pusing
                        history.push(returnPath);
                    } else {
                        batch(() => {
                            setIsDomainAvailable(false);
                            setIsStartedSearching(false);
                            setInputDomain('');
                            setIsLoading(false);
                        });

                        if (!isRegistered) history.push(ROUTES.DASHBOARD);
                    }
                }
            } else {
                // show tooltip error to fill domain
            }
        },
        [
            isDomainAvailable,
            updateTenantSubDomain,
            inputDomain,
            setIsStartedSearching,
            setIsDomainAvailable,
            setIsLoading,
        ],
    );

    const handlOnChange = useCallback(
        async (domainName: string) => {
            const sanitizedDomainName = domainName
                .replace(/[^a-zA-Z]+/g, '')
                .trim()
                .toLowerCase(); // allows only alphabets
            setInputDomain(sanitizedDomainName);
            if (!(sanitizedDomainName.length >= 3 && sanitizedDomainName.length <= 15)) {
                batch(() => {
                    setIsStartedSearching(true);
                    setIsDomainAvailable(false);
                });
                return;
            }
            if (!sanitizedDomainName) {
                setIsStartedSearching(false);
                return;
            }
            if (!isStartedSearching) setIsStartedSearching(true);
            if (await checkDomainAvailability(sanitizedDomainName)) {
                setIsDomainAvailable(true);
            } else {
                setIsDomainAvailable(false);
            }
        },
        [isStartedSearching, setIsStartedSearching, setInputDomain, setIsDomainAvailable],
    );

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div
                    className={cx(
                        styles.subDomainSetupWrapper,
                        animationStyles.compose.animate('fadeIn'),
                        animationStyles.compose.duration(1),
                    )}
                >
                    <div className={styles.subDomainSetupContainer}>
                        <div className={styles.subDomainSetupTitle}>Choose Your Domain</div>
                        <div className={styles.inputGroup}>
                            Note: All the applications will be hosted under this domain. (Custom
                            domain feature is under construction)
                        </div>
                        {subDomainState.registered && (
                            <div className={styles.inputGroup} style={{ paddingBottom: 0 }}>
                                <InputField
                                    size={'default'}
                                    label={'Your Current Domain is'}
                                    style={{
                                        lableStyle: {
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                        },
                                        inputStyle: {
                                            fontSize: 20,
                                            textAlign: 'left',
                                            letterSpacing: 4,
                                            paddingLeft: 10,
                                        },
                                    }}
                                    disabled={true}
                                    value={`${subDomainState.domainName}.${subDomainState.baseDomain}`}
                                />
                            </div>
                        )}
                        <form className={styles.formContainer} onSubmit={onCreateDomainHandler}>
                            <div className={styles.inputGroup}>
                                <InputField
                                    size={'default'}
                                    label={
                                        subDomainState.registered
                                            ? 'Update Domain'
                                            : 'Choose Domain'
                                    }
                                    style={{
                                        lableStyle: {
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                        },
                                        inputStyle: {
                                            fontSize: 20,
                                            textAlign: 'right',
                                            letterSpacing: 4,
                                            paddingRight: 10,
                                        },
                                        suffixStyle: {
                                            width: 450,
                                            textAlign: 'left',
                                            justifyContent: 'flex-start',
                                            fontSize: 20,
                                            letterSpacing: 4,
                                            paddingLeft: 10,
                                            fontWeight: 'bold',
                                        },
                                    }}
                                    suffix={<div>.{subDomainState.baseDomain}</div>}
                                    error={{
                                        showError: isStartedSearching && !isDomainAvailable,
                                        errorMessage:
                                            'Not Available - (minimum 3 and maximum 10 characters) (only alphabets are allowed)',
                                    }}
                                    className={{
                                        helperLabel: css`
                                            color: ${isStartedSearching && isDomainAvailable
                                                ? 'green !important'
                                                : ''};
                                        `,
                                    }}
                                    onChange={(e) => {
                                        handlOnChange(e.target.value);
                                    }}
                                    helperText={
                                        isStartedSearching && isDomainAvailable
                                            ? 'Domain Available, Submit to Continue. - (minimum 3 and maximum 10 characters) (only alphabets are allowed)'
                                            : 'Search for Domain Availability - (minimum 3 and maximum 10 characters) (only alphabets are allowed)'
                                    }
                                    value={inputDomain}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                You could change this domain anytime via domain settings menu in
                                Dashboard. (Sub Domains are allocated based on availability)
                            </div>
                            <div className={styles.inputGroup}>
                                <AlertMessage
                                    style={{
                                        labelWrapperStyle: {
                                            paddingTop: 10,
                                            paddingBottom: 10,
                                        },
                                    }}
                                    type={'warning'}
                                    label={
                                        'This is a destructive operation!, All SEO done for the current subdomain will be invalid.(you may loose user traction to your ecommerce site incase the ecommerce app is installed)'
                                    }
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <Button
                                    label={
                                        subDomainState.registered
                                            ? 'Update Domain'
                                            : 'Create Domain'
                                    }
                                    type={'submit'}
                                    status={isDomainAvailable ? 'default' : 'disabled'}
                                    style={{
                                        color: COLORS.FOREGROUND_WHITE,
                                        backgroundColor: COLORS.FOREGROUND_PRIMARY,
                                        width: '50%',
                                        fontWeight: 'bold',
                                        opacity: isDomainAvailable ? 1 : 0.5,
                                    }}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
