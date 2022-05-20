import React, { useCallback, useEffect, useMemo } from 'react';
import * as _ from 'lodash';

const useSteps = (steps: any = [], initialStepName?: string) => {

    initialStepName = initialStepName || steps[0].name;

    let initialStep: any, initialStepIndex: any;

    steps.map((step: any, i: number) => {

        if (!initialStep && step.name === initialStepName) {
            initialStep = step;
            initialStepIndex = i;
        }

        return step;

    })

    if (!initialStep && steps[0]) {
        initialStep = steps[0];
        initialStepIndex = 0;
        initialStepName = initialStep.name;
    }

    const [currentStep, setCurrentStep] = React.useState(initialStep);
    const [activeStepName, setActiveStepName] = React.useState(initialStepName);
    const [activeStepIndex, setActiveStepIndex] = React.useState(initialStepIndex);
    const [stepDirection, setStepDirection] = React.useState('next');
    const [completedSteps, setCompletedSteps]: any = React.useState([]);
    const [formValues, setFormValues] = React.useState(null);

    const setActiveStep = useCallback((index: any) => {

        if (index >= steps.length || index < 0) return;

        let stepName = steps[index]?.name;

        steps.map((step: any, i: number) => {

            if (step.name === stepName) {

                setStepDirection(i > activeStepIndex ? 'next' : 'prev');

                setCurrentStep(step);
                setActiveStepName(step.name);
                setActiveStepIndex(i);
            }

            return step;
        })

    }, [currentStep, activeStepIndex])

    useEffect(() => {

        if (activeStepIndex > 0) {
            setCompletedSteps((prev: any) => [...prev, steps[activeStepIndex - 1].name]);
        }

    }, [activeStepIndex])

    return useMemo(() => (
        {
            steps,
            currentStep,
            activeStepName,
            activeStepIndex,
            stepDirection,
            completedSteps,
            formValues,
            setFormValues,
            setCompletedSteps,
            setActiveStep,
            stepHeaderRef: React.createRef(),
            stepBodyRef: React.createRef(),
            stepActiveHeaderRef: React.createRef(),
            stepActiveBodyRef: React.createRef(),
        }
    ), [currentStep, completedSteps, activeStepName, activeStepIndex, stepDirection, setActiveStep])
}

export default useSteps;