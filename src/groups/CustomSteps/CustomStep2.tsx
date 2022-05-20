import React, { useMemo } from 'react'
import { UiFieldText } from '../../components/Fields/FieldText/FieldText';

const CustomStep2: React.FC<CustomStep2Props> = (props) => {

    const { form, formValues } = props;
    
    return useMemo(() => (
        <>
            <UiFieldText
                form={form}
                name="email"
                label="Email"
                defaultValue={form.values.email}
                placeholder="Enter your email"
                required={true}
            />
        </>
    ), [form])
}

interface CustomStep2Props {
    [key: string]: any;
}

export default CustomStep2