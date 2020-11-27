import React, { useState } from "react";
import { Row, Col, Card, Input, Button, Form } from "antd";
import axios from "axios";

function LoginRegister() {
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios({
        method: "POST",
        url: `api/users/${login ? "login" : "register"}/`,
        data: values,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row justify="center" style={{ marginTop: "10px" }}>
      <Col xs={23} sm={23} md={10}>
        <Card>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row style={{ textAlign: "center " }}>
              <Col xs={24}>
                <h1>{login ? "LOGIN" : "REGISTER"}</h1>
              </Col>
            </Row>
            <Row gutter={12}>
              {!login && (
                <>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="firstname"
                      rules={[
                        {
                          required: true,
                          message: "Please input your firstname!",
                        },
                      ]}
                    >
                      <Input placeholder="First Name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="lastname"
                      rules={[
                        {
                          required: true,
                          message: "Please input your lastname!",
                        },
                      ]}
                    >
                      <Input placeholder="Last Name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input placeholder="Username" />
                    </Form.Item>
                  </Col>
                </>
              )}
              <Col xs={24}>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Button htmlType="submit" type="primary" block>
                  {login ? "Login" : "Register"}
                </Button>
              </Col>
              <Col xs={24}>
                <Button
                  type="link"
                  htmlType="button"
                  style={{ float: "right" }}
                  onClick={() => {
                    setLogin(!login);
                  }}
                  loading={loading}
                >
                  {!login
                    ? "Already have an account? Login"
                    : "New here? Please Register"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default LoginRegister;
