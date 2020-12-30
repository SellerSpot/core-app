import React, { ReactElement } from 'react';
import promoImage from 'images/auth-promo.png';
import logoImage from 'images/logo.png';
import { SignIn } from 'pages/SignIn/SignIn';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from 'config/routes';
import { SignUp } from 'pages/SignUp/SignUp';
import { Forgot } from 'pages/Forgot/Forgot';
import { getAuthStyles } from './auth.styles';

export const Auth = (): ReactElement => {
    const styles = getAuthStyles();
    return (
        <div className={styles.authWrapper}>
            <div className={styles.promotionHolder}>
                {/* need to split this into new component */}
                <img className={styles.promotionImage} src={promoImage} alt="Promotion" />
                <div className={styles.logoHolder}>
                    <img className={styles.logoImage} src={logoImage} alt="logo" />
                    <div className={styles.logoTitle}>SellerSpot</div>
                </div>
            </div>
            <div className={styles.mainContentHolder}>
                <Switch>
                    <Route path={ROUTES.Auth_SIGN_IN}>
                        <SignIn />
                    </Route>
                    <Route path={ROUTES.Auth_SIGN_UP}>
                        <SignUp />
                    </Route>
                    <Route path={ROUTES.Auth_FORGOT}>
                        <Forgot />
                    </Route>
                    <Route>
                        <Redirect to={ROUTES.Auth_SIGN_IN} />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};
