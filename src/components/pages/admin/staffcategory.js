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

export default class StaffCategory extends React.Component {

    state = {
        categories: [],
        types: [],
        name: '',
        id:0,
        active:true
    }

    componentDidMount() {

        fetchData('/InstitutionStaffCategories', (data) => {
            this.setState({ categories: data })
        });

        fetchData('/InstitutionStaffTypes', (data) => {
            this.setState({ types: data })
        });

    }

    addCategories = () => {
        if (this.state.name !== '') {
            const category = {
                id: 0,
                name: this.state.name,
                active: this.state.active
            };
            this.setState({createCategory:false})
            postData('/InstitutionStaffCategories', category, (data) => {
                const { categories } = this.state;
                categories.push(data);
                this.setState({ ...this.state, categories, name: '',active: true, });
                this.componentDidMount();
            });
        }
    }

    addType = () => {

        if (this.state.staffTypeName !== '') {
            const type = {
                id: 0,
                name: this.state.staffTypeName,
                active: true
            };
            this.setState({createStaffType:false})

            postData('/InstitutionStaffTypes', type, (data) => {
                const { types } = this.state;
                types.push(data);
                this.setState({ ...this.state, types, name: '',active: true, });
                this.componentDidMount();

            });
        }

    }

  

    loadEditData = (data) => {
        this.setState({
          name: data.name,
          id: data.id,
          active: data.active,
          createCategory: true,
          Title: "Edit",
        });
    
        console.log(data, "data");
      };
    
      handleCreateCategory = () => {
        this.setState({
          createCategory: true,
          name: " ",
          Title: "Add",
        });
      };
      handleDeleteCategory = (data) => {
        this.setState({
          name: data.name,
          id: data.id,
          active: data.active,
          deleteCategory: true,
        });
      };
      closeDelete = () => {
        this.setState({ deleteCategory: false });
      };
    
      initiateUpdate = () => {
        this.setState({spin:true, createCategory:false})
        let selectedData = {
          name: this.state.name,
          id: this.state.id,
          active:true
        };
        editData(`/InstitutionStaffCategories/${this.state.id}`, selectedData, (data) => {
          console.log(data, "Editted");
          this.componentDidMount()
        this.setState({spin:false, notice:true})
    
        });
      };
    
      initiateDelete = () => {
        this.setState({deleteCategory:false})
        deleteData(`/InstitutionStaffCategories/${this.state.id}`, data => {
          console.log(data)
          this.componentDidMount();
        this.setState({notice:true})
    
        })
      }

      //Staff Type

      loadEditData2 = (data) => {
        this.setState({
          staffTypeName: data.name,
          id: data.id,
          active: data.active,
          createStaffType: true,
          Title: "Edit",
        });
    
        console.log(data, "data");
      };
    
      handleCreateStaffType = () => {
        this.setState({
          createStaffType: true,
          staffTypeName: " ",
          Title: "Add",
        });
      };
      handleDeleteStafftype = (data) => {
        this.setState({
          name: data.name,
          id: data.id,
          active: data.active,
          deleteStaffType: true,
        });
      };
      closeDelete2 = () => {
        this.setState({ deleteStaffType: false });
      };
    
      initiateUpdate2 = () => {
        this.setState({spin:true, createStaffType:false})
        let selectedData = {
          name: this.state.staffTypeName,
          id: this.state.id,
          active:true
        };
        editData(`/InstitutionStaffTypes/${this.state.id}`, selectedData, (data) => {
          console.log(data, "Editted");
          this.componentDidMount()
        this.setState({spin:false, notice:true})
    
        });
      };
    
      initiateDelete2 = () => {
        this.setState({deleteStaffType:false})
        deleteData(`/InstitutionStaffTypes/${this.state.id}`, data => {
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
        {this.state.deleteCategory ? (
          <DeleteCard
            message={`Delete ${this.state.name}?`}
            confirmBtn={true}
            closeBtn={true}
            closeCard={this.closeDelete}
            confirm={this.initiateDelete}
          />
        ) : null}


{this.state.deleteStaffType ? (
          <DeleteCard
            message={`Delete ${this.state.name}?`}
            confirmBtn={true}
            closeBtn={true}
            closeCard={this.closeDelete2}
            confirm={this.initiateDelete2}
          />
        ) : null}
            <Modal isOpen={this.state.createCategory}>
                <ModalBody>
                
                                <div className="modal-header border-bottom">
                                    <h2 className="mb-0" id="exampleModalScrollableTitle">{this.state.Title} Staff Category</h2>
                                    <button type="button" className="close"
                                        onClick={()=>{this.setState({createCategory:false})}}
                                    >
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Category Name</label>
                                                    <input className="form-control" type="text" name="unit" defaultValue={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                                </div>
                                                {this.state.Title == "Add" ? <button className="btn btn-primary" onClick={() => this.addCategories()}>Create Category</button> : 
                                                <button className="btn btn-primary" onClick={this.initiateUpdate}>Update Category</button>
                                                
                                                }

                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-sm text-white"  onClick={()=>{this.setState({createCategory:false})}}>Close</button>
                                </div>
                     
                </ModalBody>
            </Modal>
                
                
                
                <div className="header-body">
                    <div className="row align-items-center py-4">
                        <div className="col-lg-6 col-7">
                            <h6 className="h1 d-inline-block mb-0 pop-font">Dashboard <span className="h3 text-muted">/Staff Category &amp; Staff Type</span></h6>
                            <span className="text-sm d-block">Create and manage staff category & types.</span>
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
                                            <h3 className="card-title mb-0">Staff Category</h3>
                                        </div>
                                        <div className="col">
                                            <div>
                                                <button className="btn btn-outline-primary btn-icon btn-sm float-right" type="button" 
                                                    onClick={this.handleCreateCategory}
                                                >
                                                    <span className="btn-inner--icon"><i className="fa fa-plus" /></span>
                                                    <span className="btn-inner--text">New Category</span>
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
                                                    <th>Category Name</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.categories && this.state.categories.length > 0
                                                        ?
                                                        this.state.categories.map(unit => {
                                                            return (
                                                                <tr key={unit.id}>
                                                                    <td>
                                                                        <h5 className="mt-2">{unit.name}</h5>
                                                                    </td><td>
                                                                        <span onClick={() => this.loadEditData(unit)} className="h2 cpoint mr-4" ><i className="d-inline fa fa-edit" /></span>
                                                                        <span onClick={() => this.handleDeleteCategory(unit)} className="h2 cpoint"><i className="fa fa-trash" /></span>
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

                        {/* Staff Type */}

                        <Modal isOpen={this.state.createStaffType}>
                <ModalBody>
                
                                <div className="modal-header border-bottom">
                                    <h2 className="mb-0" id="exampleModalScrollableTitle">{this.state.Title} Staff Type</h2>
                                    <button type="button" className="close"
                                        onClick={()=>{this.setState({createStaffType:false})}}
                                    >
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Staff Type</label>
                                                    <input className="form-control" type="text" name="unit" defaultValue={this.state.staffTypeName} onChange={(e) => { this.setState({ staffTypeName: e.target.value }) }} />
                                                </div>
                                                {this.state.Title == "Add" ? <button className="btn btn-primary" onClick={() => this.addType()}>Create Staff Type</button> : 
                                                <button className="btn btn-primary" onClick={this.initiateUpdate2}>Update Staff Type</button>
                                                
                                                }

                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-sm text-white"  onClick={()=>{this.setState({createStaffType:false})}}>Close</button>
                                </div>
                     
                </ModalBody>
            </Modal>
                
                
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h3 className="card-title mb-0">Staff Type</h3>
                                        </div>
                                        <div className="col">
                                            <div>
                                                <button className="btn btn-outline-primary btn-icon btn-sm float-right" type="button" onClick={this.handleCreateStaffType}>
                                                    <span className="btn-inner--icon"><i className="fa fa-plus" /></span>
                                                    <span className="btn-inner--text">New Type</span>
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
                                                        this.state.types.map(cat => {
                                                            return (
                                                                <tr key={cat.id}>
                                                                    <td>
                                                                        <h5 className="mt-2">{cat.name}</h5>
                                                                    </td><td>
                                                                        <span onClick={() => this.loadEditData2(cat)} className="h2 cpoint mr-4" data-toggle="modal" data-target=".edit-unit-modal"><i className="d-inline fa fa-edit" /></span>
                                                                        <span onClick={() => this.handleDeleteStafftype(cat)} className="h2 cpoint" data-toggle="modal" data-target=".delete-unit-modal"><i className="fa fa-trash" /></span>
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
                
            </>
        )
    }
}
