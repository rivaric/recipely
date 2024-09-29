import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UploadImageDto } from 'src/dto/image-upload.dto';
import { ImageUpload } from 'src/decorators/image-upload.decorarot';

@ApiTags('Ingredient')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientService.create(createIngredientDto);
  }

  @Post(':id/add-image')
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'id',
    required: true,
  })
  @ApiBody({
    type: UploadImageDto,
  })
  @ImageUpload()
  addImageForIngredient(@Param('id') id: string, @Req() req: any) {
    const imageUrl = req.imageUrl;
    return this.ingredientService.addImageForIngredient(Number(id), imageUrl);
  }

  @Get()
  findAll() {
    return this.ingredientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.ingredientService.update(+id, updateIngredientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientService.remove(+id);
  }
}
