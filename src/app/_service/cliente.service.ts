import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../_model/cliente';
import { Host } from '../_shared/var.constant';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  url : String = `${Host}/cliente`;
  clienteCambio = new Subject<Cliente[]>();
  mensaje = new Subject<string>();
  constructor(private http:HttpClient) { }

  registrar(cliente:Cliente){
    return this.http.post<Number>(`${this.url}/registrar`,cliente);
   /* let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(`${this.url}/registrar`, paciente, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });*/
  }

  modificar(cliente:Cliente){
    return this.http.put(`${this.url}/modificar`,cliente,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    });
  }
/*
  modificar1(paciente: Paciente) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.put(`${this.url}/actualizar`, paciente, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
*/
  getListarClientes(){
    return this.http.get<Cliente[]>(`${this.url}/listar`);
  }
  getListarClientesPageable(p:number,s:number){
    return this.http.get<Cliente[]>(`${this.url}/listarPageable?page=${p}&size=${s}`);
  }

  getClienteById(idCliente : number){
    return this.http.get<Cliente>(`${this.url}/listar/${idCliente}`);
  }

  deleteClienteByID(idCliente: number){
    return this.http.delete(`${this.url}/eliminar/${idCliente}`);
  }
}
