import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ClienteService} from "../cliente.service";
import {Cliente} from "../cliente/cliente.model";
import {GestorService} from "../gestor.service";
import {Gestor} from "../gestor/gestor.model";


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent  implements OnInit {

  clientes: Cliente[] = [];
  gestores: Gestor[] = [];
  listaFiltrada: Observable<any[]> = new Observable<any[]>();
  myControl = new FormControl('');

  constructor(private clienteService: ClienteService, private gestorService: GestorService){}

  ngOnInit(): void {
      this.clienteService.obtenerClientes().subscribe(datos => {
        this.clientes = datos;
      });
      this.gestorService.obtenerGestores().subscribe(datos =>{
        this.gestores = datos;
      });
      this.listaFiltrada = this.myControl.valueChanges.pipe(startWith(''), map(value => this._filter(value || '')));
  }

  private _filter(value: String): String[]{
    const filterValue = value.toLowerCase();
    let options: any[] = [];

    this.clienteService.obtenerClientePorNombre(filterValue).subscribe(datos => {
      this.clientes = datos;
    });
    this.gestorService.obtenerGestorPorNombre(filterValue).subscribe(datos =>{
      this.gestores = datos;
    });

    for (const cliente of this.clientes) {
      options.push({
        type:'Cliente',
        id: cliente.id,
        nombre: cliente.nombre + ' ' + cliente.apellido
      });
    }

    for (const gestor of this.gestores) {
      options.push({
        type: 'Gestor',
        id: gestor.id,
        nombre: gestor.nombre + ' ' + gestor.apellido,
      });
    }

    return options.filter(opcion => opcion.nombre.toLowerCase().includes(filterValue));
  }

  getIconClass(type: string): string {
    return type === 'Cliente' ? "fa-solid fa-user fa-fw" : "fa-solid fa-lemon fa-fw";
  }

}
