import React from "react";
import {range} from "lodash";
import Pagination from 'react-responsive-pagination';

const PagingComponent = ({pageId,total,handlePaging,eachPerPage})=>{
    let totalPages = range(1,Math.ceil(total/eachPerPage)+1).length

    return (
        <div className={"row"}>
            <Pagination
                total={totalPages}
                current={pageId}
                onPageChange={page => handlePaging(page)}
            />
        </div>
    );
}
export default PagingComponent
