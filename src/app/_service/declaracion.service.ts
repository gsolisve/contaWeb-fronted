import { Injectable } from '@angular/core';
import { Host } from '../_shared/var.constant';
import { HttpClient } from '@angular/common/http';
import { Declaracion } from '../_model/declaracion';
import { ActivatedRoute, Router } from '@angular/router';

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
}
