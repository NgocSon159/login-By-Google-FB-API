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
// nodejs library that concatenates classes

// reactstrap components
import {
  Container,
  Row,
  Col, Button
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";

class Landing extends React.Component {
  state = {};

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }

  logout = (e, obj) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const accType = localStorage.getItem('accType');
    if (accType === 'Google') {
      fetch(`https://accounts.google.com/o/oauth2/revoke?token=${token}`)
        .then(res => {
          if (res.status === 200) {
            alert('Bạn đã logout thành công');
            localStorage.removeItem('token');
            localStorage.removeItem('accType');
            this.props.history.push('/login-page');
          }
        })
    } else {
      fetch(`https://graph.facebook.com/${obj.location.state['userId']}/permissions/?access_token=${token}`, {
        method: 'delete'
      }).then(res => {
          if (res.status === 200) {
            alert('Bạn đã logout thành công');
            localStorage.removeItem('token');
            localStorage.removeItem('accType');
            this.props.history.push('/login-page');
          }
        }
      )
    }
  }

  render() {
    const obj = this.props;
    console.log('props', obj);
    const type = obj.location.state.accType;
    const username = obj.location.state.name;
    return (
      <>
        <DemoNavbar/>
        <main ref="main">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped pb-250">
              <div className="shape shape-style-1 shape-default">
                <span/>
                <span/>
                <span/>
                <span/>
                <span/>
                <span/>
                <span/>
                <span/>
                <span/>
              </div>
              <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row>
                    <Col lg="10">
                      <h1 className="display-3 text-white">
                        Bạn đã đăng nhập bằng {type} thành công!!
                      </h1>
                      <h1 className="display-3 text-white">
                        Name: {username}
                      </h1>
                      <Button
                        className="my-4"
                        color="warning"
                        type="button"
                        onClick={(e) => this.logout(e, obj)}
                      >
                        Logout
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Container>
              {/* SVG separator */}
              <div className="separator separator-bottom separator-skew">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-white"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
            </section>
            {/* 1st Hero Variation */}
          </div>
        </main>
      </>
    );
  }
}

export default Landing;
