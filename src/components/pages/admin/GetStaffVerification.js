import React from "react"
import { fetchData, postData, editData, deleteData } from "../../../utils/crud"
import AlertBox from "./alertBox"
import Spinner from "../admin/Spinner"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  

} from "reactstrap";
import {Redirect} from "react-router-dom";

export default class GetStaffVerification extends React.Component {
  state = {
    departments: [],
    documentType: [],
    name: "",
    id: 0,
    active: true,
    documentType: "",
    added: false,
    spin:false
  }

  loadStaff = () => {
      let currentState = this

      
      currentState.setState({
          spin:true
      })

      setTimeout(() => {
        fetchData(`/Staff/GetStaffByStaffNumber?generatedStaffNumber=${this.state.staffNumber}`, data => {
            console.log(data, "Docx Info")
            currentState.setState({
                staffInfo:data
            })
            if(data != null){

                console.log("Yes")
                currentState.setState({
                  spin:false,
                  redirect:true
              })
             
  
            }else{
                currentState.setState({
                    spin:false
                })
                  alert("No Record Found")
            }
        })
      }, 2000)
   
  }

  componentDidMount() {

    fetchData("/DocumentType", data => {
      this.setState({ documentType: data })
      console.log(this.state.documentType, "Levels")
    })
  }

  
  
  

  render() {
      if(this.state.redirect){
          return(
            <Redirect to={{pathname:"/StaffDocumentVerification", state:{staffInfo:this.state.staffInfo}}}/>
          )
      }
    return (
      <>

        {this.state.spin ? <Spinner msg={"Loading Staff..."}/> : null}

        {this.state.added == true ? (
          <AlertBox ok={this.closeAdded} message={"Succesfully Added!"} />
        ) : null}
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h6 className="h1 d-inline-block mb-0 pop-font">
                Staff Document Verification{" "}
                <span className="h3 text-muted">
                
                </span>
              </h6>
              <span className="text-sm d-block">
                Verify Staff Document
              </span>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
          </div>


          {/* Card stats */}
          <div className="row justify-content-center">
            <hr className="mx-0" />
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <div className="col">
        <h4 className=" mb-0">Staff Document Verification</h4>
                    </div>
                    <div className="col">
                     
                    </div>
                  </div>
                </div>
                <div className="card-body">
                <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                         Enter Staff Number
                        </label>
                        <input
                          className="form-control"
                          id="myInp"
                          placeholder="NAU/ST/XXXX"
                          type="text"
                          name="docType"
                          value={this.state.staffNumber}
                          onChange={e => {
                            this.setState({ staffNumber: e.target.value })
                          }}
                        />
                </div>
                <br/>

                <button
                    type="button"
                    className="btn btn-info text-white"
                   onClick={this.loadStaff}
                    
                  >
                    Load Staff
                  </button>
              </div>
              </div>
            </div>
          </div>
        </div>
        
        
        <div className="container-fluid mt--6">
          <div></div>
    

         
     
      
        </div>
      </>
    )
  }
}
