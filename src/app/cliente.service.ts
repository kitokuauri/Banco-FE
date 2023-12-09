import { Injectable } from '@angular/core';
import { Cliente } from './cliente/cliente.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

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
    let nuevoCliente = {
      id: cliente.id,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      email: cliente.email,
      id_gestor: {
        id: cliente.id_gestor
      }
    };
    return this.http.post<Cliente>(this.apiUrl, nuevoCliente);
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
    return this.http.get<Cliente[]>(`${this.apiUrl}/query?nombre=${nombre}`);
  }

}
