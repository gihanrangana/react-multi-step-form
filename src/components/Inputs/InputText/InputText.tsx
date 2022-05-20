import React, { forwardRef } from 'react';
import { isArray } from 'lodash';

const InputText: React.FC<InputTextProps> = forwardRef((props, ref) => {

    const { classes, form, name, isFocused, setIsFocused, ...rest } = props;

    if (form) form.addField(name, props)

    rest.ref = ref;

    rest.className = classes?.input ? ["field__input", classes?.input] : ['field__input'];

    if (isFocused) rest.className.push(classes?.focused ? ` ${classes.focused}` : ' is-focused');

    // console.log(form.hasError(name))

    if (form?.hasError(name)) rest.className.push(classes?.error ? ` ${classes.error}` : ' field__input--has-error');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (form) form.handleChange({ name, value });

        if (props.onChange) props.onChange(value);

    }

    const handleKeydown = (e: React.KeyboardEvent) => {

        if (props.onKeyDown) {

            props.onKeyDown(e);

            return;
        }

        if (e.key === 'Enter') {

            e.preventDefault();

            if (props.onEnter) props.onEnter();
            else if (form) form.triggerSubmit();
        }

        return false;
    }

    const handleFocus = (e: React.FocusEvent) => {

        if (setIsFocused) setIsFocused(true);

        if (props.onFocus) props.onFocus(e);

    }

    const handleBlur = (e: React.FocusEvent) => {

        if (setIsFocused) setIsFocused(false);

        if (props.onBlur) props.onBlur(e);

    }

    rest.className = isArray(rest.className) ? rest.className.join(' ') : rest.className;

    return (
        <input
            {...rest}
            autoComplete="off"
            title={name}
            data-lpignore="true"
            // className={rest.className}
            required={undefined}
            type={rest.type || 'text'}
            onChange={handleChange}
            onKeyDown={handleKeydown}
            onFocus={handleFocus}
            onBlur={handleBlur}
        />
    )
})

interface InputTextProps {
    [key: string]: any
}

export { InputText };