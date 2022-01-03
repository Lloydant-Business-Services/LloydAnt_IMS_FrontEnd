/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Container, Row } from "reactstrap";

// core components
// import DemoNavbar from "components/Navbars/DemoNavbar.js";
// import CardsFooter from "components/Footers/CardsFooter.js";

// index page sections
import Hero from "../../src/views/IndexSections/Hero.js";
import Buttons from "../../src/views/IndexSections/Buttons.js";
import Inputs from "../../src/views/IndexSections/Inputs.js";
// import CustomControls from "../../src/views/IndexSections/CustomControls.js";
import Menus from "../../src/views/IndexSections/Menus.js";
import Navbars from "../../src/views/IndexSections/Navbars.js";
import Tabs from "../../src/views/IndexSections/Tabs.js";
import Progress from "../../src/views/IndexSections/Progress.js";
import Pagination from "./IndexSections/Pagination.js";
import Pills from "../../src/views/IndexSections/Pills.js";
import Labels from "../../src/views/IndexSections/Labels.js";
import Alerts from "../../src/views/IndexSections/Alerts.js";
import Typography from "./IndexSections/Typography.js";
import Modals from "../../src/views/IndexSections/Modals.js";
// import Datepicker from "./IndexSections/Datepicker.js";
import TooltipPopover from "../../src/views/IndexSections/TooltipPopover.js";
import Carousel from "../../src/views/IndexSections/Carousel.js";
import Icons from "../../src/views/IndexSections/Icons.js";
import Login from "../../src/views/IndexSections/Login.js";
import Download from "../../src/views/IndexSections/Download";


class Index extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        {/* <DemoNavbar /> */}
        <main ref="main">
          <Hero />
          <Buttons />
          <Inputs />
          <section className="section">
            <Container>
              {/* <CustomControls /> */}
              <Menus />
            </Container>
          </section>
          <Navbars />
          <section className="section section-components">
            <Container>
              <Tabs />
              <Row className="row-grid justify-content-between align-items-center mt-lg">
                <Progress />
                <Pagination />
              </Row>
              <Row className="row-grid justify-content-between">
                <Pills />
                <Labels />
              </Row>
              <Alerts />
              <Typography />
              <Modals />
              {/* <Datepicker /> */}
              <TooltipPopover />
            </Container>
          </section>
          <Carousel />
          <Icons />
          <Login />
          <Download />
        </main>
        {/* <CardsFooter /> */}
      </>
    );
  }
}

export default Index;
