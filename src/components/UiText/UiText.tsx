import React, { forwardRef } from 'react';
import { isArray } from 'lodash';

const UiText: React.FC<UiTextProps | HTMLParagraphElement> = forwardRef((props, ref) => {

    if (!props.children) return <></>;

    const { tag }: any = props;
    const rest: any = { ...props };

    if (isArray(rest.className)) rest.className = rest.className.join(' ');

    rest.ref = ref;

    ['tag'].forEach(key => delete rest[key]);

    const render = (rest.children)

    return React.createElement(tag || "p", rest, render);

})

interface UiTextProps {
    ref?: React.Ref<any>;
    tag?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | string;
    [key: string]: any
}

export { UiText };