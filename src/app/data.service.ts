import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Gestor } from './gestor/gestor.model';
import { Cliente } from './cliente/cliente.model';
import { Mensaje } from './mensaje/mensaje.model';
import { Transferencia } from './transferencia/transferencia.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllData(): Observable<any[]>{
    // el $ se coloca para indicar que son observables que emiten instancias de clase
    const clientes$ = this.http.get<Cliente[]>(`${this.apiUrl}/cliente`);
    const gestores$ = this.http.get<Gestor[]>(`${this.apiUrl}/gestor`);
    const mensajes$ = this.http.get<Mensaje[]>(`${this.apiUrl}/mensaje`);
    const transferencias$ = this.http.get<Transferencia[]>(`${this.apiUrl}/transferencias`);

// función para emitir un array con diferentes observables
    return forkJoin([clientes$, gestores$, mensajes$, transferencias$]);
  }

}
