import { Declaracion } from "./declaracion";

export class Archivo {
    idArchivo : Number;
    archivo   : ArrayBuffer;
    nombreArchivo: String;
    declaracion : Declaracion;
}