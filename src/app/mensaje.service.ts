import { Injectable } from '@angular/core';
import { Mensaje } from './mensaje/mensaje.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  private apiUrl = 'http://localhost:8080/mensaje';
  private mensajesSubject = new Subject<void>();

  constructor(private http: HttpClient){}

  obtenerMensajes(): Observable<Mensaje[]>{
    return this.http.get<Mensaje[]>(this.apiUrl);
  }

  crearMensaje(mensaje: Mensaje): Observable<Mensaje> {
    let nuevoMensaje = {
      id: mensaje.id,
      fecha: mensaje.fecha,
      mensaje: mensaje.mensaje,
      id_remitente: {
        id: mensaje.id_remitente
      },
      id_destinatario: {
        id: mensaje.id_destinatario
      }
    };
    return this.http.post<Mensaje>(this.apiUrl, nuevoMensaje);
  }

  actualizarMensaje(id: number, cambios: any): Observable<Mensaje> {
    return this.http.patch<Mensaje>(`${this.apiUrl}/${id}`, cambios);
  }

  eliminarMensaje(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {responseType: 'text' as 'json'});
  }

  notificarEliminacion() {
    this.mensajesSubject.next();
  }

  obtenerMensajePorId(id: number): Observable<Mensaje[]>{
    return this.http.get<Mensaje[]>(`${this.apiUrl}/${id}`);
  }

  obtenerMensajePorRemitente(remitente: String): Observable<Mensaje[]>{
    return this.http.get<Mensaje[]>(`${this.apiUrl}/query?remitente=${remitente}`);
  }

  obtenerMensajePorDestinatario(destinatario: String): Observable<Mensaje[]>{
    return this.http.get<Mensaje[]>(`${this.apiUrl}/query?destinatario=${destinatario}`);
  }


}
