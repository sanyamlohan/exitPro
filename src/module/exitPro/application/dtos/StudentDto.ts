import {IsString, IsNumber } from 'class-validator';
import { ApiModel, ApiModelProperty } from 'swagger-express-ts';

@ApiModel({
  description: 'StudentDTO description',
  name: 'Student'
})
export class StudentDTO {
    @ApiModelProperty({
    description: 'student roll number',
    required: true
    })
    @IsNumber()
    roll_number!: number;

    @ApiModelProperty({
        description: 'name of the student',
        required: true
    })
    @IsString()
    name!: string;

    @ApiModelProperty({
        description: 'contact number of student',
        required: true
    })
    @IsString()
    contact!: string;

    @ApiModelProperty({
        description: 'staying in which hostel',
        required: true
    })
    @IsString()
    hostel!: string;

    @ApiModelProperty({
        description: 'student room number',
        required: true
    })
    @IsNumber()
    room_number!: number;
}
