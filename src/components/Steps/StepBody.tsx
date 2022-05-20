import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import Form from '../Form/Form';

import styles from './Step.module.scss';

const StepBody: React.FC<StepBodyProps> = (props) => {

    const { currentStep, activeStepIndex, steps, setActiveStep, settings, setFormValues } = props;
    let form: any = null;

    if (settings.form) form = useForm({});

    const renderContent = () => {

        return (
            <React.Fragment>
                {currentStep?.render && currentStep.render({ ...props, form })}

                {
                    !currentStep?.render && currentStep?.component && (typeof currentStep?.component === 'object') &&
                    React.cloneElement(currentStep.component, { ...props, form })
                }

                {
                    !currentStep?.render && currentStep?.component && (typeof currentStep?.component === 'function') &&
                    currentStep.component({ ...props, form })
                }
            </React.Fragment>
        )
    }

    return (
        <div className={styles.stepBody}>

            {settings.form &&
                <Form
                    form={form}
                    onSubmit={(values) => {
                        setFormValues(((prev: any) => ({ ...prev, ...values })))
                        setActiveStep(activeStepIndex + 1)
                    }}
                >
                    {renderContent()}

                    {settings.form &&
                        <button onClick={form.triggerSubmit}>{settings.form.submitButtonLabel || "SUBMIT"}</button>
                    }

                </Form>
            }

            {!settings.form && renderContent()}

            {!(activeStepIndex <= 0) && settings.prevButton &&
                <button onClick={() => setActiveStep(activeStepIndex - 1)}>Previous</button>
            }

            {!(activeStepIndex >= steps.length - 1) && !settings.form &&
                <button onClick={() => setActiveStep(activeStepIndex + 1)}>Next</button>
            }

        </div >
    )
}

interface StepBodyProps {
    [key: string]: any
}

// const getFields = (step: any) => {

//     const fields = step.fields.map((field: any) => ({ [field.name]: field.value }))

//     const fieldsObj = fields.reduce((obj: any, crr: any) => ({ ...obj, ...crr }))

//     return fieldsObj;

// }

export default StepBody;