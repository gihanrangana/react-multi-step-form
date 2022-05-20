import React, { useEffect } from 'react';
import { UiText } from '../../UiText/UiText';
import { UiView } from '../../UiView/UiView';

const FieldWrapper: React.FC<FieldWrapperProps> = (props) => {

    const { classes, form, name, required, label } = props;

    const [error, setError]: any = React.useState(false);

    useEffect(() => {

        if (!form) return;

        setError(form.getError(name));

    }, [form.errors, name]);

    const className = ['field__wrapper'];
    if (classes?.wrap) className.push(classes.wrap);

    return (
        <UiView className={className}>

            {label &&
                <UiText
                    tag="label"
                    htmlFor={props.name}
                    className={[
                        classes?.label ? classes.label : 'field__label',
                    ]}
                >
                    {label}{required && '*'}
                </UiText>
            }

            {props.children}

            {error &&
                <UiText
                    tag="span"
                    className={`${classes?.errorLabel ? classes?.errorLabel : 'field__wrapper--error-label'}`}
                >
                    {error}
                </UiText>
            }

        </UiView>
    )
}

interface FieldWrapperProps {
    children: any
    [key: string]: any
}

export { FieldWrapper };