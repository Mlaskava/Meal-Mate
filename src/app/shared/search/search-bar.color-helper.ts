import { Application, Color } from "@nativescript/core";

export function getColor(element: 'searchBar' | 'searchSuggestions'): Color {
    return new Color(Application.getNativeApplication()
        .getResources()
        .getColor(Application.getNativeApplication()
            .getResources()
            .getIdentifier(`${element}Color`, 'color', Application.getNativeApplication().getPackageName())));
}