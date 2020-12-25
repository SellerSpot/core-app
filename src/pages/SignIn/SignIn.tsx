import React, { ReactElement, useEffect, useState } from 'react';
import styles from './signin.module.css';
import animationStyles from '../../styles/animations.module.css';
import cn from 'classnames';
import { Loader } from 'components/Loader/Loader';
import { InputField } from 'components/InputField/InputField';
import { Button } from 'components/Button/Button';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'config/routes';
import { socketService } from 'services';

export const SignIn = (): ReactElement => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);
    const onSignInHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = {
                email,
                password,
            };
            const response = await socketService.request('AUTH_SIGN_IN', data);
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
                    className={cn(
                        styles.signInWrapper,
                        animationStyles.duration1s,
                        animationStyles.fadeInAnimation,
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
                                        onClick={() => history.push(ROUTES.Auth_FORGOT)}
                                    />
                                </div>

                                <InputField
                                    label={'Password'}
                                    type={'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <Button label={'Sign In'} type={'submit'} />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
