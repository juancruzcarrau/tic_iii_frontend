import React, {useEffect, useState} from 'react';
import tableService from "../services/BoardService";
import {Box, Pagination} from "@mui/material";
import UserService from "../services/UserService";

const pageSize = 8;

const HomePagination = ({setTables, tableCreated, tableChange, type}) => {

    const user = UserService.getCurrentUser()

    const [pagination, setPagination] = useState({
        count: 0,
        from: 0,
        to: pageSize
    })

    useEffect(() => {
        if (type === 'favorites'){
            tableService.getFavorites(user.email, "desc", pagination.from, pagination.to)
                .then(res => {
                    setPagination({...pagination, count: res.totalElements});
                    setTables(res.data);
                })
        }else {
            tableService.getAll(user.email, "desc", pagination.from, pagination.to)
                .then(res => {
                    setPagination({...pagination, count: res.totalElements});
                    setTables(res.data);
                })
        }
    }, [tableCreated ,pagination.from, pagination.to, tableChange, type]);

    const handlePageChange = (event, page) => {
        setPagination({...pagination, from:(page-1)});
    }

    return (
        <div style={{position: "relative"}}>
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