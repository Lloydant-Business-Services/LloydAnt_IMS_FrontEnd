import React from "react";
import { fetchData, postData, editData, deleteData } from "../../../utils/crud";
// import { navigate } from "gatsby";
import { Container, ListGroupItemHeading, ModalHeader } from "reactstrap";
import DeptDataTable from "../admin/DeptDataTable";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { Fade, Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import DeleteCard from "../../Reusables/NotificationCard";
import Notice from "../../Reusables/NotificationCard";

export default class CadreManagement extends React.Component {
  state = {
    Cadres: [],
    units: [],
    name: "",
    id: 0,
    active: true,
    showSpin: true,
  };

  componentDidMount() {
    fetchData("/InstitutionUnits", (data) => {
      this.setState({ Cadres: data });

      let mappedDept = data.map((d, i) => {
        return {
          sn: i + 1,
          name: d.name,
          action: (
            <span>
             <i className="fa fa-pencil-square-o" style={{cursor:"pointer"}} onClick={()=>this.loadEditData(d)}></i> &nbsp; &nbsp;
              <i className="fa fa-trash" style={{cursor:"pointer"}} onClick={()=>this.handleDeleteCadre(d)}></i>
            </span>
          ),
        };
      });
      console.log(mappedDept, "Mapeed!!!!");

      this.setState({
        newDept: mappedDept,
        showSpin: false,
      });

      //   setTimeout(() => {
      //     console.log(this.state.newDept, "New Dept....");
      //   }, 4000);
    });
    setTimeout(() => {
      console.log(this.state.Cadres, "Dept");
      console.log(this.state.newDept, "New Dept....");
    }, 3000);

    fetchData("/InstitutionUnits", (data) => {
      this.setState({ units: data });
    });
  }
  navigateUpload = () => {
    // navigate("/app/admin/UploadCadre")
  };

 





 

  postCadre = (e) => {
    e.preventDefault();
    this.setState({
      addCadreCard: false,
      showSpin: true,
    });
    const newDept = {
      name: this.state.name,
      active: true,
    };
    postData("/InstitutionUnits", newDept, (data) => {
      if (data.id > 0) {
        this.setState({ added: true, showSpin: false });
        this.componentDidMount();
      }
    });
  };

  toggleCadreCard = () => {
    if (!this.state.addCadreCard) {
      this.setState({ addCadreCard: true, Title:"Add", name: " " });
    } else {
      this.setState({ addCadreCard: false });
    }
  };

  loadEditData = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      addCadreCard: true,
      Title: "Edit",
    });

    console.log(data, "data");
  };

  handleCreateCadre = () => {
    this.setState({
      addCadreCard: true,
      name: " ",
      Title: "Add",
    });
  };
  handleDeleteCadre = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      deleteCadres: true,
    });
  };
  closeDelete = () => {
    this.setState({ deleteCadres: false });
  };

  initiateUpdate = () => {
    this.setState({addCadreCard:false})
    let selectedData = {
      name: this.state.name,
      id: this.state.id,
      active:true
    };
    editData(`/InstitutionUnits/${this.state.id}`, selectedData, (data) => {
      console.log(data, "Editted");
      this.componentDidMount()
    this.setState({notice:true})

    });
  };

  initiateDelete = () => {
    this.setState({deleteCadres:false})
    deleteData(`/InstitutionUnits/${this.state.id}`, data => {
      console.log(data)
      this.componentDidMount();
    this.setState({notice:true})

    })
  }
  render() {
    return (
      <>
      {this.state.notice ? <Notice message={"Action was Successful!"} okBtn={true} closeCard={()=>{this.setState({notice:false})}}/> : null}
      {this.state.spin ? <Spinner/> : null}
        {this.state.deleteCadres ? (
          <DeleteCard
            message={`Delete ${this.state.name}?`}
            confirmBtn={true}
            closeBtn={true}
            closeCard={this.closeDelete}
            confirm={this.initiateDelete}
          />
        ) : null}


        <Modal isOpen={this.state.added}>
          <ModalBody>
            <ModalHeader className="text-secondary"></ModalHeader>

            <h3 className="text-center">Cadre was Successfully Added!</h3>
          </ModalBody>
          <ModalFooter>
            <Button
              className="ok-btn"
              color={"info"}
              onClick={() => {
                this.setState({ added: false });
              }}
            >
              OK
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.addCadreCard}
          style={{ maxWidth: "700px" }}
        >
          <ModalHeader>{this.state.Title} Cadre</ModalHeader>
          <ModalBody>
            <form class="form-inline">
              <label for="email" class="mr-sm-2">
                Cadre Name:{" "}
              </label>
              <input
                type="text"
                class="form-control col-9"
                defaultValue={this.state.name}
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            {this.state.Title == "Add" ? <button
              className="btn btn-info"
              onClick={(e) => {
                this.postCadre(e);
              }}
            >
              Add Cadre
            </button> : 
              <button
              className="btn btn-info"
              onClick={this.initiateUpdate}
            >
              Update Cadre
            </button>
            }
            <button
              className="btn btn-danger"
              onClick={this.toggleCadreCard}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>
        {this.state.showSpin ? <Spinner msg={"Loading..."} /> : null}

        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h1 className="d-inline-block mb-0 pop-font">
                Staff Cadre Management{" "}
                <span className="h3 text-muted"></span>
              </h1>
              <span className="text-sm d-block">
                Create and manage Cadres
              </span>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
          </div>

          <div className="row justify-content-center">
            <hr className="mx-0" />
            <div className="col-md-7 mt-4">
              <div className="card">
                <div className="card" style={{ width: "750px" }}>
                  <div className="card-header">
                    <div className="justify-content-between">
                      <div>
                        <span className="h4 card-title mb-0 mr-2">
                          Organization Cadres
                        </span>

                        {/* <button
                          onClick={this.navigateUpload}
                          className="btn btn-primary btn-icon btn-sm mx-1 float-right"
                          id="upl"
                          type="button"
                        >
                          <span className="btn-inner--icon">
                            <i className="fa fa-file" />
                          </span>
                          <span className="btn-inner--text">
                            Upload Cadres
                          </span>
                        </button> */}
                        <button
                          className="btn btn-primary btn-icon btn-sm mx-1 float-right"
                          type="button"
                          onClick={this.toggleCadreCard}
                        >
                          <span className="btn-inner--icon">
                            <i className="fa fa-plus" />
                          </span>
                          <span className="btn-inner--text">
                            New Cadre
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <DeptDataTable passedDept={this.state.newDept} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
