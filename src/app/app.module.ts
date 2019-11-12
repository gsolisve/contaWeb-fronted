import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MaterialModule } from './material/material.module';
import { DeclaracionComponent } from './pages/declaracion/declaracion.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { ClienteService } from './_service/cliente.service';
import { HttpClientModule }    from '@angular/common/http';
import { ClienteEdicionComponent } from './pages/cliente/cliente-edicion/cliente-edicion.component';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { DeclaracionEdicionComponent } from './pages/declaracion/declaracion-edicion/declaracion-edicion/declaracion-edicion.component';
@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    PageNotFoundComponent,
    DeclaracionComponent,
    ReporteComponent,
    ClienteEdicionComponent,
    DeclaracionEdicionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents:[
    DeclaracionEdicionComponent
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
