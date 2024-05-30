import { PaisInterface } from "./pais.interface";

export default interface RepartidorInterface {
    id?: string,
    dni: string ,
    nombre: string,
    edad: number,
    capacidadTransporte: number,
    paisOrigen: PaisInterface,
    unidad: boolean
}