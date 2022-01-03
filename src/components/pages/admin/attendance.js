import React from "react"
import { fetchData } from "../../../utils/crud"
import Calendar from "../../calendar"
import Loadable from "react-loadable";

const jsPDF = Loadable({
    loader: () => import("jspdf"),
    loading: React,
  });
  
  const html2canvas = Loadable({
    loader: () => import("html2canvas"),
    loading: React
  });

//Import troublesome modules dynamically
// let jsPDF = null;
// let html2canvas = null;
// (async () => {
//     if (typeof window !== "undefined") {
//       // import module for side effects
//       jsPDF = await import("jspdf");
//       html2canvas = await import("html2canvas");
//     }
//   })();

export default class AdminAttendance extends React.Component {
    state = {
        attendance:[],

    }


    loadAttendance = () => {
        fetchData('/Attendance/AttendanceByMonth', (data) => {
            this.setState({ attendance: data })
        });
    }

     printTest = () => {
		const filename  = 'ThisIsYourPDFFilename.pdf';

        if(typeof window !== "undefined"){
            html2canvas(document.querySelector('#nodeToRenderAsPDF')).then(canvas => {
                let pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(canvas.toDataURL('image/png'), 'PNG', -90, 0, 380, 200);
                pdf.save(filename);
            });
        }
	}


    componentDidMount() {

        this.loadAttendance();

    }


    render() {
        return (
            <>
            
            <button onClick={this.printTest}>Export</button>
                <div className="header-body" id="nodeToRenderAsPDF">
                    <div className="row align-items-center py-4">
                        {/* <div className="col-lg-6 col-7">
                            <h6 className="h1 d-inline-block mb-0 pop-font">Dashboard <span className="h3 text-muted">/Staff Attendance</span></h6>
                        </div> */}
                        <div className="col-lg-6 col-5 text-right">
                        </div>
                    </div>
                    
                    <div className="row justify-content-md-center">
                        <hr className="mx-0" />
                        <div className="col-md-6">
                            <Calendar events={this.state.attendance}/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
