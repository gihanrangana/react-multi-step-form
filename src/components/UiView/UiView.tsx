import React, { forwardRef } from 'react';
import { isArray } from 'lodash';

type UiViewProps = {
    background?: any
    container?: boolean
    className?: any
    [key: string]: any;
}

const defaultStyles = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
}

const UiView: React.FC<UiViewProps> = forwardRef((props, ref: any) => {

    const { background, container }: any = props;
    const rest: any = { ...props };

    if (!rest.className) rest.className = [];
    else rest.className = !isArray(rest.className) ? [rest.className] : rest.className;

    if (background) {

        rest.style = {
            backgroundImage: `url(${background.uri})`,
            ...defaultStyles,
            ...background.styles
        }

    }

    if (container && container !== false) {
        rest.className.push('container');
    }

    rest.ref = ref;

    delete (rest.background);
    delete (rest.container);

    if (isArray(props.className) || isArray(rest.className)) rest.className = rest.className.join(' ');

    const render = (
        <>
            {rest.children}
        </>
    )

    return React.createElement('div', rest, render);

})

export { UiView };