import BaseModel from "$lib/models/base-model";
import Joi from "joi";

/** A JSON Object for building Grading Companies. */
export interface GradingCompanyJson {
    id?: number,
    name?: string,
    dateOpened?: Date|null,
    dateClosed?: Date|null,
}

/** The model for a Grading Company. */
export default class GradingCompany extends BaseModel<GradingCompany> {
    public id: number;
    public name: string;
    public dateOpened?: Date|null;
    public dateClosed?: Date|null;

    constructor(gradingCompanyJson: GradingCompanyJson) {
        super();

        // Checks for required fields
        if (gradingCompanyJson['id'] === undefined
            || gradingCompanyJson['name'] === undefined) {
            throw new ReferenceError(`Missing required field.`);
        }

        // Sets the values for the Grade Company.
        this.id         = gradingCompanyJson.id;
        this.name       = gradingCompanyJson.name;
        this.dateOpened = gradingCompanyJson.dateOpened;
        this.dateClosed = gradingCompanyJson.dateClosed;
    }

    /**
     * @inheritDoc
     */
     public getSchema(): Joi.ObjectSchema<any> {
        return Joi.object({
            id:         Joi.number()
                           .integer()
                           .min(1)
                           .required(),
            name:       Joi.string()
                           .min(1)
                           .max(255)
                           .trim()
                           .required(),
            dateOpened: Joi.date()
                           .allow(null),
            dateClosed: Joi.date()
                           .allow(null),
        });
    }
}
