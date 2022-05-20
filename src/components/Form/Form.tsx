import React from 'react';

interface FormProps {
    form: any;
    ref?: any
    children: React.ReactNode;
    onSubmit?(values: object): void;
    [key: string]: any
}


const Form: React.FC<FormProps> = (props) => {

    const { form, loading, className, onSubmit } = props;

    let classes = ['form'];
    if (className) classes.push(className);

    if (form) {
        return (
            <form
                key={form.key}
                ref={form.ref}
                autoComplete={"off"}
                noValidate={true}
                onSubmit={(e) => {
                    
                    e.preventDefault();

                    form.handleSubmit(onSubmit);

                    return false;
                }}
                className={classes.join(' ')}
            >

                <fieldset disabled={loading}>

                    {form.resetFields()}

                    {props.children}

                </fieldset>

            </form>
        )
    }

    return <></>
}

export default Form;