import React, { forwardRef } from 'react';
import { InputText } from '../../Inputs/InputText/InputText';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

const UiFieldText: React.FC<FieldTextProps | HTMLInputElement> = forwardRef((props, ref) => {

    const rest = { ...props }

    const [isFocused, setIsFocused] = React.useState(false);
    
    rest.ref = ref

    return (
        <FieldWrapper
            {...props}
        >

            <InputText
                {...rest}
                isFocused={isFocused}
                setIsFocused={setIsFocused}
            />

        </FieldWrapper>
    )
})

interface FieldTextProps {
    form?: any
    [key: string]: any
}

export { UiFieldText };