import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error, value: formatValue } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return formatValue;
  }
}
