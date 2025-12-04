import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export const CustomButton = () => (
  <Button
    type="primary"
    icon={<PlusOutlined style={{ color: "#000000" }} />}
    style={{
      color: "#ffffff",
      backgroundColor: "#008bff",
      borderRadius: "5px",
      padding: "10px 20px",
      border: "none",
      fontSize: "16px",
      fontWeight: "500",
      height: "auto",
    }}
    onClick={() => alert("Enviar clicado!")}
  >
    Novo Livro
  </Button>
);
