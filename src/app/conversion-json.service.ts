import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConversionService {
  convertirDesdeJson(json: string): any {
    try {
      return JSON.parse(json);
    } catch (error) {
      console.error('Error al convertir desde JSON:', error);
      return null;
    }
  }

  //Gestores
  convertirGesotresAJson(gestores: any[]): string {
    try {
      return JSON.stringify(gestores) || '';
    } catch (error) {
      console.error('Error al convertir a JSON:', error);
      return '';
    }
  }

  //Clientes
  convertirClientesAJson(clientes: any): string {
    try {
      return JSON.stringify(clientes) || '';
    } catch (error) {
      console.error('Error al convertir a JSON:', error);
      return '';
    }
  }

  //Mensajes
  convertirMensajesAJson(mensajes: any[]): string {
    try {
      return JSON.stringify(mensajes) || '';
    } catch (error) {
      console.error('Error al convertir a JSON:', error);
      return '';
    }
  }

  //Transferencias
  convertirTransAJson(transferencias: any[]): string {
    try {
      return JSON.stringify(transferencias) || '';
    } catch (error) {
      console.error('Error al convertir a JSON:', error);
      return '';
    }
  }

  
}
