import React, {useEffect, useState} from 'react';
import tableService from "../services/BoardService";
import {Box, Pagination} from "@mui/material";
import UserService from "../services/UserService";
import {useNavigate} from "react-router-dom";

const pageSize = 8;

const HomePagination = ({setTables, tableCreated, tableChange, type}) => {

    const user = UserService.getCurrentUser()

    const navigate = useNavigate();

    const [pagination, setPagination] = useState({
        count: 0,
        from: 0,
        to: pageSize
    })

    useEffect(() => {
        switch (type){
            case 'favorites':
                tableService.getFavorites(user.email, "desc", pagination.from, pagination.to)
                    .then(res => {
                        setPagination({...pagination, count: res.totalElements});
                        setTables(res.data);
                    })
                break
            case 'archived':
                tableService.getArchived(user.email, "desc", pagination.from, pagination.to)
                    .then(res => {
                        setPagination({...pagination, count: res.totalElements});
                        setTables(res.data);
                    })
                break
            case 'home':
                tableService.getAll(user.email, "desc", pagination.from, pagination.to)
                    .then(res => {
                        setPagination({...pagination, count: res.totalElements});
                        setTables(res.data);
                    })
                break
            default:
                navigate('/pagenotfound/404')
                break
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