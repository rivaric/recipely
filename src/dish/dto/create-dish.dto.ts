import { ApiProperty } from '@nestjs/swagger';

export class Instruction {
  @ApiProperty()
  step: number;

  @ApiProperty()
  description: string;
}

export class CreateDishDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  creatorId: number;

  @ApiProperty({ type: [Instruction] })
  instructions: Instruction[];

  @ApiProperty({ type: [Number] })
  ingredientIds: number[];

  @ApiProperty({ type: 'string', format: 'binary' })
  image: Express.Multer.File;
}
