import React, { useMemo } from 'react'
import { UiFieldText } from '../../components/Fields/FieldText/FieldText';

const CustomStep1: React.FC<CustomStep1Props> = (props) => {

    const { form, formValues } = props;
    
    return useMemo(() => (
        <>
            <UiFieldText
                form={form}
                name="name"
                label="Name"
                defaultValue={form.values.name}
                placeholder="Enter your name"
                required={true}
                autoFocus={true}
            />
        </>
    ), [form])
}

interface CustomStep1Props {
    [key: string]: any;
}

export default CustomStep1