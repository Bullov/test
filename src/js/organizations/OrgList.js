import React from "react"

import CreateModalElement from "../components/CreateModalElement"
import OrgTable from "./OrgTable"
import Pagination from "../components/Pagination"


class OrgList  extends React.Component{
    constructor(){
        super();
        this.state={
            isLoaded: false,
            error: null,
            data: {
                content:{},
                number: 1,
                size: 10,
            },
        }
    }
    componentDidMount() {
        this.loadData();
    }

    loadData(){
        let url="/back/orgs";
        const size = this.state.data.size;
        const page = this.state.data.number;
        if (size > 0 && page >=0){
            url = url + "?size=" + size + "&page=" + page;
        }
        else {
            url = url + "?size=10&page=0";
        }
        fetch(url).then(res => res.json()).then((result) => {
                this.setState({
                    isLoaded: true,
                    data: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: false,
                    error
                });
            });
    }

    onInputChanged = e =>{
        if (e.target.value !== ""){
            let filteredData = this.state.data.content.filter(item =>{
                if (item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1){
                    return item
                } else {
                    return null;
                }
            });
            this.setState({
                data: {
                    ...this.state.data,
                    content: filteredData
                }
            })
        } else {
            this.loadData()
        }
    };

    changePageSize(e){
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                size: parseInt(e.target.text)
            }
        });
    }

    onPageChanged = new_page => {
        //console.log(new_page);
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                number: new_page
            }
        });
    };

    render() {
        //console.log(this.state);
        const itemsNumber = this.state.data.content.length;
        const pageSize = this.state.data.size;
        const totalPages = (itemsNumber%pageSize === 0)? itemsNumber/pageSize : (itemsNumber / pageSize ^ 0) + 1;
        //console.log(totalPages);
        const currentPage = this.state.data.number;
        const offset = (currentPage - 1) * pageSize;
        //console.log("offset:" + offset);

        return(
            <div>
                <div className={"headers"}>
                    <CreateModalElement  type="createOrganization" onCreateAction={() => this.loadData()}/>
                    <OrgTable data={this.state.data.content} offset={offset} pageSize={pageSize}
                              isLoaded={this.state.isLoaded} action={() => this.loadData()}/>
                </div>
                <div className={"pages"}>
                    <Pagination totalPages={totalPages} currentPage={currentPage} pageNeighbours={1}
                                onPageChanged={this.onPageChanged}/>
                    <div className="btn-group">
                        <h6 className={"mr-2 mt-2"}>Page size:</h6>
                        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                            {pageSize}
                        </button>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" onClick={(e) => this.changePageSize(e)}>5</a>
                            <a className="dropdown-item" onClick={(e) => this.changePageSize(e)}>10</a>
                            <a className="dropdown-item" onClick={(e) => this.changePageSize(e)}>15</a>
                        </div>
                    </div>
                    <div className={"mt-1"}>
                        <input type="text" className="form-control" placeholder="Search" aria-label="Search"
                               aria-describedby="basic-addon1"  onChange={this.onInputChanged}/>
                    </div>

                </div>

            </div>
        );
    }
}



export default OrgList;