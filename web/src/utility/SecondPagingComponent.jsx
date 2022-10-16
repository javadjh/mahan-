import React, {useState} from 'react'
import Pagination from 'react-responsive-pagination';
import {range} from "lodash";

const SecondPagingComponent = ({totalPages,currentPage,handlePageChange,eachPerPage})=>{
    totalPages = range(1,Math.ceil(totalPages/eachPerPage)+1).length

    return (
        <Pagination
            total={totalPages}
            current={currentPage}
            onPageChange={page => handlePageChange(page)}
        />
    );
}
export default SecondPagingComponent
