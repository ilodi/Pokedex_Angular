import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Resultado } from 'src/app/interfaces/pokeApi';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-tarjeta-pokemon',
  templateUrl: './tarjeta-pokemon.component.html',
  styleUrls: ['./tarjeta-pokemon.component.scss']
})
export class TarjetaPokemonComponent implements OnChanges {

 constructor(private pokemonService: PokemonService){}

  ngOnChanges(changes: SimpleChanges): void {
    this.extraerData()
  }

  @Input() data?:Resultado
  @Input() seleccionado: boolean = false;
  @Output() clickeado = new EventEmitter<string>();

  id:string = "0"

  extraerData(){
    if(this.data){
      this.id = this.data.url.substring(34,this.data.url.length-1);
      this.pokemonService.getById(this.id);
    }
  }
}
