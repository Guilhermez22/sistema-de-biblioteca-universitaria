import Aluno from '../objetos/Aluno.mjs'

export default class AlunoDAO {
    #matricula = 0;

    constructor() {
        this.chaveAluno = "alunos";
    }
    carregarAlunos() {
        try {
            const alunosJSON = localStorage.getItem(this.chaveAluno);
            return Promise.resolve(alunosJSON ? JSON.parse(alunosJSON) : []);
        }
        catch (e) {
            console.error("Erro ao carregar alunos do localStorage: ", e);
            return Promise.resolve([]);
        }
    }
    gerarIdAluno() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
    }
    novaMatricula() {
        return this.#matricula + 1;
    }
    arrumarAluno(aluno) {
        console.log(aluno);
        if (!aluno) return false;

        return {
            id: aluno.getAlunoId() || this.gerarIdAluno(),
            nome: aluno.getNome() || "Sem nome",
            matricula: this.novaMatricula(),
            curso: aluno.getCurso()

        };
    }
    async salvarAluno(aluno) {
        try {
            const listaAluno = await this.carregarAlunos();
            const objeto = this.arrumarAluno(aluno);

            if (!objeto) {
                console.error("Dados do autor inválidos");
                return false;
            }
            listaAluno.push(objeto);
            localStorage.setItem(this.chaveAluno, JSON.stringify(lista));
            return true;
        }
        catch (e) {
            console.error("Erro ao salvar alunos no localStorage:", e);
            return false;
        }
    }

    async atualizarAluno(id, aluno) {
        try {
            if (!id || !aluno) {
                console.error("ID ou aluno não fornecido");
                return false;
            }
            const lista = await this.carregarAlunos();
            const index = lista.findIndex((a) => a.id === id);

            if (index === -1) {
                console.error('Aluno não encontrado');
                return false;
            }
            const alunoAtualizado = {
                ...lista[index],
                ...this.arrumarAluno(aluno),
                id: id
            }
            lista[index] = alunoAtualizado;
            localStorage.setItem(this.chaveAluno, JSON.stringify(lista));
            return true;
        }
        catch (e) {
            console.error("Erro ao atualizar alunos no localStorage:", e);
            return false;
        }

    }
    async excluirAluno(id) {
        try {
            if (!id) {
                console.error("ID não fornecido");
                return false;
            }

            const lista = await this.carregarAluno();
            const novaLista = lista.filter((a) => a.id !== id);

            // Verifica se realmente removeu algum item
            if (novaLista.length === lista.length) {
                console.error("Aluno não encontrado para exclusão");
                return false;
            }

            localStorage.setItem(this.chaveAluno, JSON.stringify(novaLista));
            return true;
        } catch (e) {
            console.error("Erro ao excluir aluno do localStorage:", e);
            return false;
        }
    }


}