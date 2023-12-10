import { Component, OnInit } from '@angular/core';
import { TransferenciaService } from '../transferencia.service';
import { Transferencia } from './transferencia.model';
import { HttpClient } from '@angular/common/http';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';
import { MatDialog } from '@angular/material/dialog';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente/cliente.model';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})

export class TransferenciaComponent implements OnInit {

  transferencias: Transferencia[] = [];
  clientes: Cliente[] = [];
  nuevaTransferencia: Transferencia = new Transferencia(0, {} as any, {} as any, 0, new Date(), "");
  transferenciaSeleccionada: Transferencia | null = null;

  formularioActualizar=false;

  constructor(private clienteService: ClienteService , private http: HttpClient, private transferenciaService: TransferenciaService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.transferenciaService.obtenerTransferencia().subscribe(datos =>{
      console.log(datos);
      this.transferencias = datos;
      this.transferenciaSeleccionada= null;
    });
    this.clienteService.obtenerClientes().subscribe(datos =>{
      this.clientes = datos;
    })
  }

  obtenerPorId(id: number): void{
    this.transferenciaService.obtenerTransferenciaPorId(id).subscribe(datos =>{
      console.log(datos);
      this.transferencias = datos;
    })
  }

  obtenerPorRemitente(remitente: String): void{
    this.transferenciaService.obtenerTransferenciaPorRemitente(remitente).subscribe(datos =>{
      console.log(datos);
      this.transferencias = datos;
    })
  }

  obtenerPorDestinatario(destinatario: String): void{
    this.transferenciaService.obtenerTransferenciaPorDestinatario(destinatario).subscribe(datos =>{
      console.log(datos);
      this.transferencias = datos;
    })
  }

  insertarTransferencia(): void{
    this.transferenciaService.crearTransferencia(this.nuevaTransferencia).subscribe(datos =>{
      this.transferenciaService.obtenerTransferencia().subscribe(nuevosDatos => {
        this.transferencias = nuevosDatos;
        this.nuevaTransferencia = new Transferencia(0, {} as any, {} as any, 0, new Date(), "");
        alert("Transferencia enviada con éxito!");
      })
    });
  }

  eliminarTransferencia(id: number): void{
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      panelClass: 'dialogo',
      data: { titulo: '¿Estas seguro de eliminar una transferencia?', mensaje: 'Los datos no se podrán recuperar.' }
    });
    dialogRef.afterClosed().subscribe(resultado =>{
      if(resultado){
        this.transferenciaService.eliminarTransferencia(id).subscribe(()=>{
          this.transferenciaService.notificarEliminacion();
          this.transferenciaService.obtenerTransferencia().subscribe(nuevosDatos => {
            this.transferencias = nuevosDatos;
          })
        })
      }
    })
  }

  mostrarFormulario(transferencia: Transferencia): void{  
    this.formularioActualizar=true;
    this.transferenciaSeleccionada = transferencia;
  }



}

