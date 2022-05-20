import React from 'react';
import { InputRadio } from '../../Inputs/InputRadio/InputRadio.web';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

const UiFieldRadio: React.FC<FieldRadioProps> = React.forwardRef((props, ref) => {

    return (
        <FieldWrapper
            {...props}
        >
            <InputRadio
                ref={ref}
                {...props}
            />

        </FieldWrapper>
    )
})

interface FieldRadioProps {
    [key: string]: any
}

export { UiFieldRadio };