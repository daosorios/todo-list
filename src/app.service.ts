import { Injectable } from "@nestjs/common";
import { RespuestaTareaDto } from "./dto/respuesta.dto";
import { TareaDto } from "./dto/tarea.dto";
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from "@nestjs/common";



@Injectable()
export class AppService {

  //lista de las tareas creadas
  private tareas: TareaDto[] = [];


  createTarea(createTareaDto: TareaDto) {
    createTareaDto.id = uuidv4();
    createTareaDto.estado = false;
    this.tareas.push(createTareaDto);
    const respuesta = {
      estado: 'Tarea creado exitosamente',
      id: createTareaDto.id
    }
    return respuesta;
  }


  listarTarea() {
    //lista de tareas temporal para el estado resuelto o no resuelto
    const nuevaTareas: RespuestaTareaDto[] = [];

    this.tareas.map(resp => {

      const tarea = new RespuestaTareaDto()
      //por cada tarea se crea un nuevo temporal
      tarea.id = resp.id
      tarea.nombre = resp.nombre
      tarea.descripcion = resp.descripcion
      if (resp.estado) {
        tarea.estado = 'Resuelto'
      } else {
        tarea.estado = 'No Resuelto'
      }
      //se añade la tarea temporal 
      nuevaTareas.push(tarea)
    })

    return nuevaTareas;

  }

  buscarTarea(id: string): RespuestaTareaDto {
    //buscando tarea
    const tarea = this.tareas.find(tarea => tarea.id === id);

    //validacion 
    if (!tarea) {
      throw new NotFoundException('La tarea no existe');
    }
    //respuesta nueva
    const tareaRes = new RespuestaTareaDto()

    tareaRes.id = tarea.id
    tareaRes.nombre = tarea.nombre
    tareaRes.descripcion = tarea.descripcion
    if (tarea.estado) {
      tareaRes.estado = 'Resuelto'
    } else {
      tareaRes.estado = 'No Resuelto'
    }

    return tareaRes;
  }

  actualizarEstado(id: string, estado: boolean) {
    const resul = this.tareas.find(tarea => tarea.id === id);

    //validacion
    if (!resul) {
      throw new NotFoundException('La tarea no existe');
    }
    //cambia estado
    resul.estado = estado

    const respuesta = {
      estado: 'Estado de la tarea actualizado '
    }
    return respuesta;
  }


}
