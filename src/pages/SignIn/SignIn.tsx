import React, { ReactElement, useEffect, useState } from 'react';
import { Loader } from 'components/Loader/Loader';
import { InputField } from 'components/InputField/InputField';
import { Button } from 'components/Button/Button';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'config/routes';
import { socketService } from 'services/services';
import { authenticate, IAuthState } from 'store/models/auth';
import { useDispatch } from 'react-redux';
import { updateGlobalServices } from 'config/globalConfig';
import { cx } from '@emotion/css';
import { getSignInStyles } from './signin.styles';
import { animationStyles } from 'styles/animation.styles';

export const SignIn = (): ReactElement => {
    const styles = getSignInStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        setIsLoading(false);
    }, []);
    const onSignInHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = {
                email,
                password,
            };
            const response = await socketService.request('AUTH_SIGN_IN', data);
            const tenantData: Pick<
                IAuthState,
                'id' | 'email' | 'name' | 'token'
            > = response.data as Pick<IAuthState, 'id' | 'email' | 'name' | 'token'>;
            dispatch(
                authenticate({
                    id: tenantData.id,
                    name: tenantData.name,
                    email: tenantData.email,
                    token: tenantData.token,
                }),
            );
            // updating the globals to know that the new token has arrived.
            updateGlobalServices(tenantData.token);
        } catch (error) {
            // error will have IResponse body = feel free to access with Iresponse type (damn it will get Iresponse type)
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
                                }}
                                tabIndex={5}
                                onClick={() => history.push(ROUTES.Auth_SIGN_UP)}
                            />
                        </div>
                    </div>
                    <div className={styles.signInContainer}>
                        <div className={styles.signInTitle}>Sign in to SellerSpot</div>
                        <form className={styles.formContainer} onSubmit={onSignInHandler}>
                            <div className={styles.inputGroup}>
                                <InputField
                                    label={'Email Address'}
                                    type={'email'}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    tabIndex={1}
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
                                        }}
                                        tabIndex={4}
                                        onClick={() => history.push(ROUTES.Auth_FORGOT)}
                                    />
                                </div>

                                <InputField
                                    label={'Password'}
                                    type={'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    tabIndex={2}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <Button label={'Sign In'} type={'submit'} tabIndex={3} />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
