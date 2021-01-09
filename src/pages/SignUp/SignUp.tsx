import React, { ReactElement, useEffect, useState } from 'react';
import { Loader } from 'components/Loader/Loader';
import { InputField } from 'components/InputField/InputField';
import { Button } from 'components/Button/Button';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'config/routes';
import { socketService } from 'services/services';
import { useDispatch } from 'react-redux';
import { authenticate, IAuthState } from 'store/models/auth';
import { cx } from '@emotion/css';
import { getSignUpStyles } from './signup.styles';
import { animationStyles } from 'styles/animation.styles';
import { updateGlobalServices } from 'config/globalConfig';
import { IAuthResposne } from 'typings/response.types';
import { updateSubDomain } from 'store/models/subDomain';

export const SignUp = (): ReactElement => {
    const styles = getSignUpStyles();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(false);
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
