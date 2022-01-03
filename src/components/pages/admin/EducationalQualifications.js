import React from "react"
import { fetchData, postData,editData,deleteData } from "../../../utils/crud"
import DeleteCard from "../../Reusables/NotificationCard";
import Notice from "../../Reusables/NotificationCard";
import Spinner from "../admin/Spinner"

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  
  } from "reactstrap";

export default class EducationalQualification extends React.Component {

    state = {
        qualifications: [],
        types: [],
        name: '',
        id:0,
        active:true
    }

    componentDidMount() {

        fetchData('/EducationalQualifications', (data) => {
            this.setState({ qualifications: data })
        });

        fetchData('/InstitutionStaffTypes', (data) => {
            this.setState({ types: data })
        });

    }

    addQualification = () => {
        if (this.state.name !== '') {
            const category = {
                id: 0,
                name: this.state.name,
                active: this.state.active
            };
            this.setState({createEduQual:false})
            postData('/EducationalQualifications', category, (data) => {
                const { qualifications } = this.state;
                qualifications.push(data);
                this.setState({ ...this.state, qualifications, name: '',active: true, });
                this.componentDidMount();
            });
        }
    }

    addType = () => {

        if (this.state.name !== '') {
            const type = {
                id: 0,
                name: this.state.name,
                active: true
            };
            postData('/InstitutionStaffTypes', type, (data) => {
                const { types } = this.state;
                types.push(data);
                this.setState({ ...this.state, types, name: '',active: true, });
            });
        }

    }

    updateType = () => {

        if (this.state.name !== '' && this.state.id > 0) {
            const type = {
                id: this.state.id,
                name: this.state.name,
                active: this.state.active
            };
            editData(`/InstitutionStaffTypes/${this.state.id}`, type, () => {
                fetchData('/InstitutionStaffTypes', (data) => {
                    this.setState({ types: data })
                });
            });
        }

    }

  
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
          createEduQual: true,
          Title: "Edit",
        });
    
        console.log(data, "data");
      };
    
      handleCreateEducationalQualification = () => {
        this.setState({
          createEduQual: true,
          name: " ",
          Title: "Add",
        });
      };
      handleDeleteEducationalQualification = (data) => {
        this.setState({
          name: data.name,
          id: data.id,
          active: data.active,
          deleteEducationalQualification: true,
        });
      };
      closeDelete = () => {
        this.setState({ deleteEducationalQualification: false });
      };
    
      initiateUpdate = () => {
        this.setState({createEduQual:false})
        let selectedData = {
          name: this.state.name,
          id: this.state.id,
          active:true
        };
        editData(`/EducationalQualifications/${this.state.id}`, selectedData, (data) => {
          console.log(data, "Editted");
          this.componentDidMount()
        this.setState({notice:true})
    
        });
      };
    
      initiateDelete = () => {
        this.setState({deleteEducationalQualification:false})
        deleteData(`/EducationalQualifications/${this.state.id}`, data => {
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
        {this.state.deleteEducationalQualification ? (
          <DeleteCard
            message={`Delete ${this.state.name}?`}
            confirmBtn={true}
            closeBtn={true}
            closeCard={this.closeDelete}
            confirm={this.initiateDelete}
          />
        ) : null}
            <Modal isOpen={this.state.createEduQual}>
                <ModalBody>
                
                                <div className="modal-header border-bottom">
                                    <h2 className="mb-0" id="exampleModalScrollableTitle">{this.state.Title} Qualification</h2>
                                    <button type="button" className="close"
                                        onClick={()=>{this.setState({createEduQual:false})}}
                                    >
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Qualification Name</label>
                                                    <input className="form-control" type="text" name="qualification" defaultValue={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                                </div>
                                                {this.state.Title == "Add" ? <button className="btn btn-primary" onClick={() => this.addQualification()}>Add</button> : 
                                                <button className="btn btn-primary" onClick={this.initiateUpdate}>Update</button>
                                            }

                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-sm text-white"  onClick={()=>{this.setState({createEduQual:false})}}>Close</button>
                                </div>
                     
                </ModalBody>
            </Modal>
                <div className="header-body">
                    <div className="row align-items-center py-4">
                        <div className="col-lg-6 col-7">
                            <h6 className="h1 d-inline-block mb-0 pop-font">Dashboard <span className="h3 text-muted">/Educational Qualifications &amp; Appointment Type</span></h6>
                            <span className="text-sm d-block">Create and manage staff Educational Qualifications & Appointment Types</span>
                        </div>
                        <div className="col-lg-6 col-5 text-right">
                        </div>
                    </div>
                    {/* Card stats */}
                    <div className="row">
                        <hr className="mx-0" />
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h3 className="card-title mb-0">Qualifications</h3>
                                        </div>
                                        <div className="col">
                                            <div>
                                                <button className="btn btn-outline-primary btn-icon btn-sm float-right" type="button" 
                                                    onClick={this.handleCreateEducationalQualification}
                                                >
                                                    <span className="btn-inner--icon"><i className="fa fa-plus" /></span>
                                                    <span className="btn-inner--text">Add Qualification</span>
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
                                                    <th>Qualification Name</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.qualifications && this.state.qualifications.length > 0
                                                        ?
                                                        this.state.qualifications.map(qualification => {
                                                            return (
                                                                <tr key={qualification.id}>
                                                                    <td>
                                                                        <h5 className="mt-2">{qualification.name}</h5>
                                                                    </td><td>
                                                                        <span onClick={() => this.loadEditData(qualification)} className="h2 cpoint mr-4" data-toggle="modal" data-target=".edit-department-modal"><i className="d-inline fa fa-edit" /></span>
                                                                        <span onClick={() => this.handleDeleteEducationalQualification(qualification)} className="h2 cpoint" data-toggle="modal" data-target=".delete-department-modal"><i className="fa fa-trash" /></span>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                        : null
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h3 className="card-title mb-0">Appointment Type</h3>
                                        </div>
                                        <div className="col">
                                            <div>
                                                <button className="btn btn-outline-primary btn-icon btn-sm float-right" type="button" data-toggle="modal" data-target=".new-qualification-modal">
                                                    <span className="btn-inner--icon"><i className="fa fa-plus" /></span>
                                                    <span className="btn-inner--text">New Appointment Type</span>
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
                                                    <th>Type</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.types && this.state.types.length > 0 ?
                                                        this.state.types.map(department => {
                                                            return (
                                                                <tr key={department.id}>
                                                                    <td>
                                                                        <h5 className="mt-2">{department.name}</h5>
                                                                    </td><td>
                                                                        <span  className="h2 cpoint mr-4" data-toggle="modal" data-target=".edit-qualification-modal"><i className="d-inline fa fa-edit" /></span>
                                                                        <span className="h2 cpoint" data-toggle="modal" data-target=".delete-qualification-modal"><i className="fa fa-trash" /></span>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                        : null
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid mt--6">
                    <div>
                    </div>
                    <div className="modal fade new-qualification-modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header border-bottom">
                                    <h2 className="mb-0" id="exampleModalScrollableTitle">Add New Type</h2>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">

                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Type Name</label>
                                                    <input className="form-control" type="text" name="qualification" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                                </div>
                                                <button className="btn btn-primary" onClick={() => this.addType()}>Create Type</button>

                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-sm text-white" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade edit-qualification-modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header border-bottom">
                                    <h2 className="mb-0" id="exampleModalScrollableTitle">Edit Type</h2>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">

                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Type Name</label>
                                                    <input className="form-control" type="text" name="unitName" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                                </div>
                                                <button onClick={() => this.updateType()} className="btn btn-primary">Edit Type</button>

                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-sm text-white" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade delete-qualification-modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header border-bottom">
                                    <h2 className="mb-0" id="exampleModalScrollableTitle">Delete Type?</h2>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <div>
                                            <p>Are you sure you want to delete this ({this.state.name}) record? All items related to it will be affected</p>
                                            <button onClick={() => this.deleteType()} className="btn btn-outline-danger" data-dismiss="modal">Delete</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-sm text-white" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
            



                    <div className="modal fade edit-department-modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header border-bottom">
                                    <h2 className="mb-0" id="exampleModalScrollableTitle">Edit Category</h2>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">

                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Category Name</label>
                                                    <input className="form-control" type="text" name="unitName" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                                </div>
                                                <button onClick={() => this.updateCategory()} className="btn btn-primary">Edit Category</button>

                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-sm text-white" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade delete-department-modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header border-bottom">
                                    <h2 className="mb-0" id="exampleModalScrollableTitle">Delete Category?</h2>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <div>
                                            <p>Are you sure you want to delete this ({this.state.name}) record? All items related to it will be affected</p>
                                            <button onClick={() => this.deleteCategory()} className="btn btn-outline-danger" data-dismiss="modal">Delete</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-sm text-white" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

                 </div>
            </>
        )
    }
}
