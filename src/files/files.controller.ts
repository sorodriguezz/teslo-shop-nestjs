import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileNamer, fileFilter } from './helpers/';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter, // se envia la referencia
      // limits: { fileSize: 1000 } // limite tamaño de archivo
      storage: diskStorage({
        destination: './static/products', // donde guardar el archivo en filesystem
        filename: fileNamer,
      }),
    }),
  ) // interceptar las solicitudes y mutar los valores
  uploadProductImage(
    @UploadedFile() file: Express.Multer.File, // para archivos subidos
  ) {
    if (!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }

    console.log(file);

    return {
      fileName: file.originalname,
    };
  }
}
