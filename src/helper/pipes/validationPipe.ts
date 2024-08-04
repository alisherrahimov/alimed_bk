import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as yup from 'yup';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private readonly schema: yup.AnyObjectSchema) {}

  async transform(value: any) {
    try {
      await this.schema.validate(value, { abortEarly: false });
    } catch (err) {
      throw new BadRequestException(err.errors.join(', '));
    }
    return value;
  }
}
