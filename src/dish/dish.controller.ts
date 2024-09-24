import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ImageUpload } from '../decorators/image-upload.decorarot';
import { UploadImageDto } from '../dto/image-upload.dto';

@ApiTags('Dish')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post()
  create(@Body() createDishDto: CreateDishDto) {
    return this.dishService.create(createDishDto);
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
  addImageForDish(@Param('id') id: string, @Req() req: any) {
    const imageUrl = req.imageUrl;
    return this.dishService.addImageForDish(Number(id), imageUrl);
  }

  @Get()
  findAll() {
    return this.dishService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dishService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDishDto: UpdateDishDto) {
    return this.dishService.update(+id, updateDishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dishService.remove(+id);
  }
}
