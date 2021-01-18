import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DEFAULT_ECDH_CURVE } from 'tls';
import { CreateContextOptions } from 'vm';
import { AppService } from './app.service';
import { TareaDto } from './dto/tarea.dto';



@Controller('tarea')
export class AppController {
  constructor(private readonly appService: AppService) {}

  //Listar tarea con estado resulto
  @Get()
  listarTarea() {
    return this.appService.listarTarea();
  }

 
  //CREAR TAREAasxx
  @Post()
  createTarea(@Body()createTareaDto:TareaDto){
    return this.appService.createTarea(createTareaDto);
  }


  //pasar el parametro id para buscar 
  @Get('/:id')
  buscarTarea(@Param('id') id:string){
    return this.appService.buscarTarea(id);
  }

  //modificar estado resuelto no resuelto
  @Post('/:id')
  actualizarTarea(@Param('id') id:string, @Body('estado') estado:boolean){
    return this.appService.actualizarEstado(id,estado)
  }


  
}
