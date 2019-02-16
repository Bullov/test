import React, {Component} from "react"


export class ModalWindowCreateOrg extends Component {
    constructor(){
        super();
        this.onInputChanged = this.onInputChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: "",
            parentId: ""
        }
    }

    onInputChanged(event){
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    }
    onSubmit(event){
        event.preventDefault();
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const options ={
            method: "POST",
            headers: headers,
            credential: "include",
            body: JSON.stringify(this.state)
        };
        const request = new Request("/back/orgs", options);
        fetch(request).then(resp =>{
            if (resp.status === 200){
                this.props.onCreateAction();
            }
        });
        this.setState({
            name: "",
            parentId: ""
        });
    }



    render() {
        return(
            <div className="modal fade" id="createModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New Organization</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="organization-name"
                                           className="col-form-label">Organization name:</label>
                                    <input type="text" className="form-control" id="org-name"
                                           name="name" onChange={this.onInputChanged} value={this.state.name}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="parentId" className="col-form-label">Organization parentId:</label>
                                    <input type="number" className="form-control" id="org-parentId" name="parentId"
                                           min="0" onChange={this.onInputChanged} value={this.state.parentId}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary"
                                    onClick={this.onSubmit}
                            >Create Organization</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export class ModalWindowUpdateOrg extends Component {
    constructor(){
        super();
        this.onInputChanged = this.onInputChanged.bind(this);
        this.state = {
            name: "",
            parentId: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        let parentId = this.props.parentId;
        if (parentId === null) parentId = 0;
        this.setState({
            name: this.props.name,
            parentId: parentId
        });
    }

    onInputChanged(event){
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    }

    handleSave(){
        const item = this.state;
        //console.log(item);
        this.props.onUpdateAction(item);
    }

    render() {
        return(
            <div className="modal fade" id="updateModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Organization</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="organization-name"
                                           className="col-form-label">Organization name:</label>
                                    <input type="text" className="form-control" id="org-name"
                                           name="name" onChange={this.onInputChanged} value={this.state.name}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="parentId" className="col-form-label">Organization parentId:</label>
                                    <input type="number" className="form-control" id="org-parentId"
                                           name="parentId" min="0" onChange={this.onInputChanged}
                                           value={this.state.parentId}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary"
                                    onClick={() => this.handleSave()}
                            >Update Organization</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



export class ModalWindowCreateEmpl extends Component{
    constructor(){
        super();
        this.onInputChanged = this.onInputChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: "",
            orgId: 0,
            bossId: 0

        }
    }
    onInputChanged(event){
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    }
    onSubmit(event){
        event.preventDefault();
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const options ={
            method: "POST",
            headers: headers,
            credential: "include",
            body: JSON.stringify(this.state)
        };
        const request = new Request("/back/employees", options);
        fetch(request).then(resp =>{
            if (resp.status === 200){
                this.props.onCreateAction();
            }
        });
        this.setState({
            name: "",
            orgId: 0,
            bossId: 0
        })
    }
    generateBossList(){
        let bossList = [];
        this.props.empls.map(empl =>{
            if(empl.orgId === this.state.orgId){
                bossList.push(<a className={"dropdown-item"} onClick={(e) => this.bossSelected(e,empl.id)}>{empl.name}</a>);
            }

        });

        return(
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.bossId === 0 ? "Select boss"
                        : this.props.empls.filter(empl=>{if(empl.id === this.state.bossId){return empl}})["0"].name}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {bossList}
                </div>
            </div>
        );
    };

    generateOrgsList(){
        let orgList = [];
        this.props.orgs.map(org =>{
            orgList.push(<a className={"dropdown-item"} onClick={(e) => this.orgSelected(e,org.id)}>{org.name}</a>)
        });
        return(
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.orgId === 0 ? "Select organization"
                        : this.props.orgs.filter(org=>{if(org.id === this.state.orgId){return org}})["0"].name}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {orgList}
                </div>
            </div>
        );
    }
    orgSelected = (e,id) =>{
        this.setState({
            orgId: id
        });
    };
    bossSelected = (e,id) =>{
        this.setState({
            bossId: id
        })
    };
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            ...this.state
        });
    }

    render() {
        if(this.props.orgs === undefined){
            return null;
        } else {
            return(
                <div className="modal fade" id="createModal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">New Employee</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="employee-name" className="col-form-label">Employee name:</label>
                                        <input type="text" className="form-control" id="empl-name" name="name" onChange={this.onInputChanged}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="orgId" className="col-form-label">Employee Organization:</label>
                                        {this.generateOrgsList()}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="bossId" className="col-form-label">Employee Boss:</label>
                                        {this.state.orgId === 0 ? null : this.generateBossList()}
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary"
                                        onClick={this.onSubmit}>Create Employee</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export class ModalWindowUpdateEmpl extends Component {
    constructor(){
        super();
        this.onInputChanged = this.onInputChanged.bind(this);
        this.state = {
            name: "",
            orgId: 0,
            bossId: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        let orgId = this.props.orgId;
        let bossId = this.props.bossId;
        if (orgId === null) orgId = 0;
        if (bossId === null) bossId = 0;
        this.setState({
            name: this.props.name,
            orgId: orgId,
            bossId: bossId,
        });
    }

    onInputChanged(event){
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    }

    handleSave(){
        const item = {
            name: this.state.name,
            orgId: this.state.orgId,
            bossId: this.state.bossId
        };
        this.props.onUpdateAction(item);
    }

    generateBossList(){
        let bossList = [];
        this.props.empls.map(empl =>{
            if(empl.orgId === this.state.orgId){
                bossList.push(<a className={"dropdown-item"} onClick={(e) => this.bossSelected(e,empl.id)}>{empl.name}</a>);
            }

        });

        return(
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.bossId === 0 ? "Select boss"
                        : this.props.empls.filter(empl=>{if(empl.id === this.state.bossId){return empl}})["0"].name}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {bossList}
                </div>
            </div>
        );
    };

    generateOrgsList(){
        let orgList = [];
        this.props.orgs.map(org =>{
            orgList.push(<a className={"dropdown-item"} onClick={(e) => this.orgSelected(e,org.id)}>{org.name}</a>)
        });
        return(
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.orgId === 0 ? "Select organization"
                        : this.props.orgs.filter(org=>{if(org.id === this.state.orgId){return org}})["0"].name}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {orgList}
                </div>
            </div>
        );
    }
    orgSelected = (e,id) =>{
        this.setState({
            orgId: id
        });
    };
    bossSelected = (e,id) =>{
        this.setState({
            bossId: id
        })
    };


    render() {
        return(
            <div className="modal fade" id="updateModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Employee</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="organization-name"
                                           className="col-form-label">Employee name:</label>
                                    <input type="text" className="form-control" id="empl-name"
                                           name="name" onChange={this.onInputChanged} value={this.state.name}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="orgId" className="col-form-label">Employee orgId:</label>
                                    {this.generateOrgsList()}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="bossId" className="col-form-label">Employee bossId:</label>
                                    {this.state.orgId === 0 ? null : this.generateBossList()}
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary"
                                    onClick={() => this.handleSave()}
                            >Update Employee</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}