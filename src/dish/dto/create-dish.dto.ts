import { ApiProperty } from '@nestjs/swagger';

export class CreateDishDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  creatorId: number;

  @ApiProperty({ type: [Number] })
  instructionIds: number[];

  @ApiProperty({ type: [Number] })
  ingredientIds: number[];
}
