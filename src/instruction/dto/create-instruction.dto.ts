import { ApiProperty } from '@nestjs/swagger';

export class CreateInstructionDto {
  @ApiProperty()
  step_number: number;
  @ApiProperty()
  image: string;
  @ApiProperty()
  description: string;
}
