import { IsNotEmpty } from "class-validator";


export class TareaDto{

    id: string;

    @IsNotEmpty()
    nombre: string;

    
    estado: boolean;

    @IsNotEmpty()
    descripcion: string;
}