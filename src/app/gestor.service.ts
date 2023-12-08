import { Injectable } from '@angular/core';
import { Gestor } from './gestor/gestor.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestorService {

  private apiUrl = 'http://localhost:8080/gestor';
  private gestoresSubject = new Subject<void>();

  constructor(private http: HttpClient){}

  obtenerGestores(): Observable<Gestor[]>{
    return this.http.get<Gestor[]>(this.apiUrl);
  }

  crearGestor(gestor: Gestor): Observable<Gestor> {
    return this.http.post<Gestor>(this.apiUrl, gestor);
  }

  actualizarGestor(id: number, cambios: any): Observable<Gestor> {
    return this.http.patch<Gestor>(`${this.apiUrl}/${id}`, cambios);
  }

  eliminarGestor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {responseType: 'text' as 'json'});
  }

  notificarEliminacion() {
    this.gestoresSubject.next();
  }

  obtenerGestorPorId(id: number): Observable<Gestor[]>{
    return this.http.get<Gestor[]>(`${this.apiUrl}/${id}`);
  }

  obtenerGestorPorNombre(nombre: String): Observable<Gestor[]>{
    return this.http.get<Gestor[]>(`${this.apiUrl}/query?nombre=${nombre}`);
  }


}
