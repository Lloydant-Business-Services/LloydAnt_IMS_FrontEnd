
import React from "react";
import logosm from "../../../images/yy.jpg"
import ImgsViewer from 'react-images-viewer'
import Viewer from 'react-viewer';
 import Dept from "../../store"




import { PDFDownloadLink, Document, Page, Text, View, PDFViewer, Image, Font} from '@react-pdf/renderer'
import MyDocument from "./MyDocument"
import { QRCode } from "react-qr-svg";
import { fetchData, editData, URL, imageURL } from "../../../utils/crud";
// import { Document, Page } from 'react-pdf';
// import { PDFViewer } from 'react-view-pdf';
import eee from "../../eee.pdf"
import ReactToPrint from 'react-to-print';




export default class App extends React.Component {
    state = { 
      staffDocx: this.props.location.state.data,
      imageTrans: this.props.location.state.docImg
    }
  
    componentDidMount() {
      console.log(this.state.staffDocx, "StaffDoxx")
      setTimeout(()=>{
        this.setState({
            text:true,
        })
    },3000)
      setTimeout(()=>{
          this.setState({
              imageLink: this.state.staffDocx?.imageUrl
          })
      },6000)
    }
  
    render() {
      let dee = this.state.imageTrans;
      return (
          <>

{/* <PDFViewer url={eee} /> */}
        {/* <PDFViewer width={1000} height={800}>
          <Document title={this.state.staffDocx?.documentName}>
          {this.state.text ? <Page style={{padding:"40px", fontSize:"11", color:"#b3b3b3"}}>
      <Image src={logosm}/>
       <Image src={dee}/>
        <Image src={{uri:this.state.staffDocx?.imageUrl, method: 'GET', headers:{'Access-Control-Allow-Origin': '*'}}}/>
           
      
       <View style={{position:"absolute", top:"20", left:"50", zIndex:"900"}}>
           
           <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
            <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
            <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
            <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
            <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
            <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
            <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
            <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
            <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
            <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
            <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
            <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
            <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
            <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
            <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
            <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
            <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
            <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
             <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
             <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
             <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
             <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
             <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
             <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
             <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
             <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
             <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
             <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
             <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
             <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
             <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
             <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
             <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
             <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
             <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
              <Text className="water-mark" style={{marginBottom:"10px", opacity:"0.3"}}>NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY &nbsp; NNAMDI AZIKIWE UNIVERSITY</Text>
          
          
       </View>

      
      
     
    
            </Page> : null}
          </Document>
        </PDFViewer> */}

        <div className="App">
       {/* <h1>Hello QR</h1> */}
       <br/>
       {/* <div>
        <QRCode
          value="https://www.whistlerplatinumproperties.com"
          renderAs="svg"
          style={{
            width: "30vmin",
            height: "30vmin"
          }}
        />
      </div> */}
     
    </div>
    <ReactToPrint
    pageStyle={{width:"800px"}}
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return <a href="#">Print this out!</a>;
          }}
          content={() => this.componentRef}
        />
         <Dept ref={el => (this.componentRef = el)} />

    {/* <img src={dee}/> */}
    
  
        </>
      )
    }
  }










// import React from 'react';
// import ReactDOM from 'react-dom';
// import { PDFViewer } from '@react-pdf/renderer'
// // import MyDocument from "../admin/MyDocument"
 
// const App = () => (
//   <PDFViewer>
//     {/* <MyDocument /> */}
//   </PDFViewer>
// );
 
// ReactDOM.render(<App />, document.getElementById('root'));

// import React from "react";
// import { render } from "react-dom";
// import QRCode from "qrcode.react";

// // import "./styles.css";

// export default function App() {
//   return (
//     <div className="App">
//       {/* <h1>Hello QR</h1> */}
//       <br/>
//       <div>
//         <QRCode
//           value="https://www.whistlerplatinumproperties.com"
//           renderAs="svg"
//           style={{
//             width: "30vmin",
//             height: "30vmin"
//           }}
//         />
//       </div>
//     </div>
//   );
// }


// const rootElement = document.getElementById("root");
// render(<App />, rootElement);
// import React from "react";
// import {Page, Text, View, Document, StyleSheet, Image, PDFViewer} from "@react-pdf/renderer";
// import { QRCode } from "react-qr-svg";


// export function PdfDocument(props) {
//     return (
//         <Document>
//         <Page size="A4">    
//           <View>
//             <Text>Section #1</Text>
//           </View>
//           <View>
//             <Text>Section #2</Text>
//             <QRCode
//                 bgColor="#FFFFFF"
//                 fgColor="#000000"
//                 level="Q"
//                 style={{ width: 256 }}
//                 value="some text"
//             />
//           </View>
//         </Page>
//       </Document>
//     );
// }

// export default App;












// import React from 'react';
// import { useQRCode } from 'react-hook-qrcode';

// function App() {
//   const [inputRef] = useQRCode({
//     text: 'Miracle Goodspeed',
//     options: {
//       level: 'M',
//       margin: 7,
//       scale: 1,
//       width: 200,
     
//     },
//   });
  
//   return <canvas ref={inputRef} />;
// };

// export default App;