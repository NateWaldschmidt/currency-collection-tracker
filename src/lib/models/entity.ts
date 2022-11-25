import type { ObjectSchema } from "joi";

abstract class Entity<Entity, EntityData> {

    constructor(entityData: EntityData) {
        Object.assign(this, entityData);
    }

    /** @returns Converts the class object to a JSON object. */
    toObject(): EntityData {
        // The unknown part is necessary to get to EntityData.
        return { ...this } as unknown as EntityData;
    }

    /** The constraints for the model for validation. */
    public abstract getSchema(): ObjectSchema<any>;

    /**
     * Validates the user using the constraints defined within this class.
     */
     public async validate(): Promise<boolean> {
        await this.getSchema().validateAsync(this.toObject());

        return true;
    }
}

export default Entity;