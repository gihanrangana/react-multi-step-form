import { createRef, useRef, useState } from 'react';
import { set, get } from 'lodash';

const useForm = (initialValues: any = {}): useFormProps => {

    const [key, setKey] = useState(0);
    const [values, setValues] = useState(initialValues ? { ...initialValues } : {});
    const [errors, setErrors]: any = useState({});
    const [changed, setChanged] = useState(false);

    const ref = createRef();
    const submitRef = useRef();

    let fields: any = {};

    const form: any = {
        key: key,
        ref: ref,
        submitRef: submitRef,
        values: values,
        changed: changed,
        defaults: initialValues,
        errors: errors,
        uploading: [],
        addField: (key: string, options: object = {}) => {

            fields[key] = options;

        },
        addUploading(uid: string): void {
            console.log(uid);
        },
        getDefault: (key: string): any => {

            return get(form.defaults, key, null);

        },
        getValue: (key: string): any => {

            return get(values, key, null);

        },
        setKey: () => {
            setKey(key + 1);
        },
        getError: (key: any) => {
            return errors[key] || null;
        },
        hasError: (key: any) => {
            return !!errors[key];
        },
        setError: (key: string, message: string) => {

            let error: any = {};
            error[key] = message;

            // console.error(error)
            setErrors((prev: any) => ({ ...prev, ...error }));

        },
        removeUploading(uid: string): void {
            console.log(uid);
        },
        resetFields: (): void => {

            fields = {};

        },
        reset: () => {

            if (form.ref && form.ref.current) form.ref.current.reset();

            setErrors({});
            setValues(form.defaults);
            setChanged(false);

            form.setKey();

        },
        validate: () => {
            let hasError = false;
            const errors: any = {};
            const fieldValues = {};

            Object.keys(fields).map(key => {

                const [error, value] = form.validateField(key, true);

                if (error) {
                    hasError = true;
                    errors[key] = error;
                }

                set(fieldValues, key, value);

                return null;
            })

            setErrors(errors);

            return [hasError ? errors : null, fieldValues];

        },
        validateField: (key: string, silent = false): Array<any> => {

            const field: any = fields[key];

            if (!field) return [null, null];

            let value = form.getValue(key);

            if (field.isArray) value = [];

            let error;

            try {
                if ((field.required && !value) || (field.required && Array.isArray(value) && value.length === 0)) {
                    throw new Error('This Field is Required');
                }

                if (field.validations && field.validations.type) {

                    switch (field.validations.type) {
                        case 'email':

                            const regEmail = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,5}$/g;

                            if (!regEmail.test(value)) {

                                throw new Error('Email should be a valid email address');

                            }

                            break;

                        case 'password':

                            if (key !== 'password_confirmation') {

                                const regPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

                                if (!regPass.test(value)) throw new Error('Minimum six characters, at least one letter and one number');

                            }

                            if (key === 'password_confirmation') {

                                const match = form.getValue(field.validations.equalto) === value;

                                if (!match) throw new Error('Password should be matched')
                            }

                            break;

                        case 'username':



                            break;

                        default:
                            break;
                    }
                }

            } catch (e: any) {
                error = e.message;
            }

            value = value || field.fallbackValue || null;

            if (silent) {
                return [error, value];
            } else {
                // @ts-ignore
                // if (errors[key]) {
                // @ts-ignore
                errors[key] = error;
                // }

                setErrors(errors);

                return [error, value];
            }
        },
        handleChange: (e: any) => {

            if (!e) return;

            const name = e.target ? e.target.name : e.name;
            const value = e.target ? e.target.value : e.value;

            if (!name) return;

            set(values, name, value);

            setChanged(true);

            if (errors[name]) {

                form.validateField(name, false);

            }


        },
        handleSubmit: (next: any) => {

            const [errors, values] = form.validate();

            if (!errors && next) {
                next(values);
                setChanged(false);
            }

        },
        triggerSubmit: () => {

            form.ref.current.dispatchEvent(new Event('submit'));
        }
    };

    return form;
}

export interface useFormProps {
    key: any;
    ref?: any;
    submitRef?: any;
    values: any,
    errors: object,
    defaults: any,
    changed: boolean,
    uploading: Array<string>,

    resetFields(): void,

    addField(key: string, options: object): void,

    getDefault(key: string): any,

    getValue(key: string): any,

    validate(): void,

    setError(key: string, message: string): any

    hasError(key: string): boolean

    validateField(key: string, silent?: boolean): Array<any>,

    handleChange(event: object): void,

    handleSubmit(next: any): void,

    addUploading(uid: string): void,

    removeUploading(uid: string): void,

    triggerSubmit?(): void
}

export { useForm }