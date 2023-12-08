import { Injectable } from '@angular/core';
import { Cliente } from './cliente/cliente.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8080/cliente';
  private clientesSubject = new Subject<void>();

  constructor(private http: HttpClient){}

  obtenerClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  crearCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  actualizarCliente(id: number, cambios: any): Observable<Cliente> {
    return this.http.patch<Cliente>(`${this.apiUrl}/${id}`, cambios);
  }

  eliminarCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  notificarEliminacion() {
    this.clientesSubject.next();
  }

  obtenerClientePorId(id: number): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.apiUrl}/${id}`);
  }

  obtenerClientePorNombre(nombre: String): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.apiUrl}/${query}`);
  }

}
