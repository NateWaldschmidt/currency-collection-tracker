/** The model for a United States Mint. */
export default class UsMint {
    public id?: number;
    /** The mark that this mint produced. */
    public mark?: string;
    /** The city that this mint resides. */
    public city?: string;
    /** The state that this mint resides. */
    public state?: string;
    /** When this mint opened. */
    public dateOpened?: Date;
    /** When this mint closed. */
    public dateClosed?: Date;
}