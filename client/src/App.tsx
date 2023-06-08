import { Layout } from "antd";
import React from "react";
import "./App.css";
import { CustomForm } from "./Components/customForm";

const { Header } = Layout;

const App: React.FC = () => {
  return (
    <Layout>
      <Header className="header"> ◉ 파일 확장자 차단 </Header>

      <div className="desc">
        파일확장자에 따라 특정 형식의 파일을 첨부하거나 전송하지 못하도록 제한
      </div>
      <CustomForm />
    </Layout>
  );
};

export default App;
