import BaseModel from "$lib/models/base-model";
import Joi from "joi";

/** A JSON Object for building Grades. */
export interface GradingJson {
    id?: number,
    grade?: string,
    description?: string|null,
}

/** The model for a Grade. */
export default class Grade extends BaseModel<Grade> {
    public id: number;
    /** The grade for this Grade model. */
    public grade: string;
    /** A description of what this grade generally describes. */
    public description: string|null;

    constructor(entityJson: GradingJson) {
        super();

        // Checks for required fields
        if (entityJson.id === undefined
            || entityJson.grade === undefined) {
            throw new ReferenceError(`Missing required field.`);
        }

        this.id          = entityJson.id;
        this.grade       = entityJson.grade;
        this.description = entityJson.description || null;
    }

    /**
     * @inheritDoc
     */
     public getSchema(): Joi.ObjectSchema<any> {
        return Joi.object({
            id:          Joi.number()
                            .integer()
                            .min(1)
                            .required(),
            grade:       Joi.string()
                            .min(1)
                            .max(255)
                            .required(),
            description: Joi.string()
                            .min(1)
                            .max(1000)
                            .allow(null),
        });
    }
}
