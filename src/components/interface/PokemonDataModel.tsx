export interface PokemonDataModel {
   id: number;
   name: string;
   height: number;
   weight: number;
   types: { slot: number; type: { name: string } }[];
   abilities: { ability: { name: string } }[];
   stats: { base_stat: number; stat: { name: string } }[];
   species: { name: string };
   sprites: { front_default: string };
}
