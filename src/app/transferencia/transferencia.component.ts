import { Component, OnInit } from '@angular/core';
import { TransferenciaService } from '../transferencia.service';
import { Transferencia } from './transferencia.model';
import { ConversionService } from '../conversion-json.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})

export class TransferenciaComponent implements OnInit {

  transferencias: Transferencia[] = [];
  nuevaTransferencia: Transferencia = new Transferencia(0, "", "", 0);
  transferenciaSeleccionada: Transferencia | null = null;

  transJson: string='';
  mostrarConvertidosAJson = false;
  mostrarConvertidosDesdeJson=false;

  formularioActualizar=false;

  constructor(private http: HttpClient, private transferenciaService: TransferenciaService, private conversionService: ConversionService) {}

  ngOnInit(): void {
    this.transferenciaService.obtenerTransferencia().subscribe(datos =>{
      console.log(datos);
      this.transferencias = datos;
      this.transferenciaSeleccionada= null;
    })
  }

  insertarTransferencia(){
    this.transferenciaService.crearTransferencia(this.nuevaTransferencia).subscribe(datos =>{
      this.transferenciaService.obtenerTransferencia().subscribe(nuevosDatos => {
        this.transferencias = nuevosDatos;
        this.nuevaTransferencia = new Transferencia(0, "", "", 0);
      })
    });
  }

  eliminarTransferencia(id: number){
    this.transferenciaService.eliminarTransferencia(id).subscribe(()=>{
      this.transferenciaService.notificarEliminacion();
      this.transferenciaService.obtenerTransferencia().subscribe(nuevosDatos => {
        this.transferencias = nuevosDatos;
      })
    })
  }

  actualizarTransferencia(): void {
    if (this.transferenciaSeleccionada) {
      const cambios = {
        remitente: this.transferenciaSeleccionada?.remitente,
        destinatario: this.transferenciaSeleccionada?.destinatario,
        cantidad: this.transferenciaSeleccionada?.cantidad,
      };
  
      this.transferenciaService.actualizarTransferencia(this.transferenciaSeleccionada?.id || 0, cambios).subscribe(gestorActualizado => {
        console.log("Transferencia actualizada: ", gestorActualizado);
  
        this.transferenciaService.obtenerTransferencia().subscribe(nuevosDatos => {
          this.transferencias = nuevosDatos;
          this.formularioActualizar = false;
        });
      },
      error => {
        console.error("Error al actualizar la transferencia: ", error);
      });
    }
  }

  mostrarFormulario(transferencia: Transferencia): void{  
    this.formularioActualizar=true;
    this.transferenciaSeleccionada = transferencia;
  }

  convertirDesdeJson(): void {
    if (this.transJson) {
      const arrayGest: Transferencia[] = this.conversionService.convertirDesdeJson(this.transJson);
      this.transferencias = arrayGest;
      this.mostrarConvertidosDesdeJson = true;
    }
  }

  convertirTransAJson(): void {
      this.transJson = this.conversionService.convertirTransAJson(this.transferencias);
      this.mostrarConvertidosAJson = true;
  }

  ocultarConvertidos(): void {
    this.mostrarConvertidosAJson = false;
    this.mostrarConvertidosDesdeJson = false;
  }

  ocultarConvertidosDesdeJson(): void {
    this.mostrarConvertidosDesdeJson = false;
  }

}

