import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/_model/cliente';
import { ClienteService } from 'src/app/_service/cliente.service';
import {MatTableDataSource, MatPaginator, MatSort, MatSnackBar} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  listaCliente : Cliente[] = [];
  displayedColumns: String[] = ['ruc','nombreComercial','fechaDeclaracion','nombresApellidos','opciones'];
  dataSource : MatTableDataSource<Cliente>;
  cantidad  : number;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  constructor(private clienteService:ClienteService,public snackBar: MatSnackBar) { }
  
  ngOnInit() {


    this.clienteService.clienteCambio.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.clienteService.mensaje.subscribe(data =>{
        this.snackBar.open(data,null,{
          duration:2000,
        });
    });
    this.clienteService.getListarClientesPageable(0,5).subscribe(
      data => {
        let clientes = JSON.parse(JSON.stringify(data)).content;
        this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
        this.dataSource = new MatTableDataSource(clientes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

   mostrarMas(e){
    this.clienteService.getListarClientesPageable(e.pageIndex,e.pageSize).subscribe(
      data => {
        let clientes = JSON.parse(JSON.stringify(data)).content;
        this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
        this.dataSource = new MatTableDataSource(clientes);
       // this.dataSource.paginator = this.paginator;
       // this.dataSource.sort = this.sort;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminar(codigoCliente){
    console.log(codigoCliente);
    this.clienteService.deleteClienteByID(codigoCliente).subscribe(
      data => {
          if(data == 1){
            this.clienteService.getListarClientes().subscribe(data =>{
              this.clienteService.clienteCambio.next(data);
              this.clienteService.mensaje.next("Se elimino correctamente");
           
            });
          }else{
             this.clienteService.mensaje.next("Error al eliminar  cliente");
          }
      }
    );
  }
}
