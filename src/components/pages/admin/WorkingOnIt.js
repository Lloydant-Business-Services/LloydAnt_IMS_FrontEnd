
import React, { Component } from "react"
import { enquireScreen } from 'enquire-js';
import { Result, Button } from 'antd';
import { Link } from "react-router-dom";





class WorkingOnIt extends Component {
  state = {}

  componentDidMount(){
      window.scroll(0,0)
    enquireScreen((b) => {
      this.setState({
        isMobile: b,
      });
    });
  }
  render() {
    require("antd/dist/antd.css")

    return (
      <div className="content__inner">
         <Result
                    status="500"
                    title="Feature Coming Soon!"
                    subTitle="We are working on it"
                    extra={<Link to="/dashboard"><Button type="primary">Back</Button></Link>}
                />
      </div>
    )
  }
}

export default WorkingOnIt
