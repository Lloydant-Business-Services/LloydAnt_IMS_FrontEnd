import React, { Component } from "react"

class ErrorBox extends Component{
    state = {

    }

    render(){
        return(
            <>

            <div className="jumbo-back" onClick={this.cancelEmpty}>
                    <div className="container">
                    <div className="jumbotron empty-alert">
                        <h5>{this.props.message} <i className="fa fa-ban" style={{fontSize:"30px", color:"red"}}></i></h5>
                        <hr/>
                        <button className="btn btn-danger ok-btn" onClick={this.props.ok}>OK</button>
                            </div>
                        </div>
                </div>
            </>
        )
    }
}

export default ErrorBox