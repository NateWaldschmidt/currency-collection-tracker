export default class RequestHelper {
    public static serializeFormData(fd: FormData): {[key: string]: any} {
        /** The object to serialize the FormData into. */
        const serializedFormData: {[key: string]: any} = {};

        // Loops each of the FormData entries and adds to the serialized form data.
        fd.forEach((value, key) => {
            serializedFormData[key] = value;
        });

        return serializedFormData;
    }
}