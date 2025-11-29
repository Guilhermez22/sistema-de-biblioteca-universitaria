import Autores from "../objetos/Autores.mjs";

export default class AutoresDAO {
  constructor() {
    this.chaveAutor = "autores"; // chave para localStorage
    this.autores = [];
  }
  async carregarAutores() {
    try {
      const autoresJSON = localStorage.getItem(this.chaveAutor);
      return autoresJSON ? JSON.parse(autoresJSON) : []; // Retorna um array vazio se não houver autores
    } catch (e) {
      console.error("Erro ao carregar autores do localStorage:", e);
      return [];
    }
  }
  async carregarAutoresBackendFake(){
    const response = await fetch('http://localhost:5000/autores'); 
    const autoresJSON = await response.json();
    return autoresJSON;
  }
  gerarIdAutor() {
    //Gera um ID único simples utilizando data e um número aleatório
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  }
  arrumarAutores(autoresJSON) {
    //autoresJSON é um objeto do tipo Autores
    if (!autoresJSON || autoresJSON.length === 0) return {};
    return {
      id: autoresJSON.id || this.gerarIdAutor(),
      nome: autoresJSON.getNome(),
      nacionalidade: autoresJSON.getNacionalidade(),
      dataNascimento: autoresJSON.getDataNascimento(),
      biografia: autoresJSON.getBiografia(),
    };
  }
  async salvarAutores(autores) {
    const lista = await this.carregarAutores();
    const objeto = this.arrumarAutores(autores);
    if (!objeto.id) {
      objeto.id = this.gerarIdAutor();
    }
    lista.push(objeto);
    try {
      localStorage.setItem(this.chaveAutor, JSON.stringify(lista));
    } catch (e) {
      console.error("Erro ao salvar autores no localStorage:", e);
    }
  }
}
