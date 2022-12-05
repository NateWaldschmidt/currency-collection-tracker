import { AppDataSource } from '$lib/server/database/data-source';
import {
    registerDecorator,
    ValidatorConstraint,
    type ValidationArguments,
    type ValidatorConstraintInterface,
    type ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class UniqueInExistConstraint implements ValidatorConstraintInterface {
    async validate(value: any, args: ValidationArguments) {
        return AppDataSource.getRepository(args.targetName)
            .countBy({ [args.property]: value })
            .then((count) => count < 1);
    }
}

export function UniqueIn(entity: any, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        object[`class_entity_${propertyName}`] = entity;
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: { message: 'This is already in use, please choose another.', ...validationOptions },
            constraints: [],
            validator: UniqueInExistConstraint,
        });
    };
}