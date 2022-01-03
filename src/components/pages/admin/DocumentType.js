import React from "react";
import { fetchData, postData, editData, deleteData } from "../../../utils/crud";
import DeleteCard from "../../Reusables/NotificationCard";
import Notice from "../../Reusables/NotificationCard";
import Spinner from "../admin/Spinner"

import AlertBox from "./alertBox";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


export default class DocumentType extends React.Component {
  state = {
    departments: [],
    documentType: [],
    name: "",
    id: 0,
    active: true,
    documentType: "",
  };

  componentDidMount() {
    fetchData("/DocumentType", (data) => {
      this.setState({ documentType: data });
      console.log(this.state.documentType, "Levels");
    });
  }

  addDocumentType = () => {
    if (this.state.name !== "") {
      const docType = {
        name: this.state.name,
        active: true,
      };
      this.setState({ createDocumentType: false });
      postData("/DocumentType", docType, (data) => {
        this.componentDidMount();
        const { documentType } = this.state;
        documentType.push(data);
        this.setState({
          ...this.state,
          documentType,
          name: "",
          active: true,
          added: true,
        });
      });
    }
  };
  closeAdded = () => {
    this.setState({
      added: false,
    });
  };

  clearInput = () => {
    if (typeof window !== "undefined") {
      document.getElementById("myInp").value = "";
    }
  };

  loadEditData = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      createDocumentType: true,
      Title: "Edit",
    });

    console.log(data, "data");
  };

  handleCreateDocumentType = () => {
    this.setState({
      createDocumentType: true,
      name: " ",
      Title: "Add",
    });
  };
  handleDeleteDocumentType = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      deleteDocumentType: true,
    });
  };
  closeDelete = () => {
    this.setState({ deleteDocumentType: false });
  };

  initiateUpdate = () => {
    this.setState({spin:true, createDocumentType:false})
    let selectedData = {
      name: this.state.name,
      id: this.state.id,
      active:true
    };
    editData(`/DocumentType/${this.state.id}`, selectedData, (data) => {
      console.log(data, "Editted");
      this.componentDidMount()
    this.setState({spin:false, notice:true})

    });
  };

  initiateDelete = () => {
    this.setState({deleteDocumentType:false})
    deleteData(`/DocumentType/${this.state.id}`, data => {
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
        {this.state.deleteDocumentType ? (
          <DeleteCard
            message={`Delete ${this.state.name}?`}
            confirmBtn={true}
            closeBtn={true}
            closeCard={this.closeDelete}
            confirm={this.initiateDelete}
          />
        ) : null}
        <Modal isOpen={this.state.createDocumentType}>
          <ModalBody>
            <div className="modal-header border-bottom">
              <h4 className="mb-0" id="exampleModalScrollableTitle">
                {this.state.Title} Document Type
              </h4>
              <button
                type="button"
                className="close"
                onClick={() => {
                  this.setState({ createDocumentType: false });
                }}
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Document Name
                    </label>
                    <input
                      className="form-control"
                      id="myInp"
                      type="text"
                      name="docType"
                      defaultValue={this.state.name}
                      onChange={(e) => {
                        this.setState({ name: e.target.value });
                      }}
                    />
                  </div>
                  {this.state.Title == "Add" ? <button
                    className="btn btn-primary"
                    onClick={() => this.addDocumentType()}
                    data-dismiss="modal"
                  >
                    Add Document Type
                  </button> : <button
                    className="btn btn-primary"
                    onClick={this.initiateUpdate}
                    data-dismiss="modal"
                  >
                    Update Document Type
                  </button>}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger btn-sm text-white"
                onClick={() => {
                  this.setState({ createDocumentType: false });
                }}
              >
                Close
              </button>
            </div>
          </ModalBody>
        </Modal>

        {this.state.added == true ? (
          <AlertBox ok={this.closeAdded} message={"Succesfully Added!"} />
        ) : null}
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h6 className="h1 d-inline-block mb-0 pop-font">
                Document Type Management{" "}
                <span className="h3 text-muted">/Staff Document Type</span>
              </h6>
              <span className="text-sm d-block">
                Create and Manage Document Type.
              </span>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
          </div>

          <div className="form-group row col-md-8">
            {/* <div className="col-10">
                            <label htmlFor="example-text-input" className="form-control-label">Steps per Level</label>
                            <input className="form-control" type="number" name="steps" />
                        </div>
                        <div className="col-2">
                            <span className=" btn btn-primary btn-sm mt-4" onClick={() => this.addDepartment()}>Save</span>
                        </div> */}
          </div>

          {/* Card stats */}
          <div className="row justify-content-center">
            <hr className="mx-0" />
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <div className="col">
                      <h4 className=" mb-0">Document Type List</h4>
                    </div>
                    <div className="col">
                      <div>
                        <button
                          className="btn btn-outline-primary btn-icon btn-sm float-right"
                          type="button"
                          onClick={() => this.handleCreateDocumentType()}
                        >
                          <span className="btn-inner--icon">
                            <i className="fa fa-plus" />
                          </span>
                          <span className="btn-inner--text">
                            New Document Type
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Document Type</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.documentType &&
                        this.state.documentType.length > 0
                          ? this.state.documentType.map((docType) => {
                              return (
                                <tr key={docType.id}>
                                  <td>
                                    <h5 className="mt-2">{docType.name}</h5>
                                  </td>
                                  <td>
                                    <span
                                      onClick={() => this.loadEditData(docType)}
                                      className="h2 cpoint mr-4"
                                      data-toggle="modal"
                                      data-target=".edit-docType-modal"
                                    >
                                      <i className="d-inline fa fa-edit" />
                                    </span>
                                    <span
                                      onClick={() =>
                                        this.handleDeleteDocumentType(docType)
                                      }
                                      className="h2 cpoint"
                                      data-toggle="modal"
                                      data-target=".delete-docType-modal"
                                    >
                                      <i className="fa fa-trash" />
                                    </span>
                                  </td>
                                </tr>
                              );
                            })
                          : null}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt--6">
          <div></div>

          <div
            className="modal fade edit-docType-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h4 className="mb-0" id="exampleModalScrollableTitle">
                    Edit Level
                  </h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Level Name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="unitName"
                          value={this.state.name}
                          onChange={(e) => {
                            this.setState({ name: e.target.value });
                          }}
                        />
                      </div>
                      <button
                        onClick={() => this.updateUnit()}
                        className="btn btn-primary"
                      >
                        Edit Level
                      </button>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm text-white"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade delete-docType-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h4 className="mb-0" id="exampleModalScrollableTitle">
                    Delete Level?
                  </h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div>
                    <div>
                      <p>
                        Are you sure you want to delete this ({this.state.name})
                        record? All items related to it will be affected
                      </p>
                      <button
                        onClick={() => this.deleteUnit()}
                        className="btn btn-outline-danger"
                        data-dismiss="modal"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm text-white"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
