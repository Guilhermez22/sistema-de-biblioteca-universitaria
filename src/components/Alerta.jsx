import React from "react";
import { Alert } from "antd";
function Alerta({ title, description, type }) {
  return (
    <Alert
      title={title}
      description={description}
      type={type}
      showIcon
      closable
    />
  );
}
export default Alerta;
//Legendas de uso:
/*
    title - Título do alerta
    description - Descrição do alerta
    type - Tipo do alerta: 'success', 'info', 'warning', 'error'
*/
