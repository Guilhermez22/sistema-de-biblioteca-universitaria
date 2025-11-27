import { Table, Button } from "antd";
import InnerLayout from "../components/InnerLayout";
import AutoresDAO from "../daos/AutoresDAO.mjs";
import { useEffect, useState } from "react";

export default function Autores() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const autores = new AutoresDAO();
    autores.carregarAutores().then((lista) => setData(lista));
  }, []);

  const columns = [
    { title: "Nome", dataIndex: "nome", key: "nome" },
    {
      title: "Nacionalidade",
      dataIndex: "nacionalidade",
      key: "nacionalidade",
    },
    {
      title: "Data de Nascimento",
      dataIndex: "dataNascimento",
      key: "dataNascimento",
    },
    {
      title: "Ações",
      render: () => (
        <>
          <Button type="link">Editar</Button>
          <Button type="link" danger>
            Excluir
          </Button>
        </>
      ),
    },
  ];

  // Botão personalizado conforme seu JSON
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
    <InnerLayout title="Gerenciar Autores" extra={<CustomButton />}>
      <Table
        columns={columns}
        dataSource={data}
        locale={{ emptyText: "Nenhum autor cadastrado" }}
        rowKey="id"
      />
    </InnerLayout>
  );
}
