import React, { Component } from "react"

import { fetchData, editData } from "../../../utils/crud"
import logo from "../../../images/ziklogosm.png"
import Spinner from "./Spinner"



class ViewCV extends Component {
    state = {
        applicantCV: this.props.location.state.personId,
        education: [],
        appInfo: {person: {
             surname: "",
             firstname : "",
             othername: "",
             birthDay:"",
             address:"",
             gender:"",
             phoneNumber:"",
             religion:{
               name: ""
             },
             state:{
              name: ""
            },
          
            }
        },
        Gender:{
            name: ""
        },
        maritalStatus:{
          name: ""
      },
      lga:{
        name: ""
      },
      eduQualification:{
        name:""
      },
      spin:false
    }

    // testMap = ()=>{
    //   let applicantArr = [];

    //   applicantArr = this.state.appInfo.personEducations.map(app => {
    //     return{
    //      inst : app.institution
    //       }
        
    //   })
    //   console.log(applicantArr, "App Array")
      
    //   this.setState({
    //     education : applicantArr
    //   })
    //   console.log(this.state.education, "Educa")
          
    // }
    

  componentDidMount(){
   
    console.log(this.state.applicantCV, "Hereeeeee")
    fetchData(`/ApplicationForms/GetApplicantCV?personId=${this.state.applicantCV}`, (data) => {
      this.setState({ appInfo: data })

      let applicantArr = [];
      let proBodies = [];
      let journals = [];
      let workExperience = [];
      let researchGrant = [];
      let certification = [];
      let referee = [];


      workExperience = this.state.appInfo?.personExperiences?.map(p => {
        return{
         organisation : p.organisation,
         role: p.role,
         startDate: p.startDate,
         endDate: p.endDate,
        
         
          }
        
      })
      console.log(workExperience, "Work Experience")
      this.setState({
        workExperience : workExperience
      })

      referee= this.state.appInfo.personReferees.map(p => {
        return{
         name : p.name,
         organisation: p.organisation,
         designation: p.designation,
         email: p.email,
        
         
          }
        
      })
      console.log(referee, "Referee")
      this.setState({
        referees : referee
      })

      certification = this.state.appInfo.personCertifications.map(p => {
        return{
         name : p.name,
         issuer: p.issuer,
         year: p.year,
         
          }
        
      })
      console.log(certification, "Certification")
      this.setState({
        certifications : certification
      })

      researchGrant = this.state.appInfo.personResearchGrants.map(p => {
        return{
         name : p.name,
         topics: p.topic,
         year: p.year,
         
          }
        
      })
      console.log(researchGrant, "Grants")
      this.setState({
        researchGrants : researchGrant
      })

      journals = this.state.appInfo.personJournals.map(p => {
        return{
         name : p.name,
         publisher: p.publisher,
         year: p.year,
         
          }
        
      })
      console.log(journals, "journals")
      this.setState({
        journal : journals
      })

      proBodies = this.state.appInfo.personProfessionalBodies.map(p => {
        return{
         name : p.name,
         year: p.year,
         comments: p.comments
         
          }
        
      })
      console.log(proBodies, "Pro Bodies")
      this.setState({
        professionalBodies : proBodies
      })
      

      applicantArr = this.state.appInfo.personEducations.map(app => {
        return{
         inst : app.institution,
         course: app.course,
         year: app.year,
         qualificationId: app.educationalQualificationId
          }
        
      })
      console.log(applicantArr, "App Array")
     
      this.setState({
        education : applicantArr
      })
      setTimeout(()=>{
        console.log(this.state.education, "Educa")

      },3000)
   
      console.log(this.state.appInfo, "Applicant")
      console.log(this.state.appInfo.personEducations, "Persons Education")


  


       fetchData(`/Genders/${this.state.appInfo.person.genderId}`, (data) => {
        this.setState({ Gender: data })
       console.log(this.state.Gender, "Gender")
    });

    fetchData(`/MaritalStatus/${this.state.appInfo.person.maritalStatusId}`, (data) => {
      this.setState({ maritalStatus: data })
     console.log(this.state.maritalStatus, "MaritalStatus")
  });

  // fetchData(`/EducationalQualifications/${this.state.education.qualificationId}`, (data) => {
  //   this.setState({ eduQualification: data})
  //  console.log(this.state.eduQualification, "eduQualification")
  // });
  

  fetchData(`/lgas/${this.state.appInfo.person.lgaId}`, (data) => {
    this.setState({ lga: data, spin:false })
   console.log(this.state.lga, "LGA")
});



 
    });

   

  }

    render(){
        return(
            <>
            {this.state.spin ? <Spinner/> : null}
            
            <h3>Applicant Résumé</h3>

            <div className="container marg-top" id="staffCV-card">
                
              
                <div className="text-right" id="m-bot">
                   <button id="cvx" className="btn btn-info" id="cv-download" ><span className="btn-inner--icon"><i className="fa fa-download" /></span> Download CV </button>
                   </div>
              
               <div className="container mt5-pct mb-5" id="curri">
                 <div className="card shadow">
                   <div className="card-body primary-bg">
                     <div className="row">
                       <div className="offset-md-2 col-md-8">
                         <div
                           style={{
                             marginLeft: "auto",
                             marginRight: "auto",
                             width: "50px",
                           }}
                         >
                            <button onClick={this.testMap} className="btn btn-secondary text-right" id={this.state.appInfo?.interviewEmailSent == true ? "inv-stat" : "uninv-stat"}>{this.state.appInfo?.interviewEmailSent == true ? "Invited" : "Uninvited"}</button>
                           {/* <img
                             src={logo}
                             alt="school logo"
                             style={{
                               width: "50px",
                               marginLeft: "auto",
                               marginRight: "auto",
                             }}
                           /> */}
                         </div>
                         <form className="mt-5">
                           <b>BIODATA</b>
                           <hr />
 
                           <div className="form-group row">
                             <label className="col-sm-3">
                               Full Name: <br />
                               <p><b><i>
                              {this.state.appInfo?.person?.surname.toUpperCase()} {this.state.appInfo?.person?.firstname.toUpperCase()} {this.state.appInfo?.person?.othername.toUpperCase()}
                               </i>
                               </b>
                               </p>
                             </label>
 
                             <label className="col-sm-3">
                               Date of Birth :
                               <br />
                            <p><b><i>{this.state.appInfo?.person?.birthDay.slice(0, 10)}</i></b></p>
                             </label>
 
                             <label className="col-sm-3">
                               Gender:
                               <br />
                               <p>
                                   <b>
                                       <i>
                                 {this.state.Gender?.name}
                                 </i>
                                 </b>
                               </p>
                             </label>
 
                             <div
                               className="col-sm-3"
                               style={{ backgroundColor: "grey", width:"100px", height: "120px" }}
                             >
                               <img
                                
                               />
                             </div>
                           </div>
 
                           <div className="form-group row">
                             <label className="col-sm-3">
                               Address:
                               <br />
                               <p>
                                   <b>
                                       <i>
                                 {this.state.appInfo?.person?.address.toUpperCase()}
                                 </i>
                                 </b>
                               </p>
                             </label>
 
                             <label className="col-sm-3">
                               Phone Number:
                               <br />
                               <p>
                                   <b>
                                       <i>
                                 {this.state.appInfo?.person?.phoneNumber}
                                 </i>
                                 </b>
                               </p>
                             </label>
 
                             <label className="col-sm-3">
                               Email Address:
                               <br />
                               <p>
                                   <b>
                                       <i>
                                 {this.state.appInfo?.person?.email}
                                 </i>
                                 </b>
                               </p>
                             </label>
                             <label className="col-sm-3">
                               Marital Status:
                               <br />
                               <p>
                                   <b>
                                       <i>
                                 {this.state.maritalStatus?.name}
                                 </i>
                                 </b>
                               </p>
                             </label>
                           </div>
 
                           <div className="form-group row">
                             <label className="col-sm-3">
                               Religion:
                               <br />
                               <p>
                                   <b>
                                       <i>
                                 {this.state.appInfo?.person?.religion?.name.toUpperCase()}
                                 </i>
                                 </b>
                               </p>
                             </label>
 
                             <label className="col-sm-3">
                               State of Origin:
                               <br />
                               <p>
                                   <b>
                                       <i>
                                 {this.state.appInfo?.person?.state?.name}
                                 </i>
                                 </b>
                               </p>
                             </label>
 
                             <label className="col-sm-3">
                               LGA:
                               <br />
                               <p>
                                   <b>
                                       <i>
                                 {this.state.lga?.name}
                                 </i>
                                 </b>
                               </p>
                             </label>
                           </div>
 
                           <hr />
                           <b>EDUCATION & QUALIFICATIONS</b>
                           <hr />
                           {this.state.education && this.state.education.map((e, i) =>{
                             return(
                              <div className="form-group row">
                              <label className="col-sm-3">
                                Institution Attended:
                                <br />
                                <p> {e.inst}</p>
                              </label>

                              <label className="col-sm-3">
                                Course:
                                <br />
                                <p>{e.course} </p>
                              </label>

                              <label className="col-sm-3">
                                Graduation Year:
                                <br />
                             <p>{e.year}</p>
                              </label>

                              <label className="col-sm-3">
                                Qualification Obtained:
                                <br />
                                <p> </p>
                              </label>
                              <hr />
                            </div>
                             
                             )
                            
                           })
                           
                                }
                            
 
                            <b>PROFESSIONAL BODIES</b>
                           <hr />
                         
                                    {this.state.professionalBodies && this.state.professionalBodies.map(pro =>{
                                    return(
                                    <div className="form-group row">
                                       <label className="col-sm-3">
                                         Organisation:
                                         <br />
                                    <p>{pro.name}</p>
                                       </label>
                                       <label className="col-sm-3">
                                         Comments:
                                         <br />
                                    <p>{pro.comments}</p>
                                       </label>
                                       <label className="col-sm-3">
                                         Year:
                                         <br />
                                    <p>{pro.year}</p>
                                       </label>
                                       
                                       <hr />
                                     </div> )})}
                       
 
                      
                                     <b>JOURNALS</b>
                           <hr />
                         
                                    {this.state.journal && this.state.journal.map(j =>{
                                    return(
                                    <div className="form-group row">
                                       <label className="col-sm-3">
                                         Organisation:
                                         <br />
                                    <p>{j.name}</p>
                                       </label>
                                       <label className="col-sm-3">
                                         Publisher:
                                         <br />
                                    <p>{j.publisher}</p>
                                       </label>
                                       <label className="col-sm-3">
                                         Year:
                                         <br />
                                    <p>{j.year}</p>
                                       </label>
                                       
                                       <hr />
                                     </div> )})}
 
                           <hr />
                           <b>WORK EXPERIENCE</b>
                           <hr />
                         
                                     
                                    {this.state.workExperience && this.state.workExperience.map(j =>{
                                    return(
                                    <div className="form-group row">
                                       <label className="col-sm-3">
                                         Organisation:
                                         <br />
                                    <p>{j.organisation}</p>
                                       </label>
                                       <label className="col-sm-3">
                                         Role:
                                         <br />
                                    <p>{j.role}</p>
                                       </label>
                                       <label className="col-sm-3">
                                         Start Date:
                                         <br />
                                    <p>{j.startDate.slice(0, 10)}</p>
                                       </label>
                                       <label className="col-sm-3">
                                         End Date:
                                         <br />
                                    <p>{j.endDate.slice(0, 10)}</p>
                                       </label>
                                       
                                       <hr />
                                     </div> )})}
                               
 
                           <hr />
                           
                           <b>RESEARCH GRANTS</b>
                           <hr />
                         
                                    {this.state.researchGrants && this.state.researchGrants.map(j =>{
                                    return(
                                    <div className="form-group row">
                                       <label className="col-sm-3">
                                         Organisation:
                                         <br />
                                    <p>{j.name}</p>
                                       </label>
                                       <label className="col-sm-3">
                                         Topic:
                                         <br />
                                    <p>{j.topics}</p>
                                       </label>
                                       <label className="col-sm-3">
                                         Year:
                                         <br />
                                    <p>{j.year}</p>
                                       </label>
                                       
                                       <hr />
                                     </div> )})}
 
                                
                           <hr />



                              
                           <b>CERTIFICATIONS</b>
                           <hr />
                         
                                    {this.state.certifications && this.state.certifications.map(j =>{
                                    return(
                                    <div className="form-group row">
                                       <label className="col-sm-3">
                                         Organisation:
                                         <br />
                                    <p>{j.name}</p>
                                       </label>
                                       <label className="col-sm-3">
                                         Issuer:
                                         <br />
                                    <p>{j.issuer}</p>
                                       </label>
                                       <label className="col-sm-3">
                                         Year:
                                         <br />
                                    <p>{j.year}</p>
                                       </label>
                                       
                                       <hr />
                                     </div> )})}
 
                                
                           <hr />
                        
                          <b>REFEREES</b>
                           <hr />
                          {this.state.referees && this.state.referees.map((r, i) =>{
                            return(

                              <div className="form-group row">
                              <label className="col-sm-3">
                                Name of Referee {i + 1}:
                                <br />
                            <p>{r.name}</p>
                              </label>
                              <label className="col-sm-3">
                                Organisation:
                                <br />
                                <p>{r.organisation}</p>
                              </label>{" "}
                              <label className="col-sm-3">
                                Designation:
                                <br />
                                <p>{r.designation}</p>
                              </label>
                              <label className="col-sm-3">
                                Email:
                                <br />
                                <p>{r.email}</p>
                              </label>
                            </div>
                            )
                          })
                           }
 
                         
 
                           
                         
                         </form>
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


export default ViewCV;