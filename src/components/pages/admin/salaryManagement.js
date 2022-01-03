import React from "react"
import { fetchData, postData,editData,deleteData } from "../../../utils/crud"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  
  } from "reactstrap";

export default class salaryManagement extends React.Component {

    state = {
        salaryStep: [],
        steps: [],
        name: '',
        id:0,
        active:true,
        added:false,
        stepName:""

    }

    componentDidMount() {

        fetchData('/SalaryStep', (data) => {
            this.setState({ salaryStep: data })
        });

        fetchData('/SalaryStep', (data) => {
            this.setState({ steps: data })
        });

    }

    addSalaryStep = () => {
        if (this.state.name !== '') {
            const department = {
                id: 0,
                name: this.state.name,
                active: this.state.active
            };
            postData('/SalaryStep', department, (data) => {
                const { salaryStep } = this.state;
                salaryStep.push(data);
                this.setState({ ...this.state, salaryStep, name: '',active: true, added:true, createSalaryStep:false });
                this.componentDidMount();
            });
        }
    }

    addUnit = () => {

        if (this.state.name !== '') {
            const step = {
                id: 0,
                name: this.state.name,
                active: true
            };
            postData('/SalaryStep', step, (data) => {
                const { steps } = this.state;
                steps.push(data);
                this.setState({ ...this.state, steps, name: '',active: true, });
            });
        }

    }
    clearInput = ()=>{
        if(typeof window !== "undefined"){
            document.getElementById('myInp').value = "";
        }
    }

    closeAdded = () =>{
        this.setState({
            added: false
        })
    }

    updateUnit = () => {

        if (this.state.name !== '' && this.state.id > 0) {
            const step = {
                id: this.state.id,
                name: this.state.name,
                active: this.state.active
            };
            editData(`/SalaryStep/${this.state.id}`, step, () => {
                fetchData('/SalaryStep', (data) => {
                    this.setState({ steps: data })
                });
            });
        }

    }

    deleteUnit = () => {

        if (this.state.name !== '' && this.state.id > 0) {

            deleteData(`/SalaryStep/${this.state.id}`, () => {
                fetchData('/SalaryStep', (data) => {
                    this.setState({ steps: data })
                });
            });
            
            this.componentDidMount();
            // if(typeof window !== "undefined"){
            //     window.location.reload(true)
            // }
        }

    }



    deleteDepartment = () => {

        if (this.state.name !== '' && this.state.id > 0) {

            deleteData(`/SalaryStep/${this.state.id}`, () => {
                fetchData('/SalaryStep', (data) => {
                    this.setState({ salaryStep: data })
                });
            });
        }

    }

    loadEditData = (data) => {
        this.setState({
            name: data.name,
            id: data.id,
            active: data.active
        })
    }

    handleCreateStep = () => {
        this.setState({
            createSalaryStep:true,
            name: " "
        })
    }

    render() {
        return (
            <>

            <Modal isOpen={this.state.createSalaryStep}>
                <ModalBody>
              
                                <div className="modal-header border-bottom">
                                    <h4 className="mb-0" id="exampleModalScrollableTitle">Add New Salary Step</h4>
                                    <button type="button" className="close" onClick={()=>{this.setState({createSalaryStep:false})}} aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Step Name</label>
                                                    <input id="myInp" className="form-control" type="text" name="step" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                                </div>
                                                <button className="btn btn-primary" onClick={() => this.addSalaryStep()} data-dismiss="modal">Create Step</button>

                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-sm text-white" onClick={()=>{this.setState({createSalaryStep:false})}}>Close</button>
                                </div>
                        
                </ModalBody>
            </Modal>

                {this.state.added == true ? <div className="jumbo-back" onClick={this.cancelEmpty}>
                    <div className="container">
                    <div className="jumbotron empty-alert">
                        <h5>Successfully Added! <i className="fa fa-check-circle" style={{fontSize:"30px", color:"green"}}></i></h5>
                        <hr/>
                        <button className="btn btn-danger ok-btn" onClick={this.closeAdded}>OK</button>
                            </div>
                        </div>
                </div> : null} 

                <div className="header-body">
                    <div className="row align-items-center py-4">
                        <div className="col-lg-6 col-7">
                            <h1 className="d-inline-block mb-0 pop-font">Salary Step Management <span className="h3 text-muted"></span></h1>
                            <span className="text-sm d-block">Create and manage  Salary Steps.</span>
                        </div>
                        <div className="col-lg-6 col-5 text-right">
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="form-group col-md-7">

                            <div className="row justify-content-center">
                                <div className="col-md-10">
                                    <label htmlFor="example-text-input" className="form-control-label">Steps per Level</label>
                                    <input className="form-control" type="number" name="steps" />
                                </div>
                                <div className="col-md-2">                        
                                    <span className=" btn btn-primary mt-3rem" onClick={() => this.addSalaryStep()}>Save</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    

                    {/* Card stats */}
                    <div className="row justify-content-center">
                        <hr className="mx-0" />
                        <div className="col-md-7 mt-4">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h4 className=" mb-0">Salary Step</h4>
                                        </div>
                                        <div className="col">
                                            <div>
                                                <button className="btn btn-outline-primary btn-icon btn-sm float-right" type="button" 
                                                onClick={this.handleCreateStep}
                                                >
                                                    <span className="btn-inner--icon"><i className="fa fa-plus" /></span>
                                                    <span className="btn-inner--text">New Salary Step</span>
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
                                                    <th>Level Name</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                        
                                                {

                                                    this.state.salaryStep && this.state.salaryStep.length > 0
                                                        ?
                                                        this.state.salaryStep.map(step => {
                                                            return (
                                                                <tr key={step.id}>
                                                                    <td>
                                                                        <h5 className="mt-2">{step.name}</h5>
                                                                    </td><td>
                                                                        <span onClick={() => this.loadEditData(step)} className="h2 cpoint mr-4" data-toggle="modal" data-target=".edit-step-modal"><i className="d-inline fa fa-edit" /></span>
                                                                        <span onClick={() => this.loadEditData(step)} className="h2 cpoint" data-toggle="modal" data-target=".delete-step-modal"><i className="fa fa-trash" /></span>
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
          

                    <div className="modal fade edit-step-modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header border-bottom">
                                    <h4 className="mb-0" id="exampleModalScrollableTitle">Edit Step</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">

                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Step Name</label>
                                                    <input className="form-control" type="text" name="unitName" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                                </div>
                                                <button onClick={() => this.updateSalaryGradeLevel()} className="btn btn-primary">Edit Level</button>

                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-sm text-white" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="modal fade delete-step-modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header border-bottom">
                                    <h4 className="mb-0" id="exampleModalScrollableTitle">Delete Step?</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <div>
                                            <p>Are you sure you want to delete this ({this.state.name}) record? All items related to it will be affected</p>
                                            <button onClick={() => this.deleteUnit()} className="btn btn-outline-danger" data-dismiss="modal">Delete</button>
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
