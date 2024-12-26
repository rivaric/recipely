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
    instructionIds,
    ingredientIds,
    creatorId,
  }: CreateDishDto) {
    return this.prisma.dish.create({
      data: {
        name,
        description,
        instructions: {
          connect: instructionIds.map((id) => ({ id })),
        },
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
    return this.prisma.dish.findMany({
      include: {
        instructions: true,
        ingredients: true,
        creator: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.dish.findUnique({
      where: { id },
      include: {
        instructions: true,
        ingredients: true,
        creator: true,
      },
    });
  }

  update(
    id: number,
    {
      name,
      description,
      instructionIds,
      ingredientIds,
      creatorId,
    }: UpdateDishDto,
  ) {
    return this.prisma.dish.update({
      where: { id },
      data: {
        name,
        description,
        instructions: {
          connect: instructionIds.map((id) => ({ id })),
        },
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
