import { Modal, Form, Input, DatePicker, Select } from "antd";
import Autores from "../objetos/Autores.mjs";
import AutoresDAO from "../daos/AutoresDAO.mjs";
import dayjs from "dayjs";
import React from "react";

const { Option } = Select;
const { TextArea } = Input;

function Caixa({ isModalOpen, handleOk, handleCancel, tipo, dados }) {
  const [form] = Form.useForm();

  function editarAutor(values) {
    console.log("Editar autor chamado com dados:", values);
    if (!dados) return;

    const autoresDAO = new AutoresDAO();
    autoresDAO.atualizarAutores(dados.id, values);
  }
  React.useEffect(() => {
    if (dados && tipo === 1) {
      form.setFieldsValue({
        nome: dados.nome,
        nacionalidade: dados.nacionalidade,
        dataNascimento: dados.dataNascimento
          ? dayjs(dados.dataNascimento)
          : null,
        biografia: dados.biografia,
      });
    } else if (dados && tipo === 2) {
      form.setFieldsValue({
        titulo: dados.titulo,
        isbn: dados.isbn,
        ano: dados.ano,
        categoria: dados.categoria,
        autorId: dados.autorId,
      });
    } else if (dados && tipo === 3) {
      form.setFieldsValue({
        nomeAluno: dados.nomeAluno,
        matricula: dados.matricula,
        curso: dados.curso,
        email: dados.email,
        telefone: dados.telefone,
      });
    } else {
      // Limpar formulário quando não há dados (modo criação)
      form.resetFields();
    }
  }, [dados, tipo, form]);

  const onFinish = (values) => {
    console.log("Dados do formulário:", values);

    if (tipo === 1) {
      if (dados) {
        // Modo edição - atualizar autor existente
        editarAutor(values);
      } else {
        // Modo criação - salvar novo autor
        const novoAutor = new Autores();
        novoAutor.setNome(values.nome);
        novoAutor.setNacionalidade(values.nacionalidade);
        novoAutor.setBiografia(values.biografia);
        const autoresDAO = new AutoresDAO();
        autoresDAO.salvarAutores(novoAutor);
      }
    }

    handleOk();
  };

  const handleModalOk = () => {
    form.submit(); // Isso irá chamar onFinish
  };

  return (
    <Modal
      title={dados ? "Editar" : "Cadastro"}
      open={isModalOpen}
      onOk={handleModalOk}
      onCancel={handleCancel}
      okText="Salvar"
      cancelText="Cancelar"
      width={600}
    >
      {tipo === 1 && (
        <Form
          form={form}
          layout="vertical"
          name="autorForm"
          onFinish={onFinish}
        >
          <Form.Item
            label="Nome do Autor"
            name="nome"
            rules={[
              { required: true, message: "Por favor, insira o nome do autor!" },
            ]}
          >
            <Input placeholder="Digite o nome completo do autor" />
          </Form.Item>

          <Form.Item
            label="Nacionalidade"
            name="nacionalidade"
            rules={[
              { required: true, message: "Por favor, insira a nacionalidade!" },
            ]}
          >
            <Input placeholder="Ex: Brasileiro, Americano, etc." />
          </Form.Item>

          <Form.Item label="Biografia" name="biografia">
            <TextArea rows={4} placeholder="Breve biografia do autor..." />
          </Form.Item>
        </Form>
      )}
      {tipo === 2 && (
        <Form
          form={form}
          layout="vertical"
          name="livroForm"
          onFinish={onFinish}
        >
          <Form.Item
            label="Título do Livro"
            name="titulo"
            rules={[
              {
                required: true,
                message: "Por favor, insira o título do livro!",
              },
            ]}
          >
            <Input placeholder="Digite o título do livro" />
          </Form.Item>

          <Form.Item
            label="ISBN"
            name="isbn"
            rules={[{ required: true, message: "Por favor, insira o ISBN!" }]}
          >
            <Input placeholder="Ex: 978-3-16-148410-0" />
          </Form.Item>

          <Form.Item
            label="Ano de Publicação"
            name="ano"
            rules={[
              {
                required: true,
                message: "Por favor, insira o ano de publicação!",
              },
            ]}
          >
            <Input type="number" placeholder="Ex: 2020" />
          </Form.Item>

          <Form.Item
            label="Categoria"
            name="categoria"
            rules={[
              { required: true, message: "Por favor, selecione a categoria!" },
            ]}
          >
            <Select placeholder="Selecione uma categoria">
              <Option value="Computação">Computação</Option>
              <Option value="Tecnologia">Tecnologia</Option>
              <Option value="Literatura">Literatura</Option>
              <Option value="Ciências">Ciências</Option>
              <Option value="Matemática">Matemática</Option>
              <Option value="Filosofia">Filosofia</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Autor"
            name="autorId"
            rules={[
              { required: true, message: "Por favor, selecione o autor!" },
            ]}
          >
            <Select placeholder="Selecione o autor">
              <Option value={1}>Thomas H. Cormen</Option>
              <Option value={2}>Silberschatz</Option>
            </Select>
          </Form.Item>
        </Form>
      )}
      {tipo === 3 && (
        <Form
          form={form}
          layout="vertical"
          name="alunoForm"
          onFinish={onFinish}
        >
          <Form.Item
            label="Nome do Aluno"
            name="nomeAluno"
            rules={[
              { required: true, message: "Por favor, insira o nome do aluno!" },
            ]}
          >
            <Input placeholder="Digite o nome completo do aluno" />
          </Form.Item>

          <Form.Item
            label="Matrícula"
            name="matricula"
            rules={[
              { required: true, message: "Por favor, insira a matrícula!" },
            ]}
          >
            <Input placeholder="Ex: 202300123" />
          </Form.Item>

          <Form.Item
            label="Curso"
            name="curso"
            rules={[{ required: true, message: "Por favor, insira o curso!" }]}
          >
            <Select placeholder="Selecione o curso">
              <Option value="Engenharia da Computação">
                Engenharia da Computação
              </Option>
              <Option value="Direito">Direito</Option>
              <Option value="Medicina">Medicina</Option>
              <Option value="Administração">Administração</Option>
              <Option value="Psicologia">Psicologia</Option>
              <Option value="Arquitetura">Arquitetura</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Por favor, insira o email!" },
              { type: "email", message: "Por favor, insira um email válido!" },
            ]}
          >
            <Input placeholder="exemplo@email.com" />
          </Form.Item>

          <Form.Item label="Telefone" name="telefone">
            <Input placeholder="(00) 00000-0000" />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}

export default Caixa;
