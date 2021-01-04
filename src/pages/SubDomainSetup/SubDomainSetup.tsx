import React, { ReactElement, useEffect, useState } from 'react';
import { Loader } from 'components/Loader/Loader';
import { InputField } from 'components/InputField/InputField';
import { Button } from 'components/Button/Button';
import { socketService } from 'services/services';
import { cx } from '@emotion/css';
import { getSubDomainSetupStyles } from './subdomainsetup.styles';
import { animationStyles } from 'styles/animation.styles';
import { useDispatch, useSelector } from 'react-redux';
import { subDomainSelector, updateSubDomain } from 'store/models/subDomain';
import { ISubDomainResponse } from 'typings/response.types';
import { useHistory } from 'react-router-dom';

export const SubDomainSetup = (): ReactElement => {
    const styles = getSubDomainSetupStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [domainName, setDomainName] = useState('');
    const subDomainState = useSelector(subDomainSelector);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const onCreateDomainHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = {
                domainName,
            };
            const availabilityCheck = await socketService.request(
                'SUB_DOMAIN_AVAILABILITY_CHECK',
                domainName,
            );
            const availabilityCheckData = availabilityCheck.data as { available: boolean };
            if (availabilityCheck.status && availabilityCheckData.available === true) {
                const subDomainCreateResponse = await socketService.request(
                    'SUB_DOMAIN_CREATE',
                    data,
                );
                if (subDomainCreateResponse.status) {
                    const subDomainCreateData = subDomainCreateResponse.data as ISubDomainResponse;
                    dispatch(
                        updateSubDomain({
                            domainName: subDomainCreateData.domainName,
                            id: subDomainCreateData._id,
                        }),
                    );
                    history.push(subDomainState.routePass);
                } else {
                    throw subDomainCreateResponse;
                }
            }
        } catch (error) {
            // error will have IResponse body = feel free to access it with IResponse type
            console.error(error);
        }
    };
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
                        <form className={styles.formContainer} onSubmit={onCreateDomainHandler}>
                            <div className={styles.inputGroup}>
                                <InputField
                                    label={'Domain Name'}
                                    type={'text'}
                                    value={domainName}
                                    onChange={(e) => setDomainName(e.target.value)}
                                    tabIndex={1}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                Your could change this later via domain settings in Dashboard. (Sub
                                Domains are allocated based on availability)
                            </div>
                            <div className={styles.inputGroup}>
                                <Button label={'Continue'} type={'submit'} tabIndex={4} />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
