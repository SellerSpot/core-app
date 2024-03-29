import {
    Alert,
    Button,
    ExpandableCard,
    InputField,
    sanitize,
    TFormSubmitionHandler,
    TOnChangeMiddleware,
    TRANSITIONS,
} from '@sellerspot/universal-components';
import { CONFIG } from 'config/config';
import { FormApi, Mutator } from 'final-form';
import React, { ReactElement, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { appSelector } from 'store/models/app';
import DomainUpdateCardService from './DomainUpdate.service';
import styles from './DomainUpdateCard.module.scss';
import { IDomainUpdateCardFormValues } from './DomainUpdateCard.types';

export const StoreUrlField = (props: {
    form: FormApi<IDomainUpdateCardFormValues, Partial<IDomainUpdateCardFormValues>>;
    cardExpanded: boolean;
}): ReactElement => {
    // props
    const { form, cardExpanded } = props;

    // hooks
    const { domainName: domainName } = useSelector(appSelector).tenantDetails.domainDetails;

    return (
        <Field
            name="domainName"
            validate={async (value: string) =>
                await DomainUpdateCardService.storeUrlAvailabilityCheckHandler(value, domainName)
            }
            validateFields={[]}
        >
            {({
                input,
                meta: { dirtySinceLastSubmit, submitError, submitting, submitSucceeded },
                meta,
            }) => {
                if (dirtySinceLastSubmit && submitError) {
                    form.mutators.resetMutator('domainName' as keyof IDomainUpdateCardFormValues);
                }
                const { inputFieldTheme, helperMessage } =
                    DomainUpdateCardService.getStoreUrlFieldProps(input.value, meta);
                const onChangeMiddleWare: TOnChangeMiddleware = (e) => {
                    e.target.value = sanitize('onlyAllowAlphaNumeric', e.target.value);
                    input.onChange(e);
                };
                return (
                    <InputField
                        {...input}
                        onChange={onChangeMiddleWare}
                        label="Store Url"
                        type="text"
                        direction="rtl"
                        autoFocus={cardExpanded}
                        selectTextOnFocus={true}
                        suffix={`.${CONFIG.BASE_DOMAIN_NAME}`}
                        theme={inputFieldTheme}
                        size={'medium'}
                        required={true}
                        disabled={submitting || submitSucceeded}
                        helperMessage={helperMessage}
                        name={undefined} // to disable auto complete feature
                        disableAutoComplete={true}
                    />
                );
            }}
        </Field>
    );
};

export const DomainUpdateCard = (): ReactElement => {
    // hooks
    const { name: domain, domainName } = useSelector(appSelector).tenantDetails.domainDetails;

    const [cardExpanded, setCardExpanded] = useState(false);

    const submitionHandler = async (values: IDomainUpdateCardFormValues) => {
        return await DomainUpdateCardService.updateDomain(values.domainName);
    };

    const resetMutator = (
        arg: [keyof IDomainUpdateCardFormValues],
        state: {
            formState: { submitErrors: { [key in keyof IDomainUpdateCardFormValues]: string } };
        },
    ) => {
        const fieldName = arg[0];
        state.formState.submitErrors[fieldName] = undefined;
    };

    return (
        <ExpandableCard
            expanded={cardExpanded}
            className={{
                card: styles.card,
                detailsWrapper: styles.cardDetails,
            }}
            content={{
                summaryContent: (
                    <div className={styles.cardSummary}>
                        <div className={styles.cardLHSComponents}>
                            <h5>Your Current Domain</h5>
                            <h6 className={styles.domainAddress}>{domainName ?? ''}</h6>
                        </div>
                        <CSSTransition
                            in={!cardExpanded}
                            classNames={TRANSITIONS.fadeInOut}
                            unmountOnExit
                            timeout={300}
                        >
                            <div className={styles.cardRHSComponents}>
                                <Button
                                    variant="contained"
                                    onClick={() => setCardExpanded(true)}
                                    label={'Update'}
                                    theme="primary"
                                />
                            </div>
                        </CSSTransition>
                    </div>
                ),
                detailsContent: (
                    <Form
                        onSubmit={submitionHandler}
                        initialValues={{ domainName: domain }}
                        subscription={{
                            submitting: true,
                            submitSucceeded: true,
                            valid: true,
                            submitFailed: true,
                        }} // empty object overrides all subscriptions
                        mutators={{
                            resetMutator: resetMutator as Mutator<IDomainUpdateCardFormValues>,
                        }}
                    >
                        {({
                            handleSubmit,
                            submitting,
                            form,
                            submitSucceeded,
                            valid,
                            submitFailed,
                        }) => {
                            const validatedHandleSubmit: TFormSubmitionHandler = (e) => {
                                e.preventDefault();
                                if (!(submitting || submitSucceeded)) handleSubmit(e);
                            };
                            let submitButtonLabel = 'Update';
                            if (submitting) submitButtonLabel = 'Updating...';
                            return (
                                <form
                                    className={styles.cardDetailsComponents}
                                    onSubmit={validatedHandleSubmit}
                                    noValidate
                                >
                                    <StoreUrlField cardExpanded={cardExpanded} form={form} />
                                    <div className={styles.cardActions}>
                                        <Button
                                            size="medium"
                                            variant="contained"
                                            theme="primary"
                                            type="submit"
                                            disabled={!valid}
                                            label={submitButtonLabel}
                                            isLoading={
                                                submitting || (submitSucceeded && !submitFailed)
                                            }
                                        />
                                        <Button
                                            size="medium"
                                            variant="outlined"
                                            theme="danger"
                                            label={'Cancel'}
                                            disabled={submitting}
                                            onClick={() => setCardExpanded(false)}
                                        />
                                    </div>
                                    <Alert type={'warning'} title={'Warning'}>
                                        <div>
                                            <b>
                                                This is a destructive operation! All SEO related
                                                progress for the current domain will be lost
                                            </b>
                                            <br />
                                            (You may loose user traction to your e-commerce site if
                                            you update your current domain)
                                        </div>
                                    </Alert>
                                </form>
                            );
                        }}
                    </Form>
                ),
            }}
        />
    );
};
