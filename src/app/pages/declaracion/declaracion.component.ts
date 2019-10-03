import { Component, OnInit, ViewChild } from '@angular/core';
import { Declaracion } from 'src/app/_model/declaracion';
import { MatTableDataSource, MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import { DeclaracionService } from 'src/app/_service/declaracion.service';
import { Cliente } from 'src/app/_model/cliente';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ClienteService } from 'src/app/_service/cliente.service';

@Component({
  selector: 'app-declaracion',
  templateUrl: './declaracion.component.html',
  styleUrls: ['./declaracion.component.css']
})
export class DeclaracionComponent implements OnInit {
  listaDeclaracion : Declaracion[] = [];
  displayedColumns: String[] = ["cliente","fechaDeclaracion","montoVentas","IGVVenta","montoCompras","IGVCompra","IGVPagar","impuestoRenta","impuestoRentaPagar","opciones"];
  dataSource : MatTableDataSource<Declaracion>;
  cantidad : number;
  idCliente : number;
  cliente : Cliente;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  constructor(private clienteService: ClienteService,private declaracionService: DeclaracionService, public snackBar: MatSnackBar,private route:ActivatedRoute,public router:Router) { }

  ngOnInit() {

    
    this.route.params.subscribe((params:Params)=>{
      this.idCliente = params['id'];
    })
    this.clienteService.getClienteById(this.idCliente).subscribe(
      data=>{
        this.cliente = JSON.parse(JSON.stringify(data)).content;
        
        //
        this.declaracionService.getListarDeclaracionByClientePageable(0,5,this.idCliente).subscribe(
          data => {
            let declaraciones = JSON.parse(JSON.stringify(data)).content;
            this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
            this.dataSource = new MatTableDataSource(declaraciones);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            console.log(JSON.parse(JSON.stringify(data)).content);
          }
        )
      }
    )
    
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
