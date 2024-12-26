import { Module } from '@nestjs/common';
import { InstructionService } from './instruction.service';
import { InstructionController } from './instruction.controller';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InstructionController],
  providers: [InstructionService],
})
export class InstructionModule {}
