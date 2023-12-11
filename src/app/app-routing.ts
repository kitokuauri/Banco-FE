import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestorComponent } from './gestor/gestor.component';
import { ClienteComponent } from './cliente/cliente.component';
import { MensajeComponent } from './mensaje/mensaje.component';
import { TransferenciaComponent } from './transferencia/transferencia.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AvisoLegalComponent } from './aviso-legal/aviso-legal.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'gestores', component: GestorComponent },
    { path: 'clientes', component: ClienteComponent },
    { path: 'mensajes', component: MensajeComponent },
    { path: 'transferencias', component: TransferenciaComponent },
    { path: 'avisolegal', component: AvisoLegalComponent },
    { path: 'quienes-somos', component: QuienesSomosComponent},
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
