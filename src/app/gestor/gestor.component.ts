import { Component, OnInit } from '@angular/core';
import { GestorService } from '../gestor.service';
import { Gestor } from './gestor.model';
import { ConversionService } from '../conversion-json.service';
import { HttpClient } from '@angular/common/http';
import { subscribeOn } from 'rxjs';


@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
  styleUrls: ['./gestor.component.css']
})

export class GestorComponent implements OnInit {

  gestores: Gestor[] = [];
  nuevoGestor: Gestor = new Gestor(0, "", "", 18, "", 1200);
  gestorSeleccionado: Gestor | null = null;

  gestoresJson: string='';
  mostrarConvertidosAJson=false;
  mostrarConvertidosDesdeJson=false;

  formularioActualizar=false;

  constructor(private gestorService: GestorService, private conversionService: ConversionService, private http: HttpClient) {}

  ngOnInit(): void {
    this.gestorService.obtenerGestores().subscribe(datos =>{
      console.log(datos);
      this.gestores = datos;
      this.gestorSeleccionado= null;
    })
  }

  insertarGestor(){
    this.gestorService.crearGestor(this.nuevoGestor).subscribe(datos =>{
      this.gestorService.obtenerGestores().subscribe(nuevosDatos => {
        this.gestores = nuevosDatos;
        this.nuevoGestor = new Gestor(0, "", "", 18, "", 1200);
      })
    });
  }

  eliminarGestor(id: number){
    this.gestorService.eliminarGestor(id).subscribe(()=>{
      this.gestorService.notificarEliminacion();
      this.gestorService.obtenerGestores().subscribe(nuevosDatos => {
        this.gestores = nuevosDatos;
      })
    })
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
        console.log("Gestor actualizado: ", gestorActualizado);
  
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

    convertirDesdeJson(): void {
      if (this.gestoresJson) {
        const arrayGest: Gestor[] = this.conversionService.convertirDesdeJson(this.gestoresJson);
        this.gestores = arrayGest;
        this.mostrarConvertidosDesdeJson = true;
      }
    }

    convertirGestoresAJson(): void {
      if (this.gestores.length > 0) {
        this.gestoresJson = this.conversionService.convertirGesotresAJson(this.gestores);
      }
      this.mostrarConvertidosAJson=true;
    }

    ocultarConvertidos(): void {
      this.mostrarConvertidosAJson=false;
      this.mostrarConvertidosDesdeJson = false;
    }

    ocultarConvertidosDesdeJson(): void {
      this.mostrarConvertidosDesdeJson = false;
    }




}

