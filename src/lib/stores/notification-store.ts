import { writable } from 'svelte/store';

/** The notification component's general information. */
export interface Notification {
    /** A unique identifier for the element. */
    id: string,
    /** The type of message to be displayed. */
    type: 'success'|'danger'|'general',
    /** The title of the notification pop-up. */
    title?: string,
    /** The message for the notification. */
    message: string,
}

/**
 * A store that will handle the creation and removal of different notifications.
 * 
 * @returns 
 */
function createNotification() {
    const notifications: Notification[] = [];
    const { subscribe, set, update } = writable(notifications);
 
    return {
        subscribe,
        /** Appends a notification. */
        add: (notification: Notification) => update(nStore => {
            // Keeps generating until the notification ID is unique.
            while (nStore.find(notif => notif.id == notification.id)) {
                // Gets the date and then the time in milliseconds as a string.
                notification.id = new Date().getTime().toString();
            }

            return [...nStore, notification]
        }),
        /** Remove a particular notification from the display. */
        remove: (id: string) => update(nStore => nStore.filter(n => n.id != id)),
        /** Remove all notifications being displayed. */
        clear: () => set(notifications),
    }
}

export const notifications = createNotification();