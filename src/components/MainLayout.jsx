import React, { useState, useEffect } from "react";
import { PlusOutlined } from '@ant-design/icons';
import Botao from './Button';
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu, Drawer, Button, Space, Row, Col } from "antd";
import {
  MenuOutlined,
  ReadOutlined,
  TeamOutlined,
  BarChartOutlined,
  UserOutlined,
  SwapOutlined
} from "@ant-design/icons";
const { Header, Footer, Content } = Layout;

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const iconHeaderStyle = { fontSize: "2rem", marginRight: "8px" };


  // Menu principal (Navegação)
  const mainMenuItems = [
    {
      key: "1",
      label: <Link to="/livros" style={{ color: "white" }} ><ReadOutlined /> Livros</Link>,
    },
    {
      key: "2",
      label: <Link to="/autores" style={{ color: "white" }}> <TeamOutlined /> Autores</Link>,
    },
    {
      key: "3",
      label: <Link to="/alunos" style={{ color: "white" }}><UserOutlined />Alunos</Link>,
    },
    {
      key: "4",
      label: <Link to="/emprestimo" style={{ color: "white" }}> <SwapOutlined /> Empréstimo</Link>,
    },
    {
      key: "5",
      label: <Link to="/relatorios" style={{color: "white"}}><BarChartOutlined />Relatório</Link> 
    }
    

  ];


  return (
    <Layout style={{ minHeight: "100vh", overflowX: "hidden", color: "white" }}>
      <Header
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#1d3973",
          color: "white",
          height: "auto",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 5px",
            width: "auto",
            fontWeight: "bold",
            fontSize: "18px",
            textDecoration: "none",
            color: "white",
            borderBottom: "1px solid #ccc",
          }}
        >
          <ReadOutlined style={iconHeaderStyle} />
          <span className="text-sm md: text-lg">
            Sistema De Biblioteca Universitária
          </span>
        </Link>
        {/* LAYOUT DESKTOP */}
        {!isMobile && (
          <>
            <div
              style={{
                display: "block",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                width: "auto",
                borderBottom: "1px solid #ccc",
                
              }}
            >
              {/* Menu Principal - CENTRO */}
              <Menu
                mode="horizontal"
                items={mainMenuItems}
                style={{
                  backgroundColor: "transparent",
                  width: "auto",
                  fontSize: "1rem",
                }}
              />
            </div>
          </>
        )}

        {/* LAYOUT MOBILE */}
        {isMobile && (
          <Space>
            {/* Botão do Menu Hamburguer */}
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setDrawerVisible(true)}
              style={{color: "white"}}
            />
          </Space>
        )}
      </Header>

      {/* DRAWER PARA MOBILE */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        style={{backgroundColor: "#1d3973", color: "white"}}
        open={drawerVisible}
      >
        <Menu
          mode="vertical"
          items={mainMenuItems}
          style={{backgroundColor: "#1d3973", color: "white"}}
          
          onClick={() => setDrawerVisible(false)} // Fecha drawer ao clicar
        />
      </Drawer>

      <Content
        style={{
          minHeight: "calc(100vh - 128px)",
          padding: 24,
          border: "1px solid #ccc",
        }}
      >

        <Outlet />
      </Content>

      <Footer className="bg-sky-800 py-8 px-4 text-white" style={{backgroundColor: "#1d3973", color: "white"}}>
        <div className="max-w-6xl mx-auto">
          {/* Informações da Empresa */}
          <div className="text-center">
            <p className="mb-2">
              71080-020 | CNPJ: 74.707.730/0001-63 • Ceilândia, Brasília-DF
            </p>
            <p className="text-sm">
              Sistema de Biblioteca Universitária© {new Date().getFullYear()} • Created by IFB Team
            </p>
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

export default MainLayout;
