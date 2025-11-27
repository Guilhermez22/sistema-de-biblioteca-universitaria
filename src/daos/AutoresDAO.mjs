import Autores from "../objetos/Autores.mjs";

export default class AutoresDAO {
  constructor() {
    this.autores = [];
    this.url = "http://localhost:5000/autores";
  }
  async carregarAutores() {
    const response = await fetch(this.url);
    this.autores = await response.json();
    return this.autores;
  }

}
