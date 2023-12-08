import { Injectable } from '@angular/core';
import { Transferencia } from './transferencia/transferencia.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {

  private apiUrl = 'http://localhost:8080/transferencia';
  private transferenciasSubject = new Subject<void>();

  constructor(private http: HttpClient){}

  obtenerTransferencia(): Observable<Transferencia[]>{
    return this.http.get<Transferencia[]>(this.apiUrl);
  }

  crearTransferencia(transferencia: Transferencia): Observable<Transferencia> {
    return this.http.post<Transferencia>(this.apiUrl, transferencia);
  }

  actualizarTransferencia(id: number, cambios: any): Observable<Transferencia> {
    return this.http.patch<Transferencia>(`${this.apiUrl}/${id}`, cambios);
  }

  eliminarTransferencia(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {responseType: 'text' as 'json'});
  }

  notificarEliminacion() {
    this.transferenciasSubject.next();
  }

  obtenerTransferenciaPorId(id: number): Observable<Transferencia[]>{
    return this.http.get<Transferencia[]>(`${this.apiUrl}/${id}`);
  }

  obtenerTransferenciaPorRemitente(remitente: String): Observable<Transferencia[]>{
    return this.http.get<Transferencia[]>(`${this.apiUrl}/query?remitente=${remitente}`);
  }

  obtenerTransferenciaPorDestinatario(destinatario: String): Observable<Transferencia[]>{
    return this.http.get<Transferencia[]>(`${this.apiUrl}/query?destinatario=${destinatario}`);
  }

}
