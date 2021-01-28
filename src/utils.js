import React from 'react';

export function renderLink (url) {
    if(url) {
        return (<a href={url} className="mb-2">Läs mer</a>);
    }
}