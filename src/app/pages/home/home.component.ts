import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Resultado } from 'src/app/interfaces/pokeApi';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private pokemonService: PokemonService){}

  @ViewChild('tarjetas') tarjetasElement!:ElementRef;

  listPokemon:Resultado[] = []

  pagina:number = 1 ;
  cargando: boolean = false;
  pokemonSeleccionado?:Pokemon;

  ngOnInit(): void {
    this.cargarLista()
  }

  async cargarLista(){
    this.cargando = true
    this.listPokemon = [...this.listPokemon, ...await this.pokemonService.getByPage(this.pagina)]
    this.pagina++;
    this.cargando = false
  }

  onScroll(e: any){
    if(this.cargando) return;
    if(
      Math.round(
        this.tarjetasElement.nativeElement.clientHeight + this.tarjetasElement.nativeElement.scrollTop
      )
      === e.srcElement.scrollHeight
    ){
      this.cargarLista()
    }
  }

  async tarjetaClickeada(id:string){
    this.pokemonSeleccionado = await this.pokemonService.getById(id);
  }
}
