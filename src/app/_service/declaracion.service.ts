import { Injectable } from '@angular/core';
import { Host } from '../_shared/var.constant';
import { HttpClient } from '@angular/common/http';
import { Declaracion } from '../_model/declaracion';
import { ActivatedRoute, Router } from '@angular/router';
import { Archivo } from '../_model/archivo';

@Injectable({
  providedIn: 'root'
})
export class DeclaracionService {
  url : String = `${Host}/declaracion`;
  constructor(private http:HttpClient, private route:ActivatedRoute,public router:Router) { }
  getListarDeclaracion(){
    return this.http.get<Declaracion[]>(`${this.url}/listar`);
  }
  getListarDeclaracionByClientePageable(p:number,s:number,idCliente :number){
    return this.http.get<Declaracion[]>(`${this.url}/${idCliente}/listarPageable?page=${p}&size=${s}`);
  }

  getListarDeclaracionByCliente(idCliente:Number){
    return this.http.get<Declaracion[]>(`${this.url}/listar/clientes/${idCliente}`);
  }

  insertDeclaracion(declaracion: Declaracion){
   return this.http.post<Declaracion>(`${this.url}/registrar/`,declaracion);
  }

  insertArchivo(archivo : Archivo){
    return this.http.post<Number>(`${this.url}/registrarArchivo/`,archivo); 
  }
}
