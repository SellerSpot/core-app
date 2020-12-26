import React, { ReactElement, useEffect, useState } from 'react';
import styles from './signup.module.css';
import animationStyles from '../../styles/animations.module.css';
import cn from 'classnames';
import { Loader } from 'components/Loader/Loader';
import { InputField } from 'components/InputField/InputField';
import { Button } from 'components/Button/Button';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'config/routes';
import { socketService } from 'services';
import { useDispatch } from 'react-redux';
import { authenticate, IAuthState } from 'store/models/auth';

export const SignUp = (): ReactElement => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);
    const onSignUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = {
                name,
                email,
                password,
            };
            const response = await socketService.request('AUTH_SIGN_UP', data);
            const tenantData: Pick<
                IAuthState,
                'id' | 'email' | 'name' | 'token'
            > = response.data as Pick<IAuthState, 'id' | 'email' | 'name' | 'token'>;
            dispatch(
                authenticate({
                    email: tenantData.email,
                    id: tenantData.id,
                    name: tenantData.email,
                    token: tenantData.token,
                }),
            );
        } catch (error) {
            // error will have IResponse body = feel free to access it with IResponse type
        }
    };
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div
                    className={cn(
                        styles.signUpWrapper,
                        animationStyles.duration1s,
                        animationStyles.animateFadeIn,
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
                                }}
                                tabIndex={5}
                                onClick={() => history.push(ROUTES.Auth_SIGN_IN)}
                            />
                        </div>
                    </div>
                    <div className={styles.signUpContainer}>
                        <div className={styles.signUpTitle}>Sign up to SellerSpot</div>
                        <form className={styles.formContainer} onSubmit={onSignUpHandler}>
                            <div className={styles.inputGroup}>
                                <InputField
                                    label={'Name'}
                                    type={'text'}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    tabIndex={1}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <InputField
                                    label={'Email Address'}
                                    type={'email'}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    tabIndex={2}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <InputField
                                    label={'Password'}
                                    type={'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    tabIndex={3}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <Button label={'Create Account'} type={'submit'} tabIndex={4} />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
