import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Cliente } from 'src/app/_model/cliente';
import { ClienteService } from 'src/app/_service/cliente.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-cliente-edicion',
  templateUrl: './cliente-edicion.component.html',
  styleUrls: ['./cliente-edicion.component.css']
})
export class ClienteEdicionComponent implements OnInit {
  
  idCliente : number;
  edicion: boolean = false;
  cliente : Cliente;
  fechaDeclaracion : Date;
  form:FormGroup;
  constructor(private clienteService:ClienteService, private route:ActivatedRoute,public router:Router) { 
    this.cliente = new Cliente();
    this.form = new  FormGroup({
      'ruc' : new FormControl('',[Validators.required,Validators.minLength(9)]),
      'razonSocial' : new FormControl(''),
      'nombreComercial': new FormControl(''),
      'direccion': new FormControl(''),
      'celular': new FormControl('',[Validators.required,Validators.minLength(9)]),
      'correo':new FormControl('',[Validators.required,Validators.email]),
      'nombresContacto':new FormControl(''),
      'dni': new FormControl(''),
      'celularContacto' : new FormControl('',[Validators.minLength(9)]),
      'correoContacto': new FormControl('',[Validators.email])
          //this.ruc = new FormControl('',[Validators.maxLength(11)]);
    //this.ruc = new FormControl('',[Validators.required]);//,Validators.minLength(11)
    
    });
  }

  getErrorMessageRuc(){ 
    return this.form.get('ruc').hasError('required') ? 'Debe ingresar el campo RUC' : 
    this.ruc.hasError('minlength')? 'El campo RUC debe tener 11 dígitos':'';
  }
  getErrorMessageCelular(){
    if(this.form.get('celular').hasError('minlength') || this.form.get('celularContacto').hasError('minlength')){
      return 'El número celular debe contener 9 dígitos';
    }
  }

  getErrorMessageEmail(){
    if(this.form.get('correo').hasError('minlength') || this.form.get('correoContacto').hasError('minlength')){
      return 'El número celular debe contener 9 dígitos';
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      this.idCliente = params['id'];
      console.log("id Cliente : " + this.idCliente);
      this.edicion = params['id'] != null;
      if(this.edicion){
        this.initForm();
      }
    });
    this.fechaDeclaracion = new Date();
    this.fechaDeclaracion.setFullYear(0);
    this.fechaDeclaracion.setDate(0);
    this.fechaDeclaracion.setMonth(0);
  }

  initForm(){
      this.clienteService.getClienteById(this.idCliente).subscribe(data=>{
        console.log(this.idCliente);
        console.log("data"+ JSON.stringify(data));
        console.log(data);
       /*
        this.form.get('ruc').setValue(data.ruc);
        this.form.get('razonSocial').setValue(data.razonSocial);
        this.form.get('nombreComercial').setValue(data.nombreComercial);
        this.form.get('direccion').setValue(data.direccion);
        this.form.get('correo').setValue(data.correo);
        this.form.get('nombresContacto').setValue(data.nombresApellidos);
        this.form.get('celularContacto').setValue(data.celularContacto);
        this.form.get('correoContacto').setValue(data.correoContacto);*/
        this.form = new  FormGroup({
          'ruc' : new FormControl(data.ruc,[Validators.required,Validators.minLength(9)]),
          'razonSocial' : new FormControl(data.razonSocial),
          'nombreComercial': new FormControl(data.nombreComercial),
          'direccion': new FormControl(data.direccion),
          'celular': new FormControl(data.celular,[Validators.required,Validators.minLength(9)]),
          'correo':new FormControl(data.correo,[Validators.required,Validators.email]),
          'nombresContacto':new FormControl(data.nombresApellidos),
          'dni': new FormControl(data.dni),
          'celularContacto' : new FormControl(data.celularContacto,[Validators.minLength(9)]),
          'correoContacto': new FormControl(data.correoContacto,[Validators.email])
        
        });
      });
  }


  get ruc(){return this.form.get('ruc')} 
  get celular(){return this.form.get('celular')};
  get celularContacto(){return this.form.get('celularConctacto')};
  get correo(){return this.form.get('correo')};
  get correoContacto(){return this.form.get('correoContacto')};
  get dni(){return this.form.get('dni')};

  cancelar(){
    this.router.navigate(['cliente']);
  }

  operar(){
    this.cliente.idCliente = this.form.value['id'];
    this.cliente.nombreComercial = this.form.value['nombreComercial'];
    this.cliente.razonSocial = this.form.value['razonSocial'];
    this.cliente.ruc = this.form.value['ruc'];
    this.cliente.direccion = this.form.value['direccion'];
    this.cliente.celular = this.form.value['celular'];
    this.cliente.correo = this.form.value['correo'];
    this.cliente.nombresApellidos = this.form.value['nombresContacto'];
    this.cliente.dni = this.form.value['dni'];
    this.cliente.celularContacto = this.form.value['celularContacto'];
    this.cliente.correoContacto = this.form.value['correoContacto'];
    this.cliente.fechaDeclaracion = this.fechaDeclaracion;
    console.log(this.cliente);
    if(this.cliente != null && this.idCliente>0){
      //Actualizar o modificar
      this.cliente.idCliente = this.idCliente;
      
      this.clienteService.modificar(this.cliente).subscribe(data=>{
          if(data == 1){
            this.clienteService.getListarClientes().subscribe(data =>{
              this.clienteService.clienteCambio.next(data);
              this.clienteService.mensaje.next("Se modificó exitosamente");
            });
            console.log("Se modificó exitosamente");
          }else{
            this.clienteService.mensaje.next("No se pudo modificar el cliente")
            console.log("Algo salio mal");
          }
      });
    }else{
      console.log(this.cliente);
      this.clienteService.registrar(this.cliente).subscribe(data=>{
        if(data === 1){
          this.clienteService.getListarClientes().subscribe(data =>{
            this.clienteService.clienteCambio.next(data);
            this.clienteService.mensaje.next("Se registró exitosamente");
          });
          console.log("Se registro exitosamente");
        }else{
          this.clienteService.mensaje.next("No se pudo registar el cliente");
          console.log("Vaya algo salio mal :C");
        }
      });
      console.log("ID:" + this.cliente.idCliente);
    }
  }

}
