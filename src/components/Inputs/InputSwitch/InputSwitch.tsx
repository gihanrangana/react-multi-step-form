import React from 'react';
import { UiView } from '../../UiView/UiView';

const InputSwitch: React.FC<InputSwitchProps> = (props) => {

    const { form, name, label, defaultValue, onChange, classes, ...rest } = props;

    const [value, setValue] = React.useState(defaultValue || false);

    if (form) form.addField(name, props);

    const handleChange = React.useCallback(() => {

        setValue((prev: any) => !prev);

        if (form) form.handleChange({ name, value: !value });

    }, [value]);

    const className = ['field__switch'];
    const switchIndicatorClass = ['field__switch-indicator'];
    const switchLabelClass = ['field__switch-label'];

    if (classes?.input) className.push(classes.input);
    if (classes?.switchIndicator) switchIndicatorClass.push(classes.switchIndicator);
    if (classes?.switchLabel) switchLabelClass.push(classes.switchLabel);

    if (value) {
        className.push('field__switch--checked');
        switchIndicatorClass.push('field__switch-indicator--checked');
        switchLabelClass.push('field__switch-label--checked');

        if (classes?.switchChecked) className.push(classes?.switchChecked)
        if (classes?.switchLabelChecked) switchLabelClass.push(classes.switchLabelChecked);
        if (classes?.switchIndicatorChecked) switchIndicatorClass.push(classes.switchIndicatorChecked);
    };

    if (rest.size) {
        switch (rest.size) {
            case "small":
                className.push('field__switch--sm');
                break;
            default:
                break;
        }
    }

    return (
        <UiView
            className={className.join(' ')}
            onClick={handleChange}
        >

            <UiView className={switchIndicatorClass} />

        </UiView>
    )
}

interface InputSwitchProps {
    [key: string]: any
}

export { InputSwitch };