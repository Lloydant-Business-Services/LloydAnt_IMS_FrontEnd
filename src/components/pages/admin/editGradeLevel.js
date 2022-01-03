import React from "react"
import { fetchData, editData } from "../../../utils/crud"
import { navigate } from "gatsby";

export default class editGradeLevel extends React.Component {

    state = {
        newLevel: this.props.location.state,
        levelName: ""
      
    }

    updateSalaryGradeLevel = () => {

        if (this.state.levelName !== '' && this.state.newLevel.id > 0) {
            const unit = {
                id: this.state.newLevel.id,
                name: this.state.levelName,
                active: this.state.newLevel.active
            };
            editData(`/SalaryLevel/${this.state.id}`, unit, () => {
                fetchData('/SalaryLevel', (data) => {
                    this.setState({ salaryGradeLevel: data })
                });
            });
            // window.location.replace("/app/admin/payroll")

        }
        if(typeof window !== "undefined"){
            navigate("/app/admin/payroll");
            //window.location = "/app/admin/payroll"
        }
    }

componentDidMount(){
    console.log(this.state.newLevel, "checkLevel")
}

    render(){
        return(
            <>
           
            <div className="container">
            <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header border-bottom">
                                    <h4 className="mb-0" id="exampleModalScrollableTitle">Edit Grade Level</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">

                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Step Name</label>
                                                    <input className="form-control" type="text" name="unitName" value={this.state.newLevel.name} 
                                                    onChange={(e) => { this.setState({ levelName: e.target.value }) }} 
                                                    />
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

            </>
        )
    }



}