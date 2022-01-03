import React from "react"
import "./form.css"
import { fetchData, URL as url } from "../../../utils/crud"
import axios from "axios"
//import { URL as url } from "../../../utils/crud"

export default class FormIndex extends React.Component {
  state = {
    lastName: "",
    firstName: "",
    otherName: "",
    address: "",
    dateOfBirth: "",
    stateOfOrigin: "",
    phone: "",
    email: "",
    maritalStatus: "",
    maritalStatuses: [],
    states: [],
    religion: "",
    religions: [],
    lga: "",
    lgas: [],
    gender: "",
    genders: [],
    stateValue: [],
    lgaValue: [],
    maritalStatusValue: [],
    genderValue: [],
    religionValue: [],
    file: "",
    imageFile: "",
    imagePath: "",
  }

  async componentDidMount() {
    await fetchData("/States", data => {
      this.setState({ states: data })
    })
    await fetchData("/MaritalStatus", data => {
      this.setState({ maritalStatuses: data })
    })
    await fetchData("/Religions", data => {
      this.setState({ religions: data })
    })
    await fetchData("/Genders", data => {
      this.setState({ genders: data })
    })
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.stateOfOrigin != this.state.stateOfOrigin) {
      await fetchData(
        `/Lgas/byStateId/?id=${this.state.stateOfOrigin}`,
        data => {
          this.setState({ lgas: data })
        }
      )
      let stateValue = this.state.states.filter(
        state => state.id == this.state.stateOfOrigin
      )
      this.setState({ stateValue })
    }

    if (prevState.lga != this.state.lga) {
      let lgaValue = this.state.lgas.filter(lga => lga.id == this.state.lga)
      this.setState({ lgaValue })
    }

    if (prevState.maritalStatus != this.state.maritalStatus) {
      let maritalStatusValue = this.state.maritalStatuses.filter(
        maritalStatus => maritalStatus.id == this.state.maritalStatus
      )
      this.setState({ maritalStatusValue })
    }

    if (prevState.gender != this.state.gender) {
      let genderValue = this.state.genders.filter(
        gender => gender.id == this.state.gender
      )
      this.setState({ genderValue })
    }

    if (prevState.religion != this.state.religion) {
      let religionValue = this.state.religions.filter(
        religion => religion.id == this.state.religion
      )
      this.setState({ religionValue })
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  previewFile = e => {
    this.setState({
      file: URL.createObjectURL(e.target.files[0]),
      imageFile: e.target.files[0],
    })
  }

  uploadImage = async () => {
    if (this.state.imageFile) {
      const formData = new FormData()

      const file = this.state.imageFile
      console.log(file)

      formData.append("file", file)

      try {
        const res = await axios({
          method: "POST",
          url: url + "/Upload/UploadSingleFile",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
        return this.setState({ imagePath: res.data.dbPath })
      } catch (err) {
        return console.log(err)
      }
    }
  }

  render() {
    return (
      <div>
        <fieldset>
          <div className="text-center">
            <h2 className="fs-title font-weight-700">BioData</h2>
            <h3 className="fs-subtitle mb-5">Your personal information</h3>
          </div>



          <div className="row text-left mb-5">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="text-input" className="form-control-label">
                  Image Upload
                </label>
                <input
                  className="form-control"
                  type="file"
                  name="image"
                  onChange={this.previewFile}
                />
                <img
                  src={this.state.file}
                  style={{ width: 200, height: 200 }}
                />
                <button onClick={this.uploadImage}>Upload</button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="text-input" className="form-control-label">
                  Last Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="lastName"
                  onChange={this.handleChange}
                  value={this.state.lastName}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="text-input" className="form-control-label">
                  First Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="firstName"
                  onChange={this.handleChange}
                  value={this.state.firstName}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="text-input" className="form-control-label">
                  Other Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="otherName"
                  onChange={this.handleChange}
                  value={this.state.otherName}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="text-input" className="form-control-label">
                  Phone
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="phone"
                  onChange={this.handleChange}
                  value={this.state.phone}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="text-input" className="form-control-label">
                  Email
                </label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="text-input" className="form-control-label">
                  Address
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="address"
                  onChange={this.handleChange}
                  value={this.state.address}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="text-input" className="form-control-label">
                  Date of Birth
                </label>
                <input
                  className="form-control"
                  type="date"
                  name="dateOfBirth"
                  onChange={this.handleChange}
                  value={this.state.dateOfBirth}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="text-input" className="form-control-label">
                  State of Origin
                </label>
                <select
                  className="form-control"
                  name="stateOfOrigin"
                  onChange={this.handleChange}
                  value={this.state.stateOfOrigin}
                  required
                >
                  <option value={0}>Select State of Origin</option>
                  {this.state.states.map(state => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="text-input" className="form-control-label">
                  LGA
                </label>
                <select
                  className="form-control"
                  name="lga"
                  onChange={this.handleChange}
                  value={this.state.lga}
                  required
                >
                  <option>Select LGA</option>
                  {this.state.lgas &&
                    this.state.lgas.map(lga => (
                      <option key={lga.id} value={lga.id}>
                        {lga.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="text-input" className="form-control-label">
                  Marital Status
                </label>
                <select
                  className="form-control"
                  name="maritalStatus"
                  onChange={this.handleChange}
                  value={this.state.maritalStatus}
                  required
                >
                  <option>Select Marital Status</option>
                  {this.state.maritalStatuses.map(status => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="text-input" className="form-control-label">
                  Religion
                </label>
                <select
                  className="form-control"
                  name="religion"
                  onChange={this.handleChange}
                  value={this.state.religion}
                  required
                >
                  <option>Select Religion</option>
                  {this.state.religions.map(religion => (
                    <option key={religion.id} value={religion.id}>
                      {religion.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="text-input" className="form-control-label">
                  Gender
                </label>
                <select
                  className="form-control"
                  name="gender"
                  onChange={this.handleChange}
                  value={this.state.gender}
                  required
                >
                  <option>Select Gender</option>
                  {this.state.genders.map(gender => (
                    <option key={gender.id} value={gender.id}>
                      {gender.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        
        
        
        
        </fieldset>
      </div>
    )
  }
}
