import React from "react";
import { fetchData, postData, editData, deleteData } from "../../../utils/crud";
// import { navigate } from "gatsby";
import { Container, ListGroupItemHeading, ModalHeader } from "reactstrap";
import RankDataTable from "../admin/RankDataTable";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { Fade, Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import DeleteCard from "../../Reusables/NotificationCard";
import Notice from "../../Reusables/NotificationCard";

export default class RankManagement extends React.Component {
  state = {
    Ranks: [],
    units: [],
    name: "",
    id: 0,
    active: true,
    showSpin: true,
  };

  componentDidMount() {
    fetchData("/InstitutionRanks", (data) => {
      console.log(data,"Data")
      this.setState({ Ranks: data });

      let mappedDept = data.map((d, i) => {
        return {
          sn: i + 1,
          name: d.name,
          cadre: d.instistutionUnitName,
          institutionUnitId: d.institutionUnitId,
          action: (
            <span>
               <i className="fa fa-pencil-square-o" style={{cursor:"pointer"}} onClick={()=>this.loadEditData(d)}></i> &nbsp; &nbsp;
              <i className="fa fa-trash" style={{cursor:"pointer"}} onClick={()=>this.handleDeleteRank(d)}></i>
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
      console.log(this.state.Ranks, "Dept");
      console.log(this.state.newDept, "New Dept....");
    }, 3000);

    fetchData("/InstitutionUnits", (data) => {
      this.setState({ units: data });
    });
  }


  postRank = (e) => {
    e.preventDefault();
    this.setState({
      addRankCard: false,
      showSpin: true,
    });
    const newDept = {
      name: this.state.name,
      institutionUnitId:this.state.selectedCadre,
      active: true,
    };
    postData("/InstitutionRanks", newDept, (data) => {
      if (data.id > 0) {
        this.setState({ added: true, showSpin: false });
        this.componentDidMount();
      }
    });
  };

  toggleRankCard = () => {
    if (!this.state.addRankCard) {
      this.setState({ addRankCard: true, Title:"Add", name:" " });
    } else {
      this.setState({ addRankCard: false });
    }
  };


  loadEditData = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      addRankCard: true,
      selectedCadre: data.institutionUnitId,
      Title: "Edit",
    });

    console.log(data, "data");
  };

  handleCreateRank = () => {
    this.setState({
      addRankCard: true,
      name: " ",
      Title: "Add",
    });
  };
  handleDeleteRank = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      deleteRank: true,
    });
  };
  closeDelete = () => {
    this.setState({ deleteRank: false });
  };

  initiateUpdate = () => {
    this.setState({spin:true, addRankCard:false})
    let selectedData = {
      name: this.state.name,
      id: this.state.id,
      institutionUnitId:this.state.selectedCadre,
      active:true
    };
    editData(`/InstitutionRanks/${this.state.id}`, selectedData, (data) => {
      console.log(data, "Editted");
      this.componentDidMount()
    this.setState({spin:false, notice:true})

    });
  };

  initiateDelete = () => {
    this.setState({deleteRank:false})
    deleteData(`/InstitutionRanks/${this.state.id}`, data => {
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
        {this.state.deleteRank ? (
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

            <h3 className="text-center">Rank was Successfully Added!</h3>
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
          isOpen={this.state.addRankCard}
          style={{ maxWidth: "700px" }}
        >
          <ModalHeader>{this.state.Title} Rank</ModalHeader>
          <ModalBody>
            <form class="form-inline">
              <label for="email" class="mr-sm-2">
                Rank Name:{" "}
              </label>
              <input
                type="text"
                class="form-control col-9"
                defaultValue={this.state.name}
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
              />
              <br/>
              <br/>
              <br/>
               <label for="email" class="mr-sm-2">
               Rank Cadre:{" "}
              </label>
              <select className="form-control col-9" onChange={(e)=>{this.setState({selectedCadre: parseInt(e.target.value)})}}>

                <option>Select Cadre</option>
                {this.state.units && this.state.units.map((unit, i)=> 
                <option value={unit.id} selected={unit.id == this.state.selectedCadre}>{unit.name}</option>
                  
                )}
              </select>
            </form>
          </ModalBody>
          <ModalFooter>
            {this.state.Title == "Add" ? <button
              className="btn btn-info"
              onClick={(e) => {
                this.postRank(e);
              }}
            >
              Add Rank
            </button> : 
             <button
             className="btn btn-info"
             onClick={this.initiateUpdate}
           >
             Update Rank
           </button>
            }
            <button
              className="btn btn-danger"
              onClick={this.toggleRankCard}
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
                Rank Management{" "}
                <span className="h3 text-muted"></span>
              </h1>
              <span className="text-sm d-block">
                Create and manage Ranks
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
                          Organization Ranks
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
                            Upload Ranks
                          </span>
                        </button> */}
                        <button
                          className="btn btn-primary btn-icon btn-sm mx-1 float-right"
                          type="button"
                          onClick={this.toggleRankCard}
                        >
                          <span className="btn-inner--icon">
                            <i className="fa fa-plus" />
                          </span>
                          <span className="btn-inner--text">
                            New Rank
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <RankDataTable passedDept={this.state.newDept} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
