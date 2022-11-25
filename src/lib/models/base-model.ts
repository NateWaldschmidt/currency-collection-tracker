import type Joi from 'joi';

/**
 * @deprecated
 * The base class for Models.
 * */
export default abstract class BaseModel<Entity> {

    /**
     * Takes the properties of the object and transforms them to JSON.
     * 
     * @returns The JSON of this.
     */
    public toJson(): any {
        return JSON.parse(JSON.stringify(this));
    }

    /**
     * Takes an array of entities and transforms into JSON.
     * 
     * @param entities All the entities to be formatted into JSON.
     * 
     * @returns The JSON.
     */
    public static toJsonArray(entities: any[]): any {
        return JSON.parse(JSON.stringify(entities));
    }

    /**
     * Validates the user using the constraints defined within this class.
     */
    public async validate(): Promise<boolean> {
        await this.getSchema().validateAsync(this.toJson());

        return true;
    }

    /**
     * The constraints for the model for validation.
     */
    public abstract getSchema(): Joi.ObjectSchema<any>;
}