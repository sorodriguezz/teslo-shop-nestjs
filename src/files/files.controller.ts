import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileNamer, fileFilter } from './helpers/';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response, // emitir respuesta manual, ya no se encarga nest y se salta interceptores
    @Param('imageName') imageName: string,
  ) {
    const path = this.filesService.getStaticProductImage(imageName);

    res.sendFile(path);
  }

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

    const secureUrl = `${file.filename}`;

    return {
      fileName: secureUrl,
    };
  }
}
