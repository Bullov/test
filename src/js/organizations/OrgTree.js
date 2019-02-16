import React from "react"


class OrgTree  extends React.Component{
    constructor(){
        super();
        this.state={
            isLoaded: false,
            error: null,
            data: {}
        }
    }
    componentDidMount() {
        this.loadData();
    }

    loadData(){
        let url="/back/orgs";
        fetch(url).then(res => res.json()).then((result) => {
                this.setState({
                    isLoaded: true,
                    data: result.content
                });
            },
            (error) => {
                this.setState({
                    isLoaded: false,
                    error
                });
            });
    }

    treeRecursion(items, currentRoot){
        let count = 0;
        let result = [];
        result.push(
            items.map(item=>{
                if (item.parentId === currentRoot){
                    let res = [];
                    res.push(<li id={item.id} className={"tree-node"}
                                 onClick={this.whenClicked} >{item.name}</li>);
                    count++;
                    res.push(this.treeRecursion(items, item.id));
                    return(res);
                }
            })
        );
        if (count === 0){
            return null;
        } else {
            return <ul className={currentRoot === null ? "" : "tree-close"}
                       id={currentRoot} >{result}</ul>;
        }
    }

    whenClicked = e =>{
        const id = e.target.id;
        const items = document.getElementsByTagName("ul");
        for (let i=0;i<items.length;i++) {
            if (items.item(i).id === id){
                (items.item(i).className === "") ? items.item(i).className = "tree-close" : items.item(i).className = "";
                break;
            }
        }
    };

    render() {
        if (!this.state.isLoaded){
            return <div className="TestTable">Loading...</div>;
        } else{
            console.log(this.state.data);
            return(
                <div >
                    <div className={"headers"}>
                        <h2>Organization Tree</h2>
                    </div>
                    <div className={"tree"}>
                        {this.treeRecursion(this.state.data,null)}
                    </div>
                </div>
            );
        }
    }
}



export default OrgTree;