import React from "react"
import { fetchData, postData, editData, deleteData } from "../../../utils/crud"
import _ from "lodash"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DeleteCard from "../../Reusables/NotificationCard";
import Notice from "../../Reusables/NotificationCard";
import Spinner from "../admin/Spinner"


// import ReactTable from "react-table";
// import ReactTable from "react-table"

export default class Broadcast extends React.Component {
    state = {
        broadcast:{
            "name": "",
            "venue": "",
            "date": new Date(),
            "id": 0
          },
        broadcasts : [],
        // createEvent:true


    }

    updateBroadcastItem = (index, value) => {
        const { broadcast } = this.state;
        broadcast[index] = value;
        this.setState({ ...this.state, broadcast });
    }

    loadBroadcasts = () => {
        fetchData('/Broadcasts', (data) => {
            console.log(data, "borad")
            this.setState({ broadcasts: _.reverse(data) })
        });
    }

    componentDidMount() {

        this.loadBroadcasts();
        // this.setState({
        //     data: {name: "Miracle"}
        // })

    }

    setSelectedData = (data) => {

        const { broadcast } = this.state;
        broadcast.subject = data.subject;
        broadcast.details = data.details;
        broadcast.id = data.id;

        this.setState({...this.state,broadcast})

    }

    isValidInputs = () => {

        return true;
    }

    submitForm = () => {
        this.setState({
            spin:true,
            createEvent:false
        })

        let eventLoad = {
            subject: this.state.name,
            details: this.state.venue,
            rankId:4,
            date: "2021-01-01"
        }
            postData('/Broadcasts', eventLoad, (data) => {
                const { broadcasts } = this.state;
                this.componentDidMount()
                this.setState({ ...this.state, broadcasts, spin:false, notice:true })
            });
        
    }

    updateForm = () => {
        if (this.isValidInputs()){
            editData(`/Broadcasts/${this.state.broadcast.id}`, this.state.broadcast, (data) => {
                this.loadBroadcasts();
            });
            this.loadBroadcasts();
        }

    }
    

    deleteNews = () => {

        if (this.state.broadcast.name !== '' && this.state.broadcast.id > 0) {

            deleteData(`/Broadcasts/${this.state.broadcast.id}`, () => {
                fetchData('/Events', (data) => {
                    this.setState({ broadcasts: data })
                });
            });
        }

    
    }
    
    loadEditData = (data) => {
        this.setState({
          name: data.subject,
          venue: data.details,
          date: data.date.substring(0,10),
          id: data.id,
          createEvent: true,
          Title: "Edit",
        });
    
        console.log(data, "data");
      };
    
      handleCreateEvent = () => {
        this.setState({
          createEvent: true,
          name: " ",
          //date:" ",
          venue:" ",
          Title: "Add",
        });
      };
      handleDeleteEvent = (data) => {
        this.setState({
          name: data.name,
          id: data.id,
          active: data.active,
          deleteEvent: true,
        });
      };
      closeDelete = () => {
        this.setState({ deleteEvent: false });
      };
    
      initiateUpdate = () => {
        this.setState({spin:true, createEvent:false})
        let selectedData = {
          subject: this.state.name,
          details: this.state.venue,
          date: "2021-01-01",
          //rankId:4,
          //id: this.state.id,
        };
        postData(`/Broadcasts/EditBroadcast?id=${this.state.id}`, selectedData, (data) => {
        this.componentDidMount()

          console.log(data, "Editted");
        this.setState({spin:false, notice:true})

    
        });
      };
    
      initiateDelete = () => {
        this.setState({deleteEvent:false})
        postData(`/Broadcasts/DeleteBroadcast?id=${this.state.id}`, "", data => {
          console.log(data)
          this.componentDidMount();
        this.setState({notice:true})
    
        })
      }
   

    render() {

        const dto = [{  
            name: 'Ayaan',  
            age: 26  
            },{  
             name: 'Ahana',  
             age: 22  
             },{  
             name: 'Peter',  
             age: 40      
             },{  
             name: 'Virat',  
             age: 30  
             },{  
             name: 'Rohit',  
             age: 32  
             },{  
             name: 'Dhoni',  
             age: 37  
             }]  
         const columns = [{  
           Header: 'Name',  
           accessor: 'name'  
           },{  
           Header: 'Age',  
           accessor: 'age'  
           }]  
       
        return (
            <>

{this.state.notice ? <Notice message={"Action was Successful!"} okBtn={true} closeCard={()=>{this.setState({notice:false})}}/> : null}
      {this.state.spin ? <Spinner/> : null}
        {this.state.deleteEvent ? (
          <DeleteCard
            message={`Delete ${this.state.name}?`}
            confirmBtn={true}
            closeBtn={true}
            closeCard={this.closeDelete}
            confirm={this.initiateDelete}
          />
        ) : null}
                  {/* <ReactTable  
                  data={dto}  
                  columns={columns}  
                  defaultPageSize = {2}  
                  pageSizeOptions = {[2,4, 6]}  
              />  */}
                <div className="header-body">
                    <div className="row align-items-center py-4">
                        <div className="col-lg-6 col-7">
                            <h6 className="h1 d-inline-block mb-0 pop-font">Dashboard <span className="h3 text-muted">/ ..Broadcast/News</span></h6>
                        </div>
                        <div className="col-lg-6 col-5 text-right">
                        </div>
                    </div>
                    {/* Card stats */}
                    <div className="row">
                        <hr className="mx-0" />
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h3 className="card-title mb-0 float-left mr-3">Broadcasts</h3>
                                        </div>
                                        <div className="col">
                                            <div>
                                                <button className="btn btn-outline-primary btn-icon btn-sm float-right mr-3" type="button" 
                                                onClick={this.handleCreateEvent}
                                                >
                                                    <span className="btn-inner--icon"><i className="fa fa-plus" /></span>
                                                    <span className="btn-inner--text">Post Broadcast</span>
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
                                                    <th>S/No</th>
                                                    <th>Subject</th>
                                                    <th>Details</th>
                                                    <th>Date</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {

                                                    this.state.broadcasts && this.state.broadcasts.length > 0 ?
                                                        this.state.broadcasts.map((broadcast, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td> {index + 1} </td>
                                                                    <td>{broadcast?.subject.length > 50 ? broadcast?.subject.substring(0,50)+"...": broadcast?.subject}</td>
                                                                    <td>{broadcast?.details.length > 50 ? broadcast?.details.substring(0,50) + "..." : broadcast?.details}</td>
                                                                    <td>{broadcast?.date != null ? broadcast?.date.substring(0,10) : null}</td>
                                                                    <td className="td-actions">
                                                                        <button onClick={()=>this.loadEditData(broadcast)} type="button" rel="tooltip" className="btn btn-primary btn-icon btn-sm " data-toggle="modal" data-target=".edit-level-modal">
                                                                            <i className="fa fa-edit pt-1" />
                                                                        </button>
                                                                         <button onClick={()=>this.handleDeleteEvent(broadcast)} type="button" rel="tooltip" className="btn btn-danger btn-icon btn-sm " data-toggle="modal" data-target=".delete-level-modal">
                                                                            <i className="fa fa-trash pt-1" />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                        :
                                                        null
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

                    <Modal isOpen={this.state.createEvent}>
                        
                        <div className="new-level-modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel">
                            <div className="modal-content">
                                <div className="modal-header border-bottom">
                                    <h2 className="mb-0" id="exampleModalScrollableTitle">{this.state.Title} Broadcast</h2>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                    onClick={()=>{this.setState({createEvent:false})}}
                                    >
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="row">

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Subject</label>
                                                    <input className="form-control" type="text" name="Subject" 
                                                    onChange={(e) => { this.setState({name:e.target.value})}} 
                                                    defaultValue={this.state.name}
                                                    
                                                    />
                                                </div>
                                            </div>
{/* 
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Date</label>
                                                    <input className="form-control" type="date" name="Subject" 
                                                    onChange={(e) => { this.setState({date:e.target.value})}} 
                                                    defaultValue={this.state.date}
                                                    
                                                    />
                                                </div>
                                            </div> */}

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Details</label>
                                                    <textarea className="form-control" 
                                                    defaultValue={this.state.venue}
                                                    onChange={(e) => { this.setState({venue:e.target.value})}} 

                                                    >
                                                    </textarea>
                                                </div>
                                            </div>


                                        </div>
                                        {this.state.Title == "Add" ? <button type="button" onClick={() => this.submitForm()} data-dismiss="modal" className="btn btn-primary">Add Broadcast</button> :
                                        <button type="button" onClick={this.initiateUpdate} data-dismiss="modal" className="btn btn-primary">Update Broadcast</button>
                                        }
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal"
                                    onClick={()=>{this.setState({createEvent:false})}}
                                    
                                    >Close</button>
                                </div>
                            </div>
                    </div>
                    </Modal>



                    <div className="modal fade edit-level-modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header border-bottom">
                                    <h2 className="mb-0" id="exampleModalScrollableTitle">Edit News</h2>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Subject</label>
                                                    <input className="form-control" type="text" value={this.state.broadcast.subject} name="Subject" onChange={(e) => { this.updateBroadcastItem('subject', e.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Details</label>
                                                    <textarea className="form-control" value={this.state.broadcast.details} onChange={(e) => { this.updateBroadcastItem('details', e.target.value) }}>

                                                    </textarea>
                                                </div>
                                            </div>
                                            <button type="button" onClick={() => this.updateForm()} data-dismiss="modal" className="btn btn-primary">Submit</button>

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade delete-level-modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header border-bottom">
                                    <h2 className="mb-0" id="exampleModalScrollableTitle">Delete Staff?</h2>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <div>
                                            <p>Are you sure you want to delete this record? All items related to it will be affected</p>
                                            <button data-dismiss="modal" onClick={() => this.deleteNews()} className="btn btn-outline-danger">Delete</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



{/* 
                <ReactTable
                       data={this.state.broadcast}
                       columns={[
                             {
                               Header: "Index",
                               accessor: "index"
                             },
                             {
                               Header: "Status",
                               accessor: "status"
                             },
                             {
                               Header: "Name",
                               accessor: "name"
                              }
                            ]}
                     defaultPageSize={10}
                     className="-striped -highlight"
                    /> */}





            </>
        )
    }
}
