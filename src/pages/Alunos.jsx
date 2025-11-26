import React from "react";
import { Table, Button } from "antd";
import InnerLayout from "../components/InnerLayout";

export default function Alunos() {
  const data = [
    { id: 1, nome: "Aluno 1", curso: "Engenharia", matricula: "2023001" },
    { id: 2, nome: "Aluno 2", curso: "Medicina", matricula: "2023002" },
  ];

  const columns = [
    { title: "Nome", dataIndex: "nome", key: "nome" },
    { title: "Curso", dataIndex: "curso", key: "curso" },
    { title: "Matrícula", dataIndex: "matricula", key: "matricula" },
    {
      title: "Ações",
      render: () => (
        <>
          <Button type="link">Editar</Button>
          <Button type="link" danger>Excluir</Button>
        </>
      ),
    },
  ];

  const CustomButton = () => (
    <Button
      style={{
        color: "#ffffff",
        backgroundColor: "#007bff",
        borderRadius: "5px",
        padding: "10px 20px",
      }}
      onClick={() => alert("Enviar clicado!")}
    >
      Enviar
    </Button>
  );

  return (
    <InnerLayout
      title="Gerenciar Alunos"
      extra={<CustomButton />}
    >
      <Table
        columns={columns}
        dataSource={data}
        locale={{ emptyText: "Nenhum aluno cadastrado" }}
        rowKey="id"
      />
    </InnerLayout>
  );
}
