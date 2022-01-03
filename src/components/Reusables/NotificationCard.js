import React from "react"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
 
  } from "reactstrap";
import checkIcon2 from "../../images/checkIcon2.png"

  


const NotificationCard = (props) => {
    return(
        <>
        <Modal isOpen>
            <ModalBody>
    <ModalHeader className="text-secondary">{props.systemNotice ? <span className="badge badge-danger">System Notice!</span> : null}</ModalHeader>
    {props.checkIcon ? <div className="row justify-content-center">
              <img src={checkIcon2} style={{width:"60px"}}/>
              </div>:null}

                    <h3 className="text-center sofia">{props.message}</h3>
                </ModalBody>
                        <ModalFooter>
                                {props.okBtn ? <Button className="ok-btn" color={"info"} onClick={props.closeCard}>
                                    OK
                                </Button> : null}
                                {props.addMoreBtn ? <Button className="ok-btn" color={"success"} onClick={props.confirm}>
                                    Add More
                                </Button> : null}
                                {props.okBtnDanger ? <Button className="ok-btn" color={"danger"} onClick={props.closeCard}>
                                    Close
                                </Button> : null}
                                {props.confirmBtn ? <Button className="ok-btn" color={"success"} onClick={props.confirm}>
                                    Confirm
                                </Button> : null}
                                {props.closeBtn ? <Button className="ok-btn" color={"danger"} onClick={props.closeCard}>
                                    Cancel
                                </Button>:null}
                               
                        </ModalFooter>
                </Modal>
        </>
    )
}
export default NotificationCard;