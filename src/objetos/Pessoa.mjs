export default class Pessoa {
  /** Atributos */
  #nome;
  #idade;
  #dataNascimento;
  #nacionalidade;

  /** Métodos */

  setNome(nome) {
    this.#nome = nome;
  }
  getNome() {
    return this.#nome;
  }
  setIdade(idade) {
    this.#idade = idade;
  }
  getIdade() {
    return this.#idade;
  }
  setDataNascimento(dataNascimento) {
    this.#dataNascimento = dataNascimento;
  }
  getDataNascimento() {
    return this.#dataNascimento;
  }
  setNacionalidade(nacionalidade) {
    this.#nacionalidade = nacionalidade;
  }
  getNacionalidade() {
    return this.#nacionalidade;
  }
}
