import React, { forwardRef, useEffect, useCallback } from 'react';
import { isArray } from 'lodash';
import Select from 'react-select';

const InputSelect: React.FC<InputSelectProps> = forwardRef((props, ref) => {

    let { form, classes, name } = props;
    const rest: any = { ...props };

    if (form) form.addField(props.name, props)

    const [defaultValue, setDefaultValue] = React.useState(undefined);

    const defaultProps: any = {
        className: [],
        cacheOptions: true,
        isClearable: true,
        isSearchable: true,
    }

    if (classes) defaultProps.className = [classes?.input]

    if (form.hasError(name)) {
        const currentEl = document.querySelector(`#${name} .field-select__control`);
        if (currentEl) currentEl.classList.add(classes?.error ? classes?.error : 'field-select__control--has-error');
    }

    const selectProps = {
        ...defaultProps,
        ...rest,
        options: rest.options || [],
        defaultValue: defaultValue,
        ref: ref
    }

    const handleChange = (option: any) => {

        let value = null

        if (rest.isMulti) {

            value = option.map((item: any) => item.value)

        } else if (option) {
            value = option.value
        }

        form.handleChange({ name, value })

        if (rest.onChange) rest.onChange({ name, value });

    }

    useEffect(() => {

        if (!rest.defaultValue && rest.defaultValue !== 0) return;

        if (rest.isMulti && rest.defaultValue.length < 1) return;

        let value: any = rest.defaultValue;

        if (rest.isMulti && (typeof value[0] === 'string' || typeof value[0] === 'number')) {
            value = [];

            // @ts-ignore
            rest.options.map((option: any) => {
                if (option.value === value) value = option;

                return option;
            })
        }

        setDefaultValue(value);

    }, [rest.defaultValue, rest.isMulti, rest.options])

    selectProps.onChange = handleChange;
    if (isArray(selectProps.className)) selectProps.className.join(' ')

    return (
        <React.Fragment>
            <Select
                id={`${name}`}
                {...selectProps}
                onMenuClose={() => {

                    const menuEl = document.querySelector(`#${name} .field-select__menu`);
                    const containerEl = menuEl?.parentElement;
                    const clonedMenuEl: any = menuEl?.cloneNode(true);

                    if (!clonedMenuEl) return;

                    clonedMenuEl.classList.add('field-select__menu--close');
                    clonedMenuEl.addEventListener('animationend', () => {
                        containerEl?.removeChild(clonedMenuEl);
                    })

                    containerEl?.appendChild(clonedMenuEl!);

                }}
                className={['field-select', classes].join(' ')}
                classNamePrefix={'field-select'}
                
            />
        </React.Fragment>
    )
})

interface InputSelectProps {
    [key: string]: any
}

export { InputSelect };