import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';
// import { validate } from 'class-validator';
// import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, metadata);
    return value;
  }
}

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  private schema: ObjectSchema;

  // constructor(private schema: ObjectSchema) {}
  constructor(Schema: ObjectSchema) {
    this.schema = Schema;
  }

  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, metadata);
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}

// @Injectable()
// export class ValidationPipe implements PipeTransform<any> {
//   async transform(value: any, { metatype }: ArgumentMetadata) {
//     if (!metatype || !this.toValidate(metatype)) {
//       return value;
//     }
//     const object = plainToClass(metatype, value);
//     const errors = await validate(object);
//     if (errors.length > 0) {
//       throw new BadRequestException('Validation failed');
//     }
//     return value;
//   }

//   private toValidate(metatype: Function): boolean {
//     const types: Function[] = [String, Boolean, Number, Array, Object];
//     return !types.includes(metatype);
//   }
// }
