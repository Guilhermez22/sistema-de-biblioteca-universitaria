import { Table, Button, Modal, Popconfirm, message, Space } from "antd";
import InnerLayout from "../components/InnerLayout";
import AlunosDAO from "../daos/AlunosDAO.mjs";
import { useEffect, useState, useCallback } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Caixa from "../components/Caixa.jsx";

export default function Alunos() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [loading, setLoading] = useState(false);

  // Função para carregar Alunos
  const carregarAlunos = useCallback(async () => {
    setLoading(true);
    try {
      const alunosDAO = new AlunosDAO();
      const lista = await alunosDAO.carregarAlunos();
      console.log("Alunos carregados:", lista);
      setData(Array.isArray(lista) ? lista : []);
    } catch (error) {
      console.error("Erro ao carregar Alunos:", error);
      setData([
        { id: 0, nome: "Aluno exemplo", nacionalidade: "-", Matricula: "-" },
        { id: 1, nome: "Outro aluno", nacionalidade: "-", Matricula: "-" },
        { id: 2, nome: "Terceiro aluno", nacionalidade: "-", Matricula: "-" },
      ]);
      message.error("Erro ao carregar Alunos!");
    } finally {
      setLoading(false);
    }
  }, []);

  // Carregar Alunos quando o componente montar
  useEffect(() => {
    carregarAlunos();
  }, [carregarAlunos]);

  const showModal = (dados = null) => {
    setAlunoSelecionado(dados);
    setModoEdicao(!!dados);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    setAlunoSelecionado(null);
    setModoEdicao(false);

    // Pequeno delay para garantir que o modal fechou antes de recarregar
    setTimeout(() => {
      carregarAlunos();
    }, 100);

    message.success(
      modoEdicao ? "Aluno atualizado com sucesso!" : "Aluno criado com sucesso!"
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setAlunoSelecionado(null);
    setModoEdicao(false);
  };

  const excluirAluno = async (id) => {
    try {
      const alunosDAO = new AlunosDAO();
      const sucesso = await alunosDAO.excluirAluno(id);

      if (sucesso) {
        await carregarAlunos();
        message.success("Aluno excluído com sucesso!");
      } else {
        message.error("Não foi possível excluir o aluno!");
      }
    } catch (error) {
      message.error("Erro ao excluir aluno!");
      console.error("Erro ao excluir:", error);
    }
  };

  const handleEditar = (record, e) => {
    e?.stopPropagation();
    showModal(record);
  };

  const handleExcluir = (id, e) => {
    e?.stopPropagation();
    excluirAluno(id);
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Nacionalidade",
      dataIndex: "nacionalidade",
      key: "nacionalidade",
    },
    {
      title: "Matricula",
      dataIndex: "matricula",
      key: "matricula",
      render: (text) => (
        <span>
          {text
            ? text.length > 50
              ? `${text.substring(0, 50)}...`
              : text
            : "-"}
        </span>
      ),
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={(e) => handleEditar(record, e)}
          >
            Editar
          </Button>
          <Popconfirm
            title="Excluir Autor"
            description="Tem certeza que deseja excluir este aluno?"
            onConfirm={(e) => handleExcluir(record.id, e)}
            onCancel={(e) => e?.stopPropagation()}
            okText="Sim"
            cancelText="Não"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => e.stopPropagation()}
            >
              Excluir
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const CustomButton = () => (
    <Button
      type="primary"
      style={{
        borderRadius: "5px",
        padding: "10px 20px",
      }}
      onClick={() => showModal()}
    >
      Novo Autor
    </Button>
  );

  return (
    <InnerLayout title="Gerenciar Alunos" extra={<CustomButton />}>
      <Table
        columns={columns}
        dataSource={data}
        locale={{ emptyText: "Nenhum aluno cadastrado" }}
        rowKey="id"
        loading={loading}
        onRow={(record) => ({
          onClick: () => {
            showModal(record);
          },
        })}
      />

      <Caixa
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        dados={alunoSelecionado}
        tipo={3}
      />
    </InnerLayout>
  );
}
