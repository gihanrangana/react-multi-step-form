import React, { useCallback } from 'react'
import { IoIosCheckmarkCircle, IoIosCheckmarkCircleOutline } from 'react-icons/io'

import styles from './Step.module.scss';

const StepHeader: React.FC<StepHeaderProps> = (props) => {

    const { steps, activeStepIndex, completedSteps, settings } = props;

    const renderItem = useCallback((step: any, index: number) => {

        const classes = [styles.stepHeaderItem];
        const isCompleted = completedSteps.includes(step.name);

        if (index === activeStepIndex) classes.push(styles.stepHeaderItemActive);

        return (
            <div className={classes.join(' ')} key={index}>

                {!isCompleted && <IoIosCheckmarkCircleOutline className={styles.icon} />}
                {isCompleted && <IoIosCheckmarkCircle className={styles.icon} />}

                <span>{step.title}</span>
            </div>
        )

    }, [activeStepIndex, completedSteps])

    return (
        <>
            <div className={styles.stepHeader} >
                {steps.map((step: any, i: number) => (
                    renderItem(step, i)
                ))}
            </div>
        </>
    )
}

interface StepHeaderProps {
    [key: string]: any;
}

export default StepHeader