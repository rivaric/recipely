import { Injectable } from '@nestjs/common';
import { CreateInstructionDto } from './dto/create-instruction.dto';
import { UpdateInstructionDto } from './dto/update-instruction.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class InstructionService {
  constructor(private readonly prisma: PrismaService) {}

  create(createInstructionDto: CreateInstructionDto) {
    return this.prisma.instruction.create({
      data: createInstructionDto,
    });
  }

  addImageForInstruction(instructionId: number, imageUrl: string) {
    return this.prisma.dish.update({
      where: { id: instructionId },
      data: {
        image: imageUrl,
      },
    });
  }

  findStepsForDish(dishId: number) {
    return this.prisma.instruction.findMany({
      where: { dishId },
    });
  }

  findAll() {
    return this.prisma.instruction.findMany();
  }

  findOne(id: number) {
    return this.prisma.instruction.findUnique({
      where: { id },
    });
  }

  update(id: number, updateInstructionDto: UpdateInstructionDto) {
    return this.prisma.instruction.update({
      where: { id },
      data: updateInstructionDto,
    });
  }

  remove(id: number) {
    return this.prisma.instruction.delete({
      where: { id },
    });
  }
}
