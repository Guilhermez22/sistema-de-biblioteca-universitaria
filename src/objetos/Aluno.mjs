import Pessoa from './Pessoa.mjs';

export default class Aluno extends Pessoa{
    #alunoId
    #matricula;
    #curso;

    setAlunoId(id) {
        this.#alunoId = id;
      }
      getAlunoId() {
        return this.#alunoId;
      }

    setMatricula(matricula){
        this.#matricula = matricula;
    }
    getMatricula(){
        return this.#matricula;
    }
    setCurso(curso){
        this.#curso = curso;
    }
    getCurso(){
        return this.#curso;
    }
}