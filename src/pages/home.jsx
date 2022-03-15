import { IconButton, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Modals } from '../components/Modals';
import { userService } from '../services/userService';
import MuiAlert from '@mui/material/Alert';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export function Home() {
    const [users, setUsers] = useState([]);
    const [editOpen, setEditOpen] = useState(false);
    const [userToUpdate, setUserToUpdate] = useState(null);
    const [currMsg, setCurrMsg] = useState(null);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        loadUsers();
    }, []);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const loadUsers = async () => {
        const users = await userService.getUsers();
        setUsers((prev) => (prev = users));
    };

    const openEditModal = () => {
        setEditOpen((prev) => (prev = true));
    };

    const closeEditModal = async () => {
        setEditOpen((prev) => (prev = false));
        await loadUsers();
        setUserToUpdate((prev) => (prev = null));
    };

    const removeUser = async (removeUserId) => {
        try {
            await userService.removeUser(removeUserId);
            await loadUsers();

            setCurrMsg(
                (prev) => (prev = { msg: 'User Removed', type: 'success' })
            );
            handleClick();
        } catch (err) {
            setCurrMsg((prev) => (prev = err));
        }
    };

    const updateUser = async (user) => {
        setUserToUpdate((prev) => (prev = user));
        setEditOpen((prev) => (prev = true));
    };

    const updateMsg = (msg) => {
        setCurrMsg((prev) => (prev = msg));
        handleClick();
    };
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    if (!users.length) return <div className="loader"></div>;
    return (
        <section className="main-section">
            <h1>Users Table</h1>
            <Table className="main-table">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>First Name</Th>
                        <Th>Last Name</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map((user) => (
                        <Tr key={user.id}>
                            <Td>{user.id}</Td>
                            <Td>{user.firstname}</Td>
                            <Td>{user.lastname}</Td>
                            <Td className="actions">
                                <button
                                    className="remove-btn"
                                    onClick={() => removeUser(user.id)}
                                >
                                    remove
                                </button>
                                <button
                                    className="update-btn"
                                    onClick={() => updateUser(user)}
                                >
                                    update
                                </button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <button className="add-btn" onClick={openEditModal}>
                Add Field
            </button>
            {editOpen ? (
                <>
                    <div
                        onClick={closeEditModal}
                        className="black-screen"
                    ></div>
                    <Modals
                        updateMsg={updateMsg}
                        userToUpdate={userToUpdate}
                        closeEditModal={closeEditModal}
                    />
                </>
            ) : (
                <></>
            )}

            {currMsg && (
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity={currMsg.type}
                        sx={{ width: '100%' }}
                    >
                        {currMsg.msg}
                    </Alert>
                </Snackbar>
            )}
        </section>
    );
}
