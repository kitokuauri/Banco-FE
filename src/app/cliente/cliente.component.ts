import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente } from './cliente.model';
import { HttpClient } from '@angular/common/http';

import { ConversionService } from '../conversion-json.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  
  clientes: Cliente[] = [];
  nuevoCliente: Cliente = new Cliente(0, "", "", 18, "");
  clienteSeleccionado: Cliente | null = null;

  clientesJson: string='';
  mostrarConvertidosAJson=false;
  mostrarConvertidosDesdeJson=false;

  formularioActualizar=false;

  constructor( private http: HttpClient, private clienteService: ClienteService, private conversionService: ConversionService) {}

  ngOnInit(): void {
    this.clienteService.obtenerClientes().subscribe(datos =>{
      console.log(datos);
      this.clientes = datos;
      this.clienteSeleccionado= null;
    })
  }

  insertarCliente(){
    this.clienteService.crearCliente(this.nuevoCliente).subscribe(datos =>{
      this.clienteService.obtenerClientes().subscribe(nuevosDatos => {
        this.clientes = nuevosDatos;
        this.nuevoCliente = new Cliente(0, "", "", 18, "");
      })
    });
  }

  eliminarCliente(id: number){
    this.clienteService.eliminarCliente(id).subscribe(()=>{
      this.clienteService.notificarEliminacion();
      this.clienteService.obtenerClientes().subscribe(nuevosDatos => {
        this.clientes = nuevosDatos;
      })
    })
  }

  actualizarCliente(): void {
    if (this.clienteSeleccionado) {
      const cambios = {
        nombre: this.clienteSeleccionado?.nombre,
        apellido: this.clienteSeleccionado?.apellido,
        edad: this.clienteSeleccionado?.edad,
        email: this.clienteSeleccionado?.email,
      };
  
      this.clienteService.actualizarCliente(this.clienteSeleccionado?.id || 0, cambios).subscribe(gestorActualizado => {
        console.log("Cliente actualizado: ", gestorActualizado);
  
        this.clienteService.obtenerClientes().subscribe(nuevosDatos => {
          this.clientes = nuevosDatos;
          this.formularioActualizar = false;
        });
      },
      error => {
        console.error("Error al actualizar el cliente: ", error);
      });
    }
  }

  mostrarFormulario(cliente: Cliente): void{  
    this.formularioActualizar=true;
    this.clienteSeleccionado = cliente;
  }

  convertirDesdeJson(): void {
    if (this.clientesJson) {
      const arrayGest: Cliente[] = this.conversionService.convertirDesdeJson(this.clientesJson);
      this.clientes = arrayGest;
      this.mostrarConvertidosDesdeJson = true;
    }
  }

  convertirClientesAJson(): void {
      this.clientesJson = this.conversionService.convertirClientesAJson(this.clientes);
      this.mostrarConvertidosAJson = true;
  }

  ocultarConvertidos(): void {
    this.mostrarConvertidosAJson=false;
    this.mostrarConvertidosDesdeJson = false;
  }

  ocultarConvertidosDesdeJson(): void {
    this.mostrarConvertidosDesdeJson = false;
  }

}

