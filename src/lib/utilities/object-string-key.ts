/**
 * 
 * 
 * @param object    The object being indexed.
 * @param stringKey The keys for the nested objects in a single string.
 * @returns The value from within the object.
 */
export default function stringKeyValue(object: any, stringKey: string): any|undefined {
    stringKey = stringKey.replace(/\[(\w+)\]/g, '.$1');
    stringKey = stringKey.replace(/^\./, '');
    let allKeys = stringKey.split('.');
    for (let i = 0; i < allKeys.length; ++i) {
        let key = allKeys[i];

        let func = false;
        // Checks function tags
        if (/\(\)/.test(key)) func = true;
        
        // Removes function tags.
        key = key.replace(/\(\)/, '');

        if (key in object) {
            if (func) {
                object = object[key]();
            } else {
                object = object[key];
            }
        } else {
            return;
        }
    }
    return object;
}