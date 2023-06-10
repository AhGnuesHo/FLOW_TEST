import { Form, Layout } from "antd";
import React from "react";
import "./App.css";
import { CustomForm } from "./Components/customForm";
import { DefaultForm } from "./Components/defaultForm";
import { Desc } from "./Components/desc";

const { Header } = Layout;

const App: React.FC = () => {
  return (
    <Layout>
      <Header className="header"> ◉ 파일 확장자 차단 </Header>
      <Form className="form">
        <Desc />
        <DefaultForm />
        <CustomForm />
      </Form>
    </Layout>
  );
};

export default App;
