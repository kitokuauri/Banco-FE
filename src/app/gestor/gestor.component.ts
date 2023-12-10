import { Component, OnInit } from '@angular/core';
import { GestorService } from '../gestor.service';
import { Gestor } from './gestor.model';
import { HttpClient } from '@angular/common/http';
import { subscribeOn } from 'rxjs';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';
import { MatDialog } from '@angular/material/dialog';
declare var $: any;

@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
  styleUrls: ['./gestor.component.css']
})

export class GestorComponent implements OnInit {
  

  gestores: Gestor[] = [];
  nuevoGestor: Gestor = new Gestor(0, "", "", 18, "", 1200);
  gestorSeleccionado: Gestor | null = null;

  formularioActualizar=false;

  constructor(private gestorService: GestorService, private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.gestorService.obtenerGestores().subscribe(datos =>{
      console.log(datos);
      this.gestores = datos;
      this.gestorSeleccionado= null;
    })
  }

  insertarGestor(): void{
    this.gestorService.crearGestor(this.nuevoGestor).subscribe(datos =>{
      this.gestorService.obtenerGestores().subscribe(nuevosDatos => {
        this.gestores = nuevosDatos;
        this.nuevoGestor = new Gestor(0, "", "", 18, "", 1200);
      })
    });
  }

  eliminarGestor(id: number): void{
    const that = this;
      $.confirm({
        title: '¿Estas seguro de eliminar un gestor?',
        content: 'Los datos no se podrán recuperar.',
        type: 'green',
        buttons: {   
            ok: {
                text: "Aceptar",
                btnClass: 'btn-primary',
                keys: ['enter'],
                action: function(){
                  that.gestorService.eliminarGestor(id).subscribe(()=>{
                    that.gestorService.notificarEliminacion();
                    that.gestorService.obtenerGestores().subscribe(nuevosDatos => {
                      that.gestores = nuevosDatos;
                    })
                  })
                }
            },
            cancel: function(){
              
            }
        }
    });
  }

  actualizarGestor(): void {
    if (this.gestorSeleccionado) {
      const cambios = {
        nombre: this.gestorSeleccionado?.nombre,
        apellido: this.gestorSeleccionado?.apellido,
        edad: this.gestorSeleccionado?.edad,
        email: this.gestorSeleccionado?.email,
      };
  
      this.gestorService.actualizarGestor(this.gestorSeleccionado?.id || 0, cambios).subscribe(gestorActualizado => {
        this.gestorService.obtenerGestores().subscribe(nuevosDatos => {
          this.gestores = nuevosDatos;
          this.formularioActualizar = false;
        });
      },
      error => {
        console.error("Error al actualizar el gestor: ", error);
      });
    }
  }

  mostrarFormulario(gestor: Gestor): void{  
    this.formularioActualizar=true;
    this.gestorSeleccionado = gestor;
  }

  ocultarFormulario(): void{
    this.formularioActualizar=false;
  }



}

