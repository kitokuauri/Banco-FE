import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing';

import { AppComponent } from './app.component';
import { GestorComponent } from './gestor/gestor.component';
import { ClienteComponent } from './cliente/cliente.component';
import { MensajeComponent } from './mensaje/mensaje.component';
import { TransferenciaComponent } from './transferencia/transferencia.component';
import { GestorService } from './gestor.service';
import { ClienteService } from './cliente.service';
import { MensajeService } from './mensaje.service';
import { TransferenciaService } from './transferencia.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
import { SearchBarComponent } from './search-bar/search-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    GestorComponent,
    ClienteComponent,
    MensajeComponent,
    TransferenciaComponent,
    DashboardComponent,
    ConfirmacionComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgStyle,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    GestorService,
    ClienteService,
    MensajeService,
    TransferenciaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
