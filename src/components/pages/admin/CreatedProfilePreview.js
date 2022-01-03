import React from "react";
import Avatar from "../../../images/use.png";
import logobg from "../../../images/ziklogosm.png";
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { fetchData } from "../../../utils/crud";



export default class Department extends React.Component {
  state = {
   newStaffId:this.props.location.state.passedId
  };

  componentDidMount(){
    fetchData(`/Staff/${this.state.newStaffId}`, data => {
      console.log(data)
      this.setState({
        staffInfo:data
      })
    })
  }

  printInfoCard = () => {
    const filename  = 'Account Info.pdf';

if(typeof window !== "undefined"){
  html2canvas(document.querySelector('#infoCard')).then(canvas => {
    let pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 30, 60, 170, 110);
    pdf.save(filename);
  });
}
}

  
  render() {
    return (
      <>


        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
                <div className="alert alert-success">Staff Account Created Successfully!</div>
              <h1 className="d-inline-block mb-0 pop-font">
                New Staff Information{" "}
                <span className="h3 text-muted"></span>
              </h1>
             
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
          </div>

          <div className="row justify-content-center" >

            <hr className="mx-0" />
            <div className="col-md-8 mt-4">
              {/* <div className="card"> */}
                {/* <div className="card" style={{ width: "750px" }}> */}
                  <div className="card-header" id="infoCard">
                    <div className="justify-content-between">
                      <div>
                        {/* <span className="h4 card-title mb-0 mr-2">
                          Departments
                        </span> */}

                      </div>
                      <div className="col-12 text-center">
                          <img src={logobg} style={{ width: "50px" }} />
                        </div>
                        <div className="row mt-4" >
                       
                            <div className="col-md-5" style={{borderRight:"1px solid lightgrey"}}>
                      <div class="card" style={{ width: "300px" }}>
                      <img
                        class="card-img-top"
                        src={Avatar}
                        style={{ height: "230px", background: "transparent" }}
                        alt="Card image"
                      />
                    
                    </div>
                    </div>
                    

                    <div className="col-md-7" style={{paddingLeft:"40px"}}>
                    <p class="card-text">
                          Full Name:
                          <h3 class="card-title">
                        {this.state.staffInfo?.person?.surname}, {this.state.staffInfo?.person?.firstname} {this.state.staffInfo?.person?.othername}
                          </h3>{" "}
                        </p>

                        
                        <p class="card-text">
                          Department:
                          <h3 class="card-title">
                         {this.state.staffInfo?.department?.name}
                          </h3>{" "}
                        </p>

                        <p class="card-text">
                          Username:
                          <h3 class="card-title">
                         {this.state.staffInfo?.generatedStaffNumber}
                          </h3>{" "}
                        </p>

                        <p class="card-text">
                          Staff Number:
                          <h3 class="card-title">
                         {this.state.staffInfo?.staffNumber}
                          </h3>{" "}
                        </p>


                   
                    </div>
                    </div>
                    </div>

                  </div>
                  {/* <button className="btn btn-primary" onClick={this.printInfoCard} disabled>Save as PDF</button> */}

                </div>



                



           
              
              </div>
            {/* </div> */}
          {/* </div> */}
        </div>
      </>
    );
  }
}
