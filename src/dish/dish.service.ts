import { Injectable } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class DishService {
  constructor(private readonly prisma: PrismaService) {}
  create({
    name,
    description,
    instructions,
    ingredientIds,
    creatorId,
  }: CreateDishDto) {
    return this.prisma.dish.create({
      data: {
        name,
        description,
        instructions: JSON.stringify(instructions),
        creator: {
          connect: { id: creatorId },
        },
        ingredients: {
          connect: ingredientIds.map((id) => ({ id })),
        },
      },
    });
  }

  addImageForDish(dishId: number, imageUrl: string) {
    return this.prisma.dish.update({
      where: { id: dishId },
      data: {
        image: imageUrl,
      },
    });
  }

  findAll() {
    return this.prisma.dish.findMany();
  }

  findOne(id: number) {
    return this.prisma.dish.findUnique({
      where: { id },
    });
  }

  update(
    id: number,
    {
      name,
      description,
      instructions,
      ingredientIds,
      creatorId,
    }: UpdateDishDto,
  ) {
    return this.prisma.dish.update({
      where: { id },
      data: {
        name,
        description,
        instructions: JSON.stringify(instructions),
        creator: {
          connect: { id: creatorId },
        },
        ingredients: {
          set: [],
          connect: ingredientIds.map((id) => ({ id })),
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.dish.delete({
      where: { id },
    });
  }
}
