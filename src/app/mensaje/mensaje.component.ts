import { Component, OnInit } from '@angular/core';
import { MensajeService } from '../mensaje.service';
import { Mensaje } from './mensaje.model';
import { HttpClient } from '@angular/common/http';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';
import { MatDialog } from '@angular/material/dialog';

import { ConversionService } from '../conversion-json.service';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit {
  
  mensajes: Mensaje[] = [];
  nuevoMensaje: Mensaje = new Mensaje(0, "", "", "", new Date());
  mensajeSeleccionada: Mensaje | null = null;

  mensJson: string='';
  mostrarConvertidosAJson=false;
  mostrarConvertidosDesdeJson=false;

  formularioActualizar=false;

  constructor(private http: HttpClient, private mensajeService: MensajeService, private conversionService: ConversionService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.mensajeService.obtenerMensajes().subscribe(datos =>{
      console.log(datos);
      this.mensajes = datos;
      this.mensajeSeleccionada= null;
    })
  }

  insertarMensaje(): void{
    this.mensajeService.crearMensaje(this.nuevoMensaje).subscribe(datos =>{
      this.mensajeService.obtenerMensajes().subscribe(nuevosDatos => {
        this.mensajes = nuevosDatos;
        this.nuevoMensaje = new Mensaje(0, "", "", "", new Date());
        alert("¡Mensaje enviado con éxito!");
      })
    });
  }

  eliminarMensaje(id: number): void{
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      panelClass: 'dialogo',
      data: { titulo: 'Confirmación', mensaje: '¿Estas seguro de eliminar un mensaje? Los datos no se podrán recuperar.' }
    });
    dialogRef.afterClosed().subscribe(resultado =>{
      if(resultado){
        this.mensajeService.eliminarMensaje(id).subscribe(()=>{
          this.mensajeService.notificarEliminacion();
          this.mensajeService.obtenerMensajes().subscribe(nuevosDatos => {
            this.mensajes = nuevosDatos;
          })
        })
      }
    })
  }

  actualizarMensaje(): void {
    if (this.mensajeSeleccionada) {
      const cambios = {
        remitente: this.mensajeSeleccionada?.remitente,
        destinatario: this.mensajeSeleccionada?.destinatario,
        cantidad: this.mensajeSeleccionada?.mensaje,
      };
  
      this.mensajeService.actualizarMensaje(this.mensajeSeleccionada?.id || 0, cambios).subscribe(gestorActualizado => {
        console.log("Mensaje actualizado: ", gestorActualizado);
  
        this.mensajeService.obtenerMensajes().subscribe(nuevosDatos => {
          this.mensajes = nuevosDatos;
          this.formularioActualizar = false;
        });
      },
      error => {
        console.error("Error al actualizar el mensaje: ", error);
      });
    }
  }

  mostrarFormulario(mensaje: Mensaje): void{  
    this.formularioActualizar=true;
    this.mensajeSeleccionada = mensaje;
  }

  convertirDesdeJson(): void {
    if (this.mensJson) {
      const arrayGest: Mensaje[] = this.conversionService.convertirDesdeJson(this.mensJson);
      this.mensajes = arrayGest;
      this.mostrarConvertidosDesdeJson = true;
    }
  }

  convertirMensajesAJson(): void {
    if (this.mensajes.length > 0) {
      this.mensJson = this.conversionService.convertirMensajesAJson(this.mensajes);
      this.mostrarConvertidosAJson=true;
    }
  }

  ocultarConvertidos(): void {
    this.mostrarConvertidosAJson=false;
    this.mostrarConvertidosDesdeJson = false;
  }

  ocultarConvertidosDesdeJson(): void {
    this.mostrarConvertidosDesdeJson = false;
  }

}

