import React from 'react';
import { InputSelect } from '../../Inputs/InputSelect/InputSelect';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

const UiFieldSelect: React.FC<FieldSelectProps> = (props) => {

    const rest: any = { ...props };

    return (
        <FieldWrapper
            {...rest}
        >

            <InputSelect
                {...props}
            />

        </FieldWrapper>
    )
}

interface FieldSelectProps {
    [key: string]: any
}

export { UiFieldSelect };