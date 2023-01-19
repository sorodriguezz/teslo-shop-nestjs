import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter, // se envia la referencia
      // limits: { fileSize: 1000 } // limite tamaño de archivo
      storage: diskStorage()
    }),
  ) // interceptar las solicitudes y mutar los valores
  uploadProductImage(
    @UploadedFile() file: Express.Multer.File, // para archivos subidos
  ) {
    if (!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }

    return {
      fileName: file.originalname,
    };
  }
}
