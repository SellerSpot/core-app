import React, { ReactElement, useEffect, useState } from 'react';
import { Loader } from 'components/Loader/Loader';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'config/routes';
import { socketService } from 'services/services';
import { authenticate } from 'store/models/auth';
import { updateSubDomain } from 'store/models/subDomain';
import { batch, useDispatch } from 'react-redux';
import { updateGlobalServices } from 'config/globalConfig';
import { cx } from '@emotion/css';
import { getSignInStyles } from './signin.styles';
import { animationStyles } from 'styles/animation.styles';
import { IAuthResposne, IErrorMessageResponse, IResponse } from 'typings/response.types';
import { updateInstalledAppsState } from 'store/models/installedApps';
import { Button, InputField } from '@sellerspot/universal-components';
import { COLORS } from 'config/colors';
import { SectionTitle } from 'components/SectionTitle/SectionTitle';
import { Space } from 'components/Space/Space';
import { showMessage } from 'utilities/notify';

export const SignIn = (): ReactElement => {
    const styles = getSignInStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    useEffect(() => {
        setIsLoading(false);
    }, []);
    const onSignInHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isProcessing) return;
        setIsProcessing(true);
        try {
            const data = {
                email,
                password,
            };
            const response = await socketService.request('AUTH_SIGN_IN', data);
            const tenantData = response.data as IAuthResposne;
            // updating the globals to know that the new token has arrived.
            updateGlobalServices(tenantData.token);
            batch(() => {
                dispatch(
                    authenticate({
                        id: tenantData.id,
                        name: tenantData.name,
                        email: tenantData.email,
                        token: tenantData.token,
                    }),
                );
                if (tenantData.subDomain.baseDomain) {
                    dispatch(
                        updateSubDomain({
                            domainName: tenantData.subDomain.domainName,
                            id: tenantData.subDomain._id,
                            baseDomain: tenantData.subDomain.baseDomain,
                        }),
                    );
                }
                if (tenantData.apps.length) {
                    dispatch(
                        updateInstalledAppsState({
                            apps: tenantData.apps,
                        }),
                    );
                }
            });
        } catch (error) {
            const customError = error as IResponse;
            if (customError.status !== undefined && customError.data) {
                const customErrorData = error.data as IErrorMessageResponse[];
                if (customErrorData[0].name === 'notFound') {
                    showMessage(customErrorData[0].message, 'danger');
                    batch(() => {
                        setIsError(true);
                        setErrorMessage(customErrorData[0].message);
                    });
                }
            } else {
                console.error(error);
                showMessage('Email or password is incorrect!', 'danger');
            }
            setIsProcessing(false);
        }
    };
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div
                    className={cx(
                        styles.signInWrapper,
                        animationStyles.compose.animate('fadeIn'),
                        animationStyles.compose.duration(1),
                    )}
                >
                    <div className={styles.redirectActionHolder}>
                        <div>Not a member ?</div>
                        <div>
                            <Button
                                label={'Sign up now'}
                                type={'button'}
                                style={{
                                    backgroundColor: 'transparent',
                                    color: 'blue',
                                    fontWeight: 'normal',
                                    padding: 0,
                                    width: 'auto',
                                    marginLeft: 8,
                                    border: 'none',
                                    fontSize: 18,
                                }}
                                onClick={() => history.push(ROUTES.Auth_SIGN_UP)}
                            />
                        </div>
                    </div>
                    <div className={styles.signInContainer}>
                        <SectionTitle style={{ fontSize: 30 }} title={'Sigin in to SellerSpot'} />
                        <form className={styles.formContainer} onSubmit={onSignInHandler}>
                            <div className={styles.inputGroup}>
                                <InputField
                                    label={'Email Address'}
                                    type={'email'}
                                    style={{
                                        label: {
                                            fontSize: 18,
                                        },
                                        input: {
                                            fontSize: 18,
                                            padding: '0 10px',
                                        },
                                    }}
                                    required={true}
                                    error={{
                                        showError: isError,
                                        errorMessage: errorMessage,
                                    }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <div className={styles.forgotPasswordHolder}>
                                    <Button
                                        label={'Forgot Password?'}
                                        type={'button'}
                                        style={{
                                            backgroundColor: 'transparent',
                                            color: 'blue',
                                            fontWeight: 'normal',
                                            padding: '0px',
                                            width: 'auto',
                                            height: 'auto',
                                            marginTop: 3,
                                            border: 'none',
                                        }}
                                        onClick={() => history.push(ROUTES.Auth_FORGOT)}
                                    />
                                </div>

                                <InputField
                                    label={'Password'}
                                    type={'password'}
                                    value={password}
                                    required={true}
                                    style={{
                                        label: {
                                            fontSize: 18,
                                        },
                                        input: {
                                            fontSize: 18,
                                            padding: '0 10px',
                                        },
                                    }}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Space size={20} />
                            <div className={styles.inputGroup}>
                                <Button
                                    style={{
                                        background: COLORS.FOREGROUND_PRIMARY,
                                        color: COLORS.FOREGROUND_WHITE,
                                        fontSize: 18,
                                        height: 50,
                                        fontWeight: 'bold',
                                        opacity: isProcessing ? 0.5 : 1,
                                    }}
                                    status={isProcessing ? 'disabledLoading' : 'default'}
                                    label={isProcessing ? 'Signing In' : 'Sign In'}
                                    type={'submit'}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
