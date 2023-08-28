"use client"

import React, { useRef, useEffect, useState } from 'react';

interface Props {
    html: string;
}

export default function ShadowDom({ html }: Props) {
    const shadowHostRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (shadowHostRef.current) {
            const shadowHost = shadowHostRef.current;
            if (!shadowHost.shadowRoot) {
                shadowHost.attachShadow({ mode: 'open' }).innerHTML = html;
            } else {
                shadowHost.shadowRoot.innerHTML = html; // update existing shadow root
            }
            const { width } = shadowHost.getBoundingClientRect();
            const windowWidth = window.innerWidth;

            if (width > windowWidth) {
                /* const scaleValue = 1 - Math.round((width - windowWidth + 30)*100/width)/100 */
                /* shadowHostRef.current?.style?.setProperty('transform',`scaleX(${scaleValue})`); */
                shadowHostRef.current?.style?.setProperty('overflow', 'auto');
            }
        }
    }, [html]);

    return <div id="richcontent" ref={shadowHostRef} />;
}
