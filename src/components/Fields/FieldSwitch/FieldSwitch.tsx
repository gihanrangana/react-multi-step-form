import React from 'react';
import { InputSwitch } from '../../Inputs/InputSwitch/InputSwitch';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

const UiFieldSwitch: React.FC<FieldSwitchProps> = (props) => {

    return (
        <FieldWrapper
            {...props}
        >

            <InputSwitch
                {...props}
            />

        </FieldWrapper>
    )
}

interface FieldSwitchProps {
    [key: string]: any
}

export { UiFieldSwitch };