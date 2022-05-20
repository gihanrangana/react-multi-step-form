import React from 'react';
import StepBody from './StepBody';
import StepHeader from './StepHeader';

import styles from './Step.module.scss';

const Steps: React.FC<StepsProps> = (props) => {

    const { steps, currentStep, activeStepName, activeStepIndex } = props;

    return (
        <div className={styles.stepWrapper}>
            <StepHeader {...props} />

            <StepBody {...props} />
        </div>
    )
}

interface StepsProps {
    [key: string]: any
}

export default Steps;