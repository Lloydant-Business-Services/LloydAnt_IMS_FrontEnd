import React from "react"
import { fetchData, postData, editData, deleteData, URL } from "../../../utils/crud"
import axios from "axios"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,

} from "reactstrap";
import Notification from "../../Reusables/NotificationCard"
import DeleteCard from "../../Reusables/NotificationCard";
import Notice from "../../Reusables/NotificationCard";
import Spinner from "../admin/Spinner"

export default class Asset extends React.Component {
  state = {
    assets: [],
    assetTypes: [],
    name: "",
    id: 0,
    assetTypeId: 0,
    active: true,
    payLoad: JSON.parse(localStorage.getItem("userData")),

  }

  componentDidMount() {
 

this.loadAssets();
this.loadAssetTypes();
    
  }

  loadAssetTypes = () => {
    const currentState = this;
     const AuthStr = 'Bearer '.concat(this.state.payLoad.token);
 
     
     axios.get(URL +  '/AssetTypes', {
       headers: {
         'Authorization': AuthStr
       }
     })
     .then((response) => {
       console.log(response.data, "AssetType!!!!!!")
       currentState.setState({
         assetTypes: response.data
       })
       
     })
 
   }


  loadAssets = () => {
    const currentState = this;
     const AuthStr = 'Bearer '.concat(this.state.payLoad.token);
 
     
     axios.get(URL +  '/Assets', {
       headers: {
         'Authorization': AuthStr
       }
     })
     .then((response) => {
       currentState.setState({
         assets: response.data
       })
       
     })
 
   }

   openAssetCard = () => {

 
     this.setState({
       createAssetCard:true,
       name: " "
     })
   }

  addAssetType = () => {
    if (this.state.name !== "") {
      const assetType = {
        
        name: this.state.assetTypeName,
        active: this.state.active,
      }
      this.setState({createAssetType:false})

      postData("/AssetTypes", assetType, data => {
        const { assetTypes } = this.state
        assetTypes.push(data)
        this.componentDidMount();

        this.setState({ ...this.state, assetTypes, name: "", active: true })
      })
    }
  }

  addAsset = () => {
    if (this.state.name !== "" && this.state.assetTypeId > 0) {
      const asset = {
        id: 0,
        assetTypeId: parseInt(this.state.assetTypeId),
        name: this.state.name,
        active: true,

      }
      this.setState({createAsset:false})
      postData("/Assets", asset, data => {
        
        this.setState({added:true})
        this.loadAssets();
        console.log(data, "Added")
      })
    } else {
      alert("Select all fields!")
    }
  }

  loadAssetEditData = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      assetTypeId:data.assetTypeId,
      createAssetCard: true,
      Title: "Edit",
    });

    console.log(data, "data");
  };

  handleCreateAsset = () => {
    this.setState({
      createAssetCard: true,
      name: " ",
      Title: "Add",
    });
  };
  handleDeleteAsset = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      deleteAsset: true,
    });
  };
  closeDelete2 = () => {
    this.setState({ deleteAsset: false });
  };

  initiateUpdate2 = () => {
    this.setState({spin:true, createAssetCard:false})
    let selectedData = {
      name: this.state.name,
      assetTypeId: parseInt(this.state.assetTypeId),
      id: this.state.id,
      active:true
    };
    editData(`/Assets/${this.state.id}`, selectedData, (data) => {
      console.log(data, "Editted");
      this.componentDidMount()
    this.setState({spin:false, notice:true})

    });
  };

  initiateDelete2 = () => {
    this.setState({deleteAsset:false})
    deleteData(`/Assets/${this.state.id}`, data => {
      console.log(data)
      this.componentDidMount();
    this.setState({notice:true})

    })
  }






///////////////////



  loadEditData = data => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      assetTypeId: data.assetTypeId || 0,
    })
  }
  

  loadAssetTypeEditData = (data) => {
    this.setState({
      assetTypeName: data.name,
      id: data.id,
      active: data.active,
      createAssetType: true,
      Title: "Edit",
    });

    console.log(data, "data");
  };

  handleCreateAssetType = () => {
    this.setState({
      createAssetType: true,
      assetTypeName: " ",
      Title: "Add",
    });
  };
  handleDeleteAssetType = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      deleteAssetType: true,
    });
  };
  closeDelete = () => {
    this.setState({ deleteAssetType: false });
  };

  initiateUpdate = () => {
    this.setState({spin:true, createAssetType:false})
    let selectedData = {
      name: this.state.assetTypeName,
      id: this.state.id,
      active:true
    };
    editData(`/AssetTypes/${this.state.id}`, selectedData, (data) => {
      console.log(data, "Editted");
      this.componentDidMount()
    this.setState({spin:false, notice:true})

    });
  };

  initiateDelete = () => {
    this.setState({deleteAssetType:false})
    deleteData(`/AssetTypes/${this.state.id}`, data => {
      console.log(data)
      this.componentDidMount();
    this.setState({notice:true})

    })
  }


  

  render() {
    return (
      <div className="content__inner">



{this.state.notice ? <Notice message={"Action was Successful!"} okBtn={true} closeCard={()=>{this.setState({notice:false})}}/> : null}
      {this.state.spin ? <Spinner/> : null}
        {this.state.deleteAssetType ? (
          <DeleteCard
            message={`Delete ${this.state.name}?`}
            confirmBtn={true}
            closeBtn={true}
            closeCard={this.closeDelete}
            confirm={this.initiateDelete}
          />
        ) : null}


{this.state.notice ? <Notice message={"Action was Successful!"} okBtn={true} closeCard={()=>{this.setState({notice:false})}}/> : null}
      {this.state.spin ? <Spinner/> : null}
        {this.state.deleteAsset ? (
          <DeleteCard
            message={`Delete ${this.state.name}?`}
            confirmBtn={true}
            closeBtn={true}
            closeCard={this.closeDelete2}
            confirm={this.initiateDelete2}
          />
        ) : null}


      {this.state.added ? <Notification 
      message={"Added!"}
      okBtn={true}
      closeCard={()=>{this.setState({added:false})}}
      /> : null}

<Modal isOpen={this.state.createAssetCard}>
  <ModalHeader></ModalHeader>
  <ModalBody>
  <div className="modal-header border-bottom">
                  <h2 className="mb-0" id="exampleModalScrollableTitle">
                    {this.state.Title} New Asset
                  </h2>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true" 
                        onClick={() => {this.setState({createAssetCard:false})}}
                    
                    >×</span>
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
                          Asset Name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="unit"
                          id = "ass-name"
                          defaultValue={this.state.name}
                          onChange={e => {
                            this.setState({ name: e.target.value })
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Asset Type
                        </label>
                        <select
                          className="form-control"
                          onChange={e => {
                            this.setState({ assetTypeId: e.target.value })
                          }}
                        >
                          <option>Select Asset Type</option>
                          {this.state.assetTypes &&
                            this.state.assetTypes.length > 0
                            ? this.state.assetTypes.map(assetType => {
                              return (
                                <option
                                  key={assetType.id}
                                  value={assetType.id}
                          selected={assetType.id == this.state.assetTypeId}

                                >
                                  {assetType.name}
                                </option>
                              )
                            })
                            : null}
                        </select>
                      </div>
                      {this.state.Title == "Add" ? <button
                        type="button"
                        data-dismiss="modal"
                        className="btn btn-primary"
                        onClick={() => this.addAsset()}
                      >
                        Create Asset
                      </button> : 
                       <button
                       type="button"
                       data-dismiss="modal"
                       className="btn btn-primary"
                       onClick={this.initiateUpdate2}
                     >
                       Update Asset
                     </button>
                      }
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm text-white"
                    onClick={() => {this.setState({createAssetCard:false})}}
                    
                  >
                    Close
                  </button>
                </div>
  </ModalBody>
  <ModalFooter></ModalFooter>
</Modal>

                
            {/* AssetType Section */}


            <Modal isOpen={this.state.createAssetType}>
  <ModalHeader></ModalHeader>
  <ModalBody>
  <div className="modal-header border-bottom">
                  <h2 className="mb-0" id="exampleModalScrollableTitle">
                    {this.state.Title} New Asset Type
                  </h2>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true" 
                        onClick={() => {this.setState({createAssetType:false})}}
                    
                    >×</span>
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
                          Asset Type Name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="unit"
                          id = "ass-name"
                          defaultValue={this.state.assetTypeName}
                          onChange={e => {
                            this.setState({ assetTypeName: e.target.value })
                          }}
                        />
                      </div>
              
                      {this.state.Title == "Add" ? <button
                        type="button"
                        data-dismiss="modal"
                        className="btn btn-primary"
                        onClick={() => this.addAssetType()}
                      >
                        Add Asset Type
                      </button>: 
                      <button
                      type="button"
                      data-dismiss="modal"
                      className="btn btn-primary"
                      onClick={this.initiateUpdate}
                    >
                      Update Asset Type
                    </button>
                      }
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm text-white"
                    onClick={() => {this.setState({createAssetType:false})}}
                    
                  >
                    Close
                  </button>
                </div>
  </ModalBody>
  <ModalFooter></ModalFooter>
</Modal>

       
          










        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h6 className="h1 d-inline-block mb-0 pop-font mobile__font__header">
                Asset Management{" "}
                <span className="h3 text-muted mobile__font__size">/Add &amp; View</span>
              </h6>
             
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
          </div>
          {/* Card stats */}
          <div className="row">
            <hr className="mx-0" />
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="card-title mb-0">Organization Asset</h3>
                    </div>
                    <div className="col">
                      <div>
                        <button
                          className="btn btn-outline-primary btn-icon btn-sm float-right"
                          type="button"
                          onClick={this.openAssetCard}

                        >
                          <span className="btn-inner--icon">
                            <i className="fa fa-plus" />
                          </span>
                          <span className="btn-inner--text">New Asset</span>
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
                          <th>Asset Name</th>
                          <th>Asset Type</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.assets && this.state.assets.length > 0
                          ? this.state.assets.map(asset => {
                            return (
                              <tr key={asset.id}>
                                <td>
                                  <h5 className="mt-2">{asset.name}</h5>
                                </td>
                                <td>
                                  <h5 className="mt-2">
                                    {asset.assetType.name}
                                  </h5>
                                </td>
                                <td>
                                  <span
                                    onClick={() => this.loadAssetEditData(asset)}
                                    className="h2 cpoint mr-4"
                                    data-toggle="modal"
                                    data-target=".edit-unit-modal"
                                  >
                                    <i className="d-inline fa fa-edit" />
                                  </span>
                                  <span
                                    onClick={() => this.handleDeleteAsset(asset)}
                                    className="h2 cpoint"
                                    data-toggle="modal"
                                    data-target=".delete-unit-modal"
                                  >
                                    <i className="fa fa-trash" />
                                  </span>
                                </td>
                              </tr>
                            )
                          })
                          : null}
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
                      <h3 className="card-title mb-0">
                        Organization Asset Types
                      </h3>
                    </div>
                    <div className="col">
                      <div>
                        <button
                          className="btn btn-outline-primary btn-icon btn-sm float-right"
                          type="button"
                         onClick={this.handleCreateAssetType}
                        >
                          <span className="btn-inner--icon">
                            <i className="fa fa-plus" />
                          </span>
                          <span className="btn-inner--text">
                            New Asset Type
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
                          <th>Asset Type</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.assetTypes &&
                          this.state.assetTypes.length > 0
                          ? this.state.assetTypes.map(assetType => {
                            return (
                              <tr key={assetType.id}>
                                <td>
                                  <h5 className="mt-2">{assetType.name}</h5>
                                </td>
                                <td>
                                  <span
                                    onClick={() =>
                                      this.loadAssetTypeEditData (assetType)
                                    }
                                    className="h2 cpoint mr-4"
                                   
                                  >
                                    <i className="d-inline fa fa-edit" />
                                  </span>
                                  <span
                                    onClick={() =>
                                      this.handleDeleteAssetType(assetType)
                                    }
                                    className="h2 cpoint"
                                   
                                  >
                                    <i className="fa fa-trash" />
                                  </span>
                                </td>
                              </tr>
                            )
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
            className="modal fade edit-unit-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h2 className="mb-0" id="exampleModalScrollableTitle">
                    Edit Asset
                  </h2>
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
                          Asset Name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="unitName"
                          value={this.state.name}
                          onChange={e => {
                            this.setState({ name: e.target.value })
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Asset Type
                        </label>
                        <select
                          className="form-control"
                          onChange={e => {
                            this.setState({ assetTypeId: e.target.value })
                          }}
                        >
                          <option>Select Asset Type</option>
                          {this.state.assetTypes &&
                            this.state.assetTypes.length > 0
                            ? this.state.assetTypes.map(assetType => {
                              return (
                                <option
                                  key={assetType.id}
                                  selected={
                                    assetType.id == this.state.assetTypeId
                                  }
                                  value={assetType.id}
                                >
                                  {assetType.name}
                                </option>
                              )
                            })
                            : null}
                        </select>
                      </div>
                      <button
                        type="button"
                        data-dismiss="modal"
                        onClick={() => this.updateAsset()}
                        className="btn btn-primary"
                      >
                        Edit Asset
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
            className="modal fade delete-unit-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h2 className="mb-0" id="exampleModalScrollableTitle">
                    Delete Asset?
                  </h2>
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
                        onClick={() => this.deleteAsset()}
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
          <div
            className="modal fade new-department-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h2 className="mb-0" id="exampleModalScrollableTitle">
                    Add New Asset Type
                  </h2>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
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
            className="modal fade edit-department-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h2 className="mb-0" id="exampleModalScrollableTitle">
                    Edit Asset Type
                  </h2>
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
                          Asset Type Name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="unitName"
                          value={this.state.name}
                          onChange={e => {
                            this.setState({ name: e.target.value })
                          }}
                        />
                      </div>
                      <button
                        onClick={() => this.updateAssetType()}
                        className="btn btn-primary"
                      >
                        Edit Asset Type
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
            className="modal fade delete-department-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h2 className="mb-0" id="exampleModalScrollableTitle">
                    Delete Asset Type?
                  </h2>
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
                        onClick={() => this.deleteAssetType()}
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
      </div>
    )
  }
}
