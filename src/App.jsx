import "./App.css";
import Rotas from "./routes/routes";
import { ConfigProvider } from "antd";
import 'antd/dist/reset.css';
import ptBR from 'antd/es/locale/pt_BR';

function App() {
  return (
    <ConfigProvider locale={ptBR}>
      <Rotas />
    </ConfigProvider>
  );
}

export default App;
