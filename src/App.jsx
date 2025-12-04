import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Rotas from "./routes/routes";
import { ConfigProvider } from "antd";
import ptBR from 'antd/es/locale/pt_BR';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

function App() {
  return (
    <ConfigProvider locale={ptBR}>
      <Router basename="/sistema-de-biblioteca-universitaria">
        <Rotas />
      </Router>
    </ConfigProvider>
  );
}

export default App;
