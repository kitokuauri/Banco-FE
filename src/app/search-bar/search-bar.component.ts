import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent  implements OnInit {
 // para manejar a través de observables los eventos de nuestro buscador
  searchTerm$ = new Subject<string>();
  allData: any[] = [];
  listaFiltrada: any[] = [];

  constructor(private dataservice: DataService){}

  ngOnInit(): void{
    this.dataservice.getAllData().subscribe((datos) =>{
      // combina los resultados de todos los endpoints en un array
      this.allData = datos.reduce((acc, curr)=> acc.concat(curr), []);
      this.listaFiltrada = this.allData.slice();
    }),
    this.searchTerm$.subscribe((term)=>{
      this.listaFiltrada = this.filtrarLista(term);
    })
  }

  private filtrarLista(term: String): any[]{
    return this.allData.filter((item)=>{
      return (
        item.name.toLowerCase().indexOf(term.toLowerCase()) !== -1 ||
        item.remitente.toLowerCase().indexOf(term.toLowerCase()) !== -1 ||
        item.destinatario.toLowerCase().indexOf(term.toLowerCase()) !== -1
      );
    });
  }

  onSearchKeyUp(event: KeyboardEvent): void{
    const inputValue = (event.target as HTMLInputElement)?.value;
    this.searchTerm$.next(inputValue);
  }
}
