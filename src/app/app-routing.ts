import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestorComponent } from './gestor/gestor.component';
import { ClienteComponent } from './cliente/cliente.component';
import { MensajeComponent } from './mensaje/mensaje.component';
import { TransferenciaComponent } from './transferencia/transferencia.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'gestores', component: GestorComponent },
    { path: 'clientes', component: ClienteComponent },
    { path: 'mensajes', component: MensajeComponent },
    { path: 'transferencias', component: TransferenciaComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
