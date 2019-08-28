import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { DeclaracionComponent } from './pages/declaracion/declaracion.component';
import { ClienteEdicionComponent } from './pages/cliente/cliente-edicion/cliente-edicion.component';

const routes: Routes = [
  {path:'cliente',component:ClienteComponent, children:
  [{path:'nuevoCliente',component:ClienteEdicionComponent},{path:'editar/:id',component:ClienteEdicionComponent}]},
  {path:'declaracion',component:DeclaracionComponent},
  {path:'reporte',component:ReporteComponent}

 // {path:'',redirectTo:'/cliente',pathMatch:'full'},  {path:'**',component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
