import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Declaracion } from 'src/app/_model/declaracion';
import { ClienteService } from 'src/app/_service/cliente.service';
import { DeclaracionService } from 'src/app/_service/declaracion.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Cliente } from 'src/app/_model/cliente';

@Component({
  selector: 'app-declaracion-edicion',
  templateUrl: './declaracion-edicion.component.html',
  styleUrls: ['./declaracion-edicion.component.css']
})
export class DeclaracionEdicionComponent implements OnInit {

  constructor(public dialogRef : MatDialogRef<DeclaracionEdicionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Declaracion,private declaracionService : DeclaracionService,
    private clienteService : ClienteService) { }
    form:FormGroup;
    selectedFiles : FileList;
    currentFileUpload : File;
    declaracion : Declaracion;
  ngOnInit() {
    this.declaracion = new Declaracion();
    this.declaracion.cliente = new Cliente();
    this.form = new FormGroup({
      'fechaDeclaracion' :new FormControl(''),
      'montoVentas' : new FormControl(''),
      'igvVentas' : new FormControl(''),
      'montoCompras' : new FormControl(''),
      'igvCompras' : new FormControl(''),
      'igvPagar' : new FormControl(''),
      'impuestoRenta' : new FormControl(''),
      'impuestoRentaPagar' : new FormControl('')
    });
  }

  cancelar(){
    this.dialogRef.close();
  }

  selectFile(event){
    this.selectedFiles = event.target.files;
  }

  operar(){
    this.declaracion.fechaDeclaracion = this.form.value['fechaDeclaracion'];
    this.declaracion.montoVentas = this.form.value['montoVentas'];
    this.declaracion.igvVentas = this.form.value['igvVentas'];
    this.declaracion.montoCompras =this.form.value['montoCompras'];
    this.declaracion.igvCompras = this.form.value['igvCompras'];
    this.declaracion.igvPagar = this.form.value['igvPagar'];
    this.declaracion.impuestoRenta = this.form.value['impuestoRenta'];
    this.declaracion.impuestoRentaPagar = this.form.value['impuestoRentaPagar'];
    this.declaracion.cliente.idCliente = 5;
    //this.declaracion.listaArchivos[0].nombreArchivo = this.currentFileUpload.name;
    //this.declaracion.listaArchivos[0].archivo = this.currentFileUpload;
    this.declaracionService.insertDeclaracion(this.declaracion).subscribe(data =>{
        this.declaracion.listaArchivos[0].declaracion = data;
        
    });
  }

}
