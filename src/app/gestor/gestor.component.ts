import { Component, OnInit } from '@angular/core';
import { GestorService } from '../gestor.service';
import { Gestor } from './gestor.model';
import { HttpClient } from '@angular/common/http';
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
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      panelClass: 'dialogo',
      data: { titulo: '¿Estas seguro de eliminar un gestor?', mensaje: 'Los datos no se podrán recuperar.' }
    });
    dialogRef.afterClosed().subscribe(resultado =>{
      if(resultado){
        this.gestorService.eliminarGestor(id).subscribe(()=>{
          this.gestorService.notificarEliminacion();
          this.gestorService.obtenerGestores().subscribe(nuevosDatos => {
            this.gestores = nuevosDatos;
          });
        }, error =>{
          if (error.status === 404){
            alert("El gestor seleccionado no se pudo eliminar. ¡Cuidado! Puede que aún tenga clientes asociados.")
          }
        })
      } 
    })
  }

  actualizarGestor(): void {
    if (this.gestorSeleccionado) {
      const cambios = {
        nombre: this.gestorSeleccionado?.nombre,
        apellido: this.gestorSeleccionado?.apellido,
        edad: this.gestorSeleccionado?.edad,
        email: this.gestorSeleccionado?.email,
        salario: this.gestorSeleccionado?.salario
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

