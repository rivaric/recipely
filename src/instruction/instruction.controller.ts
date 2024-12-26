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
import { InstructionService } from './instruction.service';
import { CreateInstructionDto } from './dto/create-instruction.dto';
import { UpdateInstructionDto } from './dto/update-instruction.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ImageUpload } from 'src/decorators/image-upload.decorarot';
import { UploadImageDto } from 'src/dto/image-upload.dto';

@Controller('instruction')
@ApiTags('Instruction')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class InstructionController {
  constructor(private readonly instructionService: InstructionService) {}

  @Post()
  create(@Body() createInstructionDto: CreateInstructionDto) {
    return this.instructionService.create(createInstructionDto);
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
    return this.instructionService.addImageForInstruction(+id, imageUrl);
  }

  @Get(':id/steps')
  getStepsForDish(@Param('id') id: string) {
    return this.instructionService.findStepsForDish(+id);
  }

  @Get()
  findAll() {
    return this.instructionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instructionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInstructionDto: UpdateInstructionDto,
  ) {
    return this.instructionService.update(+id, updateInstructionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instructionService.remove(+id);
  }
}
