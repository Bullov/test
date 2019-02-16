import React, {Component} from "react"
import {ModalWindowCreateOrg,ModalWindowCreateEmpl} from "./Modal"

class CreateModalElement extends Component{
    render(){
        let modalWindow = null;
        let buttonText = null;
        switch (this.props.type) {
            case "createOrganization":
                modalWindow = <ModalWindowCreateOrg onCreateAction={() => this.props.onCreateAction()}/>;
                buttonText = "Create Organization";
                break;
            case "createEmployee":
                modalWindow = <ModalWindowCreateEmpl onCreateAction={() => this.props.onCreateAction()}
                                                     orgs={this.props.orgs} empls={this.props.empls}/>;
                buttonText = "Create Employee";
                break;
        }


        return(
            <div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#createModal"
                        data-whatever="@mdo">{buttonText}
                </button>
                {modalWindow}
            </div>

        );
    }
}

export default CreateModalElement;