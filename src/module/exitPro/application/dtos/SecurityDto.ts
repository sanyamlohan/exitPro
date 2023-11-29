import {IsString} from 'class-validator';
import { ApiModel, ApiModelProperty } from 'swagger-express-ts';

@ApiModel({
  description: 'SecurityDTO description',
  name: 'Security DTO'
})
export class SecurityDTO {
  @ApiModelProperty({
    description: 'your id',
    required: true
  })
  @IsString()
  guardId!: string;

  @ApiModelProperty({
    description: 'your name',
    required: true
  })
  @IsString()
  guardName!: string;

  @ApiModelProperty({
    description: 'your contact number',
    required: true
  })
  @IsString()
  guardContact!: string;
}