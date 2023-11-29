import {IsString} from 'class-validator';
import { ApiModel, ApiModelProperty } from 'swagger-express-ts';

@ApiModel({
  description: 'GuardDTO description',
  name: 'Guard DTO'
})
export class LoginDTO {
  @ApiModelProperty({
    description: 'your id',
    required: true
  })
  @IsString()
  guardId!: string;
}