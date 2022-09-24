import { writable } from 'svelte/store';

/**
 * A store that will handle the creation and removal of different notifications.
 * 
 * @returns 
 */
 function pageHeading() {
    /** The default value for the store. */
    const pageHeading: string = 'Welcome';
    const { subscribe, set } = writable(pageHeading);
 
    return {
        subscribe,
        /** Sets the heading. */
        set: (heading: string) => set(heading),
    }
}

export const heading = pageHeading();