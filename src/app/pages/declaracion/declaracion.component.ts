import { Component, OnInit, ViewChild } from '@angular/core';
import { Declaracion } from 'src/app/_model/declaracion';
import { MatTableDataSource, MatSnackBar, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DeclaracionService } from 'src/app/_service/declaracion.service';
import { Cliente } from 'src/app/_model/cliente';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ClienteService } from 'src/app/_service/cliente.service';
import { DeclaracionEdicionComponent } from './declaracion-edicion/declaracion-edicion/declaracion-edicion.component';

@Component({
  selector: 'app-declaracion',
  templateUrl: './declaracion.component.html',
  styleUrls: ['./declaracion.component.css']
})
export class DeclaracionComponent implements OnInit {
  listaDeclaracion : Declaracion[] = [];
  displayedColumns: String[] = ["fechaDeclaracion","montoVentas","IGVVenta","montoCompras","IGVCompra","IGVPagar","impuestoRenta","impuestoRentaPagar","opciones"];
  dataSource : MatTableDataSource<Declaracion>;
  cantidad : number;
  idCliente : number;
  cliente : Cliente = new Cliente();
  selectedFiles : FileList;
  currentFileUpload : File;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  constructor(private clienteService: ClienteService,private declaracionService: DeclaracionService, public snackBar: MatSnackBar,private route:ActivatedRoute,public router:Router, public dialog: MatDialog) {
    this.route.params.subscribe((params:Params)=>{
      this.idCliente = params['id'];
    })
    this.clienteService.getClienteById(this.idCliente).subscribe(
      data=>{
        console.log(data);
        this.cliente = data;
        
        //
        this.declaracionService.getListarDeclaracionByCliente(this.idCliente).subscribe(
          data => {
            /*let declaraciones = JSON.parse(JSON.stringify(data)).content;
            this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
            this.dataSource = new MatTableDataSource(declaraciones);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;*/
            this.dataSource = new MatTableDataSource(data);
        
          }
        )
      }
    )
   
   }

  ngOnInit() {

    
   
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(declaracion :Declaracion) : void {
    let dec = declaracion != null ? declaracion : new Declaracion();
    let dialogRef = this.dialog.open(DeclaracionEdicionComponent,{
      width: '50%',
      data : dec
    })
  }
}
