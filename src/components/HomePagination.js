import React, {useEffect, useState} from 'react';
import tableService from "../services/TableService";
import {useSelector} from "react-redux";
import {Box, Pagination} from "@mui/material";

const pageSize = 6;

const HomePagination = ({setTables, tableCreated, tableChange}) => {

    const user = useSelector(state => state.activeUser.value[0]);

    const [pagination, setPagination] = useState({
        count: 0,
        from: 0,
        to: pageSize
    })

    useEffect(() => {
        tableService.getAll(user.email, "desc", pagination.from, pagination.to)
            .then(res => {
                setPagination({...pagination, count: res.totalElements});
                setTables(res.data);
            })
    }, [pagination.from, pagination.to, tableCreated, tableChange]);

    const handlePageChange = (event, page) => {
        setPagination({...pagination, from:(page-1)});
    }

    return (
        <div>
            <Box justifyContent={"center"} alignItems={"center"} display={"flex"}
            sx={{
                margin: "20px 0px"
            }}
            >
                <Pagination count={Math.ceil(pagination.count/pageSize)}
                            onChange={handlePageChange}
                />
            </Box>
        </div>
    );
};

export default HomePagination;