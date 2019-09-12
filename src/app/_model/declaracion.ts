import { Cliente } from "./cliente";
import { Archivo } from "./archivo";

export class Declaracion{
    idDeclaracion    Number;
    cliente: Cliente;
    fechaDeclaracion : Date;
    montoVentas : Number;
    igvVentas   : Number;
    montoCompras : Number;
    igvCompras  : Number;
    igvPagar    : Number;
    impuestoRenta   : Number;
    impuestoRentaPagar  : Number;
    listaArchivos   : Array<Archivo>;
    estado  : boolean;


}