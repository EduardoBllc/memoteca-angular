export interface Pensamento {
  id?: number,
  conteudo: string,
  autoria: string,
  modelo: Modelo,
  favorito: boolean,
}

export enum Modelo {
  um = "modelo1",
  dois = "modelo2",
  tres = "modelo3"
}
