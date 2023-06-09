import { Injectable } from '@angular/core';
import { Resultado } from '../interfaces/pokeApi';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  async getByPage(page:number, size: number = 40):Promise<Resultado[]>{
    if(page > 5) return [];
   const offset = size*(page-1)
   console.log(offset)
   const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${size}}&offset=${offset}`)
   const resJson = await res.json();
   if(resJson.results.length > 0) return resJson.results
   return [];
 }

  async getById(id:string):Promise<Pokemon>{
   const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
   return await res.json();
  }

  getDescription(){
    const res = await fetch()
  }
}
