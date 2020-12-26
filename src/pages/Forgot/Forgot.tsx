import React, { ReactElement, useEffect, useState } from 'react';
import styles from './forgot.module.css';
import animationStyles from '../../styles/animations.module.css';
import cn from 'classnames';
import { Loader } from 'components/Loader/Loader';
import { InputField } from 'components/InputField/InputField';
import { Button } from 'components/Button/Button';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'config/routes';

export const Forgot = (): ReactElement => {
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
                        styles.forgotWrapper,
                        animationStyles.duration1s,
                        animationStyles.animateFadeIn,
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
                    <div className={styles.forgotContainer}>
                        <div className={styles.forgotTitle}>Forgot Password?</div>
                        <div className={styles.forgotInstructions}>
                            Enter the email address you used when you joined and we’ll send you
                            instructions to reset your password. <br />
                            <br />
                            For security reasons, we do NOT store your password. So rest assured
                            that we will never send your password via email.
                        </div>
                        <form className={styles.formContainer}>
                            <div className={styles.inputGroup}>
                                <InputField label={'Email Address'} type={'email'} />
                            </div>
                            <div className={styles.inputGroup}>
                                <Button label={'Send Reset Instructions'} type={'submit'} />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
