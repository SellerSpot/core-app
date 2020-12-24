import React, { ReactElement, useEffect, useState } from 'react';
import styles from './signup.module.css';
import animationStyles from '../../styles/animations.module.css';
import cn from 'classnames';
import { Loader } from 'components/Loader/Loader';
import { InputField } from 'components/InputField/InputField';
import { Button } from 'components/Button/Button';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'config/routes';

export const SignUp = (): ReactElement => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div
                    className={cn(
                        styles.signUpWrapper,
                        animationStyles.duration1s,
                        animationStyles.fadeInAnimation,
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
                                onClick={() => history.push(ROUTES.Auth_SIGN_IN)}
                            />
                        </div>
                    </div>
                    <div className={styles.signUpContainer}>
                        <div className={styles.signUpTitle}>Sign up to SellerSpot</div>
                        <form className={styles.formContainer}>
                            <div className={styles.inputGroup}>
                                <InputField label={'Name'} type={'text'} />
                            </div>
                            <div className={styles.inputGroup}>
                                <InputField label={'Email Address'} type={'email'} />
                            </div>
                            <div className={styles.inputGroup}>
                                <InputField label={'Password'} type={'password'} />
                            </div>
                            <div className={styles.inputGroup}>
                                <Button label={'Create Account'} type={'submit'} />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
