/*!

=========================================================
* Argon Design System React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

class Login extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  responseFacebook = (response) => {
    console.log('Facebook API RES: ', response);
    if (response.hasOwnProperty("error")) {
    } else {
      fetch('http://localhost:3003/signin', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "tokenId": response['accessToken'],
          "typeACC": "Facebook"
        })
      })
        .then(res => res.json())
        .then((data) => {
          data['accType'] = 'Facebook';
          localStorage.setItem('token', response['accessToken']);
          localStorage.setItem('accType', 'Facebook');
          this.props.history.push('/sign-in', data);
        })
        .catch(console.log)
    }
  }

  responseGoogle = (response) => {
    console.log('Google API RES: ', response);
    if (response.hasOwnProperty("error")) {
    } else {
      // this.props.history.push('/sign-in');
      fetch('http://localhost:3003/signin', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "tokenId": response['tokenId'],
          "typeACC": "Google"
        })
      })
        .then(res => res.json())
        .then((data) => {
          data['accType'] = 'Google';
          localStorage.setItem('token', response['accessToken']);
          localStorage.setItem('accType', 'Google');
          this.props.history.push('/sign-in', data);
        })
        .catch(console.log)
    }

  }

  render() {
    return (
      <>
        <DemoNavbar/>
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span/>
              <span/>
              <span/>
              <span/>
              <span/>
              <span/>
              <span/>
              <span/>
            </div>
            <Container className="pt-lg-md">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-5">
                      <div className="text-muted text-center mb-3">
                        <small>Sign in with</small>
                      </div>
                      <div className="btn-wrapper text-center">
                        <FacebookLogin
                          appId="914021745628036"
                          fields="name,email,picture"
                          callback={this.responseFacebook}/>
                        <GoogleLogin
                          clientId="12616647638-rvrosiv5ttf3s7qmcr75phu5992cp160.apps.googleusercontent.com"
                          buttonText="Google"
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseGoogle}
                        />
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Or sign in with credentials</small>
                      </div>
                      <Form role="form">
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83"/>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Email" type="email"/>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open"/>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              type="password"
                              autoComplete="off"
                            />
                          </InputGroup>
                        </FormGroup>
                        <div
                          className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id=" customCheckLogin"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor=" customCheckLogin"
                          >
                            <span>Remember me</span>
                          </label>
                        </div>
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="button"
                          >
                            Sign in
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                    <Col xs="6">
                      <a
                        className="text-light"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <small>Forgot password?</small>
                      </a>
                    </Col>
                    <Col className="text-right" xs="6">
                      <a
                        className="text-light"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <small>Create new account</small>
                      </a>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter/>
      </>
    );
  }
}

export default Login;
