import React, { ReactElement, useEffect, useState } from 'react';
import { Loader } from 'components/Loader/Loader';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'config/routes';
import { socketService } from 'services/services';
import { useDispatch } from 'react-redux';
import { authenticate } from 'store/models/auth';
import { cx } from '@emotion/css';
import styles from './signup.module.scss';
import { animationStyles } from 'styles/animation.styles';
import { updateGlobalServices } from 'config/globalConfig';
import { IAuthResposne, IErrorMessageResponse, IResponse } from 'typings/response.types';
import { updateSubDomain } from 'store/models/subDomain';
import { Button, InputField } from '@sellerspot/universal-components';
import { COLORS } from 'config/colors';
import { SectionTitle } from 'components/SectionTitle/SectionTitle';
import { showMessage } from 'utilities/notify';

export const SignUp = (): ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const initialErrorState = {
        email: {
            active: false,
            message: '',
        },
        userName: {
            active: false,
            message: '',
        },
        password: {
            active: false,
            message: '',
        },
    };
    const [errorState, setErrorState] = useState(initialErrorState);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const validateInput = (): boolean => {
        const validateErrorState: typeof initialErrorState = { ...initialErrorState };
        let isValid = true;
        // username validation
        if (!name || name.length < 3 || name.length > 15) {
            validateErrorState.userName.active = true;
            validateErrorState.userName.message =
                'Only AlphaNumeric Characters are allowed. Minimumm 3 and maximum 15 characters are allowed';

            isValid = false;
        }
        // password validation
        if (!password || password.length < 3 || password.length > 15) {
            validateErrorState.password.active = true;
            validateErrorState.password.message =
                'Use combinations of letter, number and special characters, White space is not allowed, minimum of 5 characters required';

            isValid = false;
        }

        setErrorState(validateErrorState);
        return !isValid;
    };

    const onSignUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isProcessing) return;
        if (validateInput()) return;
        setIsProcessing(true);
        try {
            const data = {
                name,
                email,
                password,
            };
            const response = await socketService.request('AUTH_SIGN_UP', data);
            const tenantData = response.data as IAuthResposne;
            // updating the globals to know that the new token has arrived.
            updateGlobalServices(tenantData.token);
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
            showMessage(
                'Welcome to Sellerspot! Create your free subdomain to install Apps',
                'success',
            );
        } catch (error) {
            // error will have IResponse body = feel free to access it with IResponse type
            const customError = error as IResponse;
            if (customError.status !== undefined && customError.data) {
                const customErrorData = error.data as IErrorMessageResponse[];
                if (customErrorData[0].name === 'alreadyFound') {
                    showMessage(customErrorData[0].message, 'danger');
                    setErrorState({
                        ...errorState,
                        email: {
                            active: true,
                            message: customErrorData[0].message,
                        },
                    });
                }
            } else {
                console.error(error);
                showMessage('Something went wrong check fields or try again later!', 'danger');
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
                        styles.signUpWrapper,
                        animationStyles.compose.animate('fadeIn'),
                        animationStyles.compose.duration(1),
                    )}
                >
                    <div className={styles.redirectActionHolder}>
                        <div>Already a member ?</div>
                        <div>
                            <Button
                                label={'Sign in'}
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
                                onClick={() => history.push(ROUTES.Auth_SIGN_IN)}
                            />
                        </div>
                    </div>
                    <div className={styles.signUpContainer}>
                        <SectionTitle
                            style={{ fontSize: 30, paddingLeft: 0 }}
                            title={'Sign up to SellerSpot'}
                        />
                        <form className={styles.formContainer} onSubmit={onSignUpHandler}>
                            <div className={styles.inputGroup}>
                                <InputField
                                    label={'Name'}
                                    type={'text'}
                                    value={name}
                                    onChange={(e) =>
                                        setName(
                                            e.target.value
                                                .replace(/[^a-zA-Z\d]+/g, '')
                                                .trimLeft()
                                                .trimRight(),
                                        )
                                    }
                                    helperText={
                                        'Only AlphaNumeric Characters are allowed. Minimumm 3 and maximum 15 characters are allowed'
                                    }
                                    required={true}
                                    error={{
                                        showError: errorState.userName.active,
                                        errorMessage: errorState.userName.message,
                                    }}
                                    style={{
                                        label: {
                                            fontSize: 18,
                                        },
                                        input: {
                                            fontSize: 16,
                                            padding: '0 10px',
                                        },
                                    }}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <InputField
                                    label={'Email Address'}
                                    type={'email'}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required={true}
                                    error={{
                                        showError: errorState.email.active,
                                        errorMessage: errorState.email.message,
                                    }}
                                    style={{
                                        label: {
                                            fontSize: 18,
                                        },
                                        input: {
                                            fontSize: 16,
                                            padding: '0 10px',
                                        },
                                    }}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <InputField
                                    label={'Password'}
                                    type={'password'}
                                    value={password}
                                    required={true}
                                    error={{
                                        showError: errorState.password.active,
                                        errorMessage: errorState.password.message,
                                    }}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[\s]+/g, '');
                                        setPassword(value);
                                    }}
                                    helperText={
                                        'Use combinations of letter, number and special characters, White space is not allowed, minimum of 5 characters required'
                                    }
                                    style={{
                                        label: {
                                            fontSize: 18,
                                        },
                                        input: {
                                            fontSize: 16,
                                            padding: '0 10px',
                                        },
                                    }}
                                />
                            </div>
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
                                    label={isProcessing ? 'Creating Account' : 'Create Account'}
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
