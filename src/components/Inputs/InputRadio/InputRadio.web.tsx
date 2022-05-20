import React from 'react';
import { UiLink } from '../../UiLink/UiLink';
import { UiText } from '../../UiText/UiText';
import { UiView } from '../../UiView/UiView';

const InputRadio: React.FC<InputRadioProps> = React.forwardRef((props, ref) => {

    const { form, name, classes, defaultValue, options } = props;
    const rest: any = props

    const [value, setValue] = React.useState(defaultValue);

    if (form) form.addField(name, props)

    const handleChange = (value: any) => {
        setValue(value)

        if (form) form.handleChange({ name, value })

        if (rest.onChange) rest.onChange({ name, value })
    }

    const checkedClasses = classes?.radioItemCheckedWrapper ? classes.radioItemCheckedWrapper : 'field__radio--item-wrapper-checked';
    const unCheckedClasses = classes?.radioItemWrapper ? classes.radioItemWrapper : 'field__radio--item-wrapper';

    const mainClass = classes?.input ? [classes?.input] : ['field__radio']
    if (form.hasError(name)) mainClass.push('field__radio--has-error')

    return (
        <UiView
            ref={ref}
            className={mainClass.join(' ')}
        >

            {options && options.map((option: any, index: number) => {

                let checked = value === option.value;

                return (
                    <UiLink
                        key={index}
                        className={checked ? checkedClasses : unCheckedClasses}
                        onClick={handleChange.bind(null, option.value)}
                    >

                        <UiView
                            className={classes?.radioItem ? classes.radioItem : 'field__radio--item'}
                        />

                        <UiText
                            tag="span"
                            className={classes?.radioItemLabel ? classes.radioItemLabel : 'field__radio--label'}
                        >
                            {option.label}
                        </UiText>
                        
                    </UiLink>
                )

            })}

        </UiView>
    )
})

interface InputRadioProps {
    [key: string]: any
}

export { InputRadio };