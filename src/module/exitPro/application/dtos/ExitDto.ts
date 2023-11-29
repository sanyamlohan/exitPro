import {IsString, IsNumber } from 'class-validator';
import { ApiModel, ApiModelProperty } from 'swagger-express-ts';

@ApiModel({
  description: 'InputDTO description',
  name: 'Input DTO'
})
export class InputDTO {
  @ApiModelProperty({
    description: 'student roll number',
    required: true
  })
  @IsNumber()
  roll_number!: number;

  @ApiModelProperty({
    description: 'where are you going',
    required: true
  })
  @IsString()
  goingTo!: string;
}