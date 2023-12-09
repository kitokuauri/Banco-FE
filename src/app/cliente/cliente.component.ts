import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente } from './cliente.model';
import { HttpClient } from '@angular/common/http';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';
import { MatDialog } from '@angular/material/dialog';
import { Gestor } from '../gestor/gestor.model';
import { GestorService } from '../gestor.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  
  clientes: Cliente[] = [];
  gestores: Gestor[] = [];
  nuevoCliente: Cliente = new Cliente(0, 0, "", "", "");
  clienteSeleccionado: Cliente | null = null;

  formularioActualizar=false;

  constructor( private gestorService: GestorService, private http: HttpClient, private clienteService: ClienteService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.clienteService.obtenerClientes().subscribe(datos =>{
      console.log(datos);
      this.clientes = datos;
      this.clienteSeleccionado= null;
    });
    this.gestorService.obtenerGestores().subscribe(datos =>{
      this.gestores = datos;
    })
  }

  insertarCliente(): void{
    this.clienteService.crearCliente(this.nuevoCliente).subscribe(datos =>{
      this.clienteService.obtenerClientes().subscribe(nuevosDatos => {
        this.clientes = nuevosDatos;
        this.nuevoCliente = new Cliente(0, 0, "", "", "");
      })
    });
  }

  eliminarCliente(id: number): void{
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      panelClass: 'dialogo',
      data: { titulo: 'Confirmación', mensaje: '¿Estas seguro de eliminar un cliente? Los datos no se podrán recuperar.' }
    });
    dialogRef.afterClosed().subscribe(resultado =>{
      if(resultado){
        this.clienteService.eliminarCliente(id).subscribe(()=>{
          this.clienteService.notificarEliminacion();
          this.clienteService.obtenerClientes().subscribe(nuevosDatos => {
            this.clientes = nuevosDatos;
          })
        })
      }
    })
  }

  actualizarCliente(): void {
    if (this.clienteSeleccionado) {
      const cambios = {
        nombre: this.clienteSeleccionado?.nombre,
        apellido: this.clienteSeleccionado?.apellido,
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

  ocultarFormulario(): void{
    this.formularioActualizar=false;
  }


}

