import React from "react"
import { 
    fetchData, 
    postData, 
    editData, 
    editDataWithPatch,
    deleteData 
} from "../../../utils/crud"
import _ from "lodash"
import { getUser } from "../../../utils/auth"

export default class Job extends React.Component {
    state = {
        jobVacancy: [],
        jobDetails: {
            "jobtitle": "",
            "jobtype": "",
            "jobdescription": "",
            "sectionheaderweights": [],
        },
        applicationSections: {
            "name": ",",
            "description": "",
            "active": "",
            "id": "",
        },
        jobType: {
            "name": "",
            "description": "",
            "active": "",
            "id": "",
        },

        jobTitle: "",
        jobDescription: "",
        jobTypeSelect: 0,
        active: true,
        sectionWt: [],

    }

    componentDidMount() {
        console.log("%c I am in the create Job comopnent", "background-color: red;color:#fff");

        fetchData('/JobVacancy', (data) => {
            this.setState({ jobVacancy: data })
        });

        fetchData('/JobType', (data) => {
            this.setState({ jobType: data })
        });

        fetchData('/ApplicationSectionHeader', (data) => {
            this.setState({ applicationSections: data })
        });

        fetchData('/JobType', (data) => {
            this.setState({ jobType: data })
        });

    }

    setJobType = (e) => {
        this.setState({jobTypeSelect:e.target.value});
    }

    toggleActive = () => {
        if(typeof window !== "undefined"){
            const chekd = document.forms["createjobform"];
            if(chekd.active.checked) {
                this.setState({active: true});
            } else {
                this.setState({active: false});
            }
        }
    }

    activateJob = (vacancyId) => {
        fetchData(`/JobVacancy/${vacancyId}`, (data) => {
            data.active = !data.active;
            const getData = data;

            console.log(getData, 'getData');

            editDataWithPatch(`/JobVacancy/${vacancyId}`, getData, (data) => {
                const { active } = data;
                // if(active) {
                    console.log(data)
                    // const btn = document.getElementById(vacancyId).className = "btn btn-sm btn-danger";
                // }
            });

        });
    }

    addVacancy = () => {
        const { userId } = getUser();
        const { jobTitle, jobTypeSelect, sectionWt } = this.state;

        if (jobTitle !== '' && jobTypeSelect !== '' && (sectionWt && sectionWt.length > 0)) {
            const vacancy = {
                name: this.state.jobTitle,
                description: this.state.jobDescription,
                jobTypeId: parseInt(this.state.jobTypeSelect),
                active: this.state.active,
                dateCreated: new Date(),
                applicationSectionWeight: this.state.sectionWt,
                userId
            };

            // console.log(vacancy.jobTypeId);

            postData('/JobVacancy', vacancy, (data) => {
                const { ranks } = this.state;
                if(ranks && typeof ranks !== "array"){
                    ranks.push(data);
                }
                this.setState({ ...this.state, ranks, name: '',active: true, });
                
                const { user } = data;
                console.table(user);

                console.log(vacancy)
            });

        }
    }

    // consoleMyStuff = (name) => {
    //     console.log("I was trigered atbthe right time: ", name)
    // }

    setSection = (e) => {
        if(e){
            const key = e.target.previousSibling.innerHTML;
            const value = e.target.value;

            const obj = {
                [key]: value
            };

            let objFromLocalStorage = JSON.parse(localStorage.getItem("sections")) || [];
            let arrayOfKeys = [];

            for(let i = 0; i < objFromLocalStorage.length; i++){

                let innerKeyArray = Object.keys(objFromLocalStorage[i]);
                arrayOfKeys.push(...innerKeyArray);
            }

            let keyExists = arrayOfKeys.find(i => i === key);
            let keyExistsIndex = arrayOfKeys.findIndex(i => i === key);

            if(keyExists){
                objFromLocalStorage[keyExistsIndex] = obj;
            }
            else {
                objFromLocalStorage.push(obj); 
            }
            
            localStorage.setItem("sections", JSON.stringify(objFromLocalStorage))
            // console.log(localStorage.getItem("sections"));

            {
                const sections = localStorage.getItem("sections");
                const sec = 
                sections && JSON.parse(localStorage.getItem("sections")).length > 0 ?
                    JSON.parse(localStorage.getItem("sections")).map((section) => {
                        return (
                            [{
                                applicationSectionHeaderId: parseInt(Object.entries(section)[0][0]) ,
                                weight: parseFloat(Object.entries(section)[0][1])+.001
                            }]
                        )
                    })
                : null
                
                this.setState({sectionWt: sec});

                console.log(sec)
            }
        }
    }

    setSelectedData = (data) => {

        const { jobDetails } = this.state;
        jobDetails.jobtitle = data.jobtitle;
        jobDetails.jobtype = data.jobtype;
        jobDetails.jobdescription = data.jobdescription;
        jobDetails.sectionheaderweights = data.sectionheaderweights;

        this.setState({...this.state,jobDetails})
    }

    updateJobTypeItem = (index, value) => {
        const { jobType } = this.state;
        jobType[index] = value;
        this.setState({ ...this.state, jobType });
    }

    
    render() {
        return (
            <>
                <div className="header-body">
                    <div className="row align-items-center py-4">
                        <div className="col-lg-6 col-7">
                            <h6 className="h1 d-inline-block mb-0 pop-font">Dashboard <span className="h3 text-muted">/Job Management</span></h6>
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
                                            <h3 className="card-title mb-0 float-left mr-3">All Jobs</h3>
                                        </div>
                                        <div className="col">
                                            <div>
                                                <button className="btn btn-outline-primary btn-icon btn-sm float-right mr-3" type="button" data-toggle="modal" data-target=".new-vacancy-modal">
                                                    <span className="btn-inner--icon"><i className="fa fa-plus" /></span>
                                                    <span className="btn-inner--text">Create Job</span>
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
                                                    <th>Job Title</th>
                                                    <th>Created By</th>
                                                    <th>Created On</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                                {
                                                    this.state.jobVacancy && this.state.jobVacancy.length > 0 ? 
                                                    this.state.jobVacancy.map((vacancy, index) => {
                                                            
                                                        return (
                                                            <tr key={index}>
                                                                <td> {index + 1} </td>
                                                                <td>{vacancy.name}</td>
                                                                {/* <td> {vacancy.user.staff.person.surname} {vacancy.user.staff.person.firstname} {vacancy.user.staff.person.othername} </td> */}
                                                                <td></td>
                                                                <td>{vacancy.dateCreated}</td>
                                                                
                                                                <td className="td-actions">
                                                                    <button className="btn btn-sm btn-success" id={vacancy.id} onClick={this.activateJob.bind(this, vacancy.id)}>Activate</button>
                                                                    <button onClick={()=>this.setSelectedData(vacancy)} type="button" rel="tooltip" className="btn btn-primary btn-icon btn-sm " data-toggle="modal" data-target=".edit-vacancy-modal">
                                                                        <i className="fa fa-edit pt-1" /> 
                                                                    </button>
                                                                    <button onClick={()=>this.setSelectedData(vacancy)} type="button" rel="tooltip" className="btn btn-danger btn-icon btn-sm " data-toggle="modal" data-target=".delete-vacancy-modal">
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
                    <div className="modal fade new-vacancy-modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header border-bottom">
                                    <h2 className="mb-0" id="exampleModalScrollableTitle">Create Job Vacancy</h2>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form id="createjobform">
                                        <div className="row">

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Job Title</label>
                                                    <input className="form-control" type="text" name="title" onChange={(e) => { this.setState({ jobTitle: e.target.value }) }} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Job Type</label>
                                                    <select className="form-control" name="jobtype" onChange={this.setJobType} > 
                                                        <option>Select Job Type</option>
                                                        {
                                                            this.state.jobType && this.state.jobType.length > 0 ?   
                                                                this.state.jobType.map((type) => {
                                                                    return (
                                                                        <option key={type.id} value={type.id}>{type.name}</option>
                                                                    )
                                                                })
                                                            :
                                                            null
                                                        }
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Job Description</label>
                                                    <textarea className="form-control" name="description" onChange={(e) => { this.setState({ jobDescription: e.target.value }) }}>
                                                    </textarea>
                                                </div>
                                            </div>
                                        
                                            <div className="col-md-12">
                                                <div className="form-group mb-0">
                                                    <label htmlFor="activecheck" className="form-control-label mr-3">Active</label>
                                                    <input id="activecheck" name="active" type="checkbox" 
                                                        defaultChecked={this.state.active} onChange={this.toggleActive}></input>

                                                </div>
                                            </div>
                                            
                                            <div className="col-12">
                                                <hr />
                                                <h3 className="text-center mb-3">Job Criteria and Weight 
                                                <span className="text-sm text-muted font-weight-lighter"> (Add the weight for each application section)</span></h3>
                                            </div>
                                            

                                                    {
                                                        this.state.applicationSections && this.state.applicationSections.length > 0 ?
                                                            this.state.applicationSections.map((sections) => {
                                                                return (

                                                                <div className="col-md-12">
                                                                    <div className="form-group row">
                                                                        <label htmlFor="example-text-input" className="form-control-label col-4 my-auto text-right">{sections.name}</label>
                                                                        <label hidden>{sections.id}</label>
                                                                        <select className="form-control col-6" name="eduweight" onChange={this.setSection.bind(this)}> 
                                                                            {/* this.setSection.bind(sections.name) */}
                                                                            <option>0.0</option>
                                                                            <option>1.0</option>
                                                                            <option>2.0</option>
                                                                            <option>3.0</option>
                                                                            <option>4.0</option>
                                                                            <option>5.0</option>
                                                                            <option>6.0</option>
                                                                            <option>7.0</option>
                                                                            <option>8.0</option>
                                                                            <option>9.0</option>
                                                                            <option>10.0</option>
                                                                        </select>

                                                                    </div>
                                                                </div>
                                                                )
                                                            })
                                                        :
                                                        null
                                                    }

                                        </div>
                                        <button type="button" onClick={() => this.addVacancy()} data-dismiss="modal" className="btn btn-primary">Submit</button> 
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button"className="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="modal fade edit-level-modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
                    </div>*/}
                </div> 


            </>
        )
    }
}
