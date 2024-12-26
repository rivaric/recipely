import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { DishModule } from './dish/dish.module';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { InstructionService } from './instruction/instruction.service';
import { InstructionModule } from './instruction/instruction.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    IngredientModule,
    DishModule,
    UserModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static',
    }),
    InstructionModule,
  ],
  controllers: [],
  providers: [InstructionService],
})
export class AppModule {}
