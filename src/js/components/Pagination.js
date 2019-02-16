import React, {Component, Fragment} from "react";

const RIGHT_PAGE = "RIGHT";
const LEFT_PAGE = "LEFT";

const range=(from, to, step = 1) => {
    let i = from;
    const range = [];
    while (i <= to){
        range.push(i);
        i = i + step;
    }
    return range;
};



class Pagination extends Component{
    constructor(props){
        super(props);
        this.state={
            currentPage: this.props.currentPage
        };
    };
    componentDidMount() {
        this.gotoPage(1);
    };

    fetchPageNumbers = () => {
        const totalPages = this.props.totalPages;
        const currentPage = this.state.currentPage;
        const pageNeighbours = this.props.pageNeighbours;

        const totalShownNumbers = (pageNeighbours * 2) + 3; // [1] .. [4][5](6)[7][8] .. [15]
        const totalShownBlocks = totalShownNumbers + 2; // [>>] and [<<]
        if (totalPages > totalShownBlocks){
            const startPage = Math.max(2, currentPage - pageNeighbours);
            const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

            let pages = range(startPage, endPage);

            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (totalPages - endPage) > 1;
            const spillOffset = totalShownNumbers - (pages.length + 1);

            switch (true) {
                case (hasLeftSpill && !hasRightSpill):{
                    const extraPages = range(startPage - spillOffset, startPage - 1);
                    pages = [LEFT_PAGE, ...extraPages, ...pages];
                    break;
                }
                case (!hasLeftSpill && hasRightSpill):{
                    const extraPages = range(endPage +1 ,endPage + spillOffset);
                    pages = [...pages, ...extraPages, RIGHT_PAGE];
                    break;
                }
                case (hasRightSpill && hasLeftSpill):
                default:{
                    pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                    break;
                }
            }
            return [1, ...pages, totalPages];
        }
        return range(1,totalPages);
    };
    gotoPage = page => {
        const {onPageChanged = f => f} = this.props;
        const currentPage = Math.max(0, Math.min(page, this.props.totalPages));
        const paginationData = currentPage;
        this.setState({currentPage}, () => onPageChanged(paginationData));
    };
    handleClick = page => evt => {
        evt.preventDefault();
        this.gotoPage(page);
    };
    handleMoveLeft = evt => {
        evt.preventDefault();
        this.gotoPage(this.state.currentPage - (this.props.pageNeighbours * 2) - 1);
    };
    handleMoveRight = evt =>{
        evt.preventDefault();
        this.gotoPage(this.state.currentPage + (this.props.pageNeighbours * 2) + 1);
    };


    render() {
        //if (this.totalPages === 1) return null;
        const {currentPage} = this.state;
        const pages = this.fetchPageNumbers();

        return(
            <Fragment>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {pages.map((page) => {
                            if (page === LEFT_PAGE){
                                return(
                                    <li className="page-item">
                                        <a className="page-link" aria-label="Previous" onClick={this.handleMoveLeft}>
                                            <span aria-hidden="true">&laquo;</span>
                                        </a>
                                    </li>
                                );
                            }
                            if (page === RIGHT_PAGE){
                                return(
                                    <li className="page-item">
                                        <a className="page-link" aria-label="Next" onClick={this.handleMoveRight}>
                                            <span aria-hidden="true">&raquo;</span>
                                        </a>
                                    </li>
                                );
                            }
                            if (page === currentPage){
                                return(
                                    <li className={"page-item active"}>
                                        <a className={"page-link"} onClick={this.handleClick(page)}>{page}</a>
                                    </li>
                                );
                            }
                            return(
                                <li className={"page-item"}>
                                    <a className={"page-link"} onClick={this.handleClick(page)}>{page}</a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </Fragment>
        );
    };
}

export default Pagination;