import React, { Component } from "react"
import StaffDataTable from "../DataTables/TrainingDataTable"
import {trainingData} from "../../../utils/helpers"



export default class Training extends Component {
  state={
    trainindList: trainingData
  }

    render(){
        return(
            <>
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h6 className="h1 d-inline-block mb-0 pop-font">
                Staff Training Requests{" "}
                <span className="h3 text-muted">
                
                </span>
              </h6>
              <span className="text-sm d-block">
                All Training Requests
              </span>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
          </div>


          {/* Card stats */}
         
        </div>
        <div className="row justify-content-center">
            <hr className="mx-0" />
          </div>
        <div className="container-fluid mt--6">
        <StaffDataTable data={this.state.trainindList}/>

          <div></div>
    

         
     
      
        </div>
            </>
        )
    }
}