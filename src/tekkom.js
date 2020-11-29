import React, { Component } from "react";
import axios from "axios";
import { Modal } from "antd";
import "antd/dist/antd.css";
export default class tekkom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tekkom: [],
      visible: false,
      name: "",
      gender: "",
      asal: "",
      url : "http://api.tvmaze.com/shows/1/cast"};}

  handleButton = (name) => {alert(name);};
  
  handleTambahOrang = () => {this.setState({visible: true,});};
  
  handleNama = (e) => { this.setState({name: e.target.value,});
    console.log(this.state.name);};
  
  handleGender = (e) => {this.setState({gender: e.target.value,});
    console.log(this.state.gender);};

  handleAsal = (e) => {this.setState({asal: e.target.value,});
    console.log(this.state.asal);};

  handleSubmit = () => {
    if ( this.state.name !== "" && this.state.gender !== "" && !this.state.asal !== "") {
      axios({
        method: "post",
        url: this.state.url + "/add",
        headers: {
          accept: "*/*",},
        data: {
          name: this.state.nama,
          gender: this.state.gender,
          asal: this.state.asal,},})
        .then((data) => {
          alert("berhasil menambahkan"); window.location.reload();})
        .catch((error) => {alert("gagal menambahkan");});
    } else {alert("pastikan semua kolom terisi");}};
  
    componentDidMount() {
    axios({method: "get", url: "http://api.tvmaze.com/shows/1/cast", headers: {accept: "*/*",},})
      .then((data) => {console.log(data.data); this.setState({tekkom: data.data, }); })
      .catch((error) => { console.log(error); }); }

  render() { return ( <div>
        <div className="boxWhite">
          <center> <h1>LIST ARTIS TV</h1> </center>
          <center> <button onClick={this.handleTambahOrang}>Tambah Artis</button> </center>
          <Modal
            title="Tambah Orang" centered visible={this.state.visible}
            onOk={this.handleSubmit}
            onCancel={() => this.setState({ visible: false })}
            width={500} >
            <div style={{ textAlign: "center" }}>
              <p>Nama : </p>{" "}
              <input type="text"
                placeholder="nama"
                onChange={this.handleNama}/><br/>
              <p>Gender : </p>{" "}
              <input type="text" 
              placeholder="gender" 
              onChange={this.handleGender} /><br/>
              <p>Asal : </p>{" "} 
              <input  type="text"
                placeholder="asal"
                onChange={this.handleAsal} />  <br/> </div> </Modal>

          {this.state.tekkom.map((results, index) => {
            return (
              <div className="card" key={results.id}>
                    <div className="card-body" >
                  <h5 className="card-title">Nama : {results.person.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Gender : {results.person.gender}
                  </h6>
                  <p className="card-text">Asal : {results.person.country.name}</p>
                  <img src={results.person.image.medium} style={{height:'100px'}} />
                </div>
                <button style={{backgroundColor:'cyan'}}
                  className="button"
                  onClick={() => this.handleButton("Nama: "+results.person.name+
                  "\nTanggal lahir: "+results.person.birthday+
                  "\nAsal: "+results.person.country.name+
                  "\nTimezone: "+results.person.country.timezone)}
                > {" "} Cek </button>  </div> );})}</div></div>);}}
