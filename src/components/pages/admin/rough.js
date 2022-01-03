import React, {useState, useContext} from "react"
import MyForm from "./myForm"


function MyHooks() {
   const [moiValue, setFieldValue] = useState("");
    return (
      <>
      
        <MyForm/>
      </>
    );
  }

  export default MyHooks;