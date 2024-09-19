import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { DishModule } from './dish/dish.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, IngredientModule, DishModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
