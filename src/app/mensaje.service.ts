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
    return this.http.post<Mensaje>(this.apiUrl, mensaje);
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
