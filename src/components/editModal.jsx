import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Field, Form, Formik } from 'formik';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { userService } from '../services/userService';
import * as Yup from 'yup';
const theme = createTheme();

export function EditModal({ userToUpdate, closeEditModal, updateMsg }) {
    const textFieldOutline = (props) => (
        <TextField {...props} margin="normal" required fullWidth />
    );
    const finishUpdating = async (values) => {
        await userService.updateUser(values);
        closeEditModal();
        updateMsg({ msg: 'User Updated', type: 'success' });
    };

    const SignupSchema = Yup.object().shape({
        firstname: Yup.string()
            .max(15, 'Too Long!')
            .matches(/^[a-zA-Z]+$/g, 'Invalid First Name'),
        lastname: Yup.string()
            .max(15, 'Too Long!')
            .matches(/^[a-zA-Z]+$/g, 'Invalid Last Name'),
    });
    return (
        <div className="edit-modal">
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Update User
                        </Typography>

                        <Formik
                            validationSchema={SignupSchema}
                            initialValues={{
                                id: userToUpdate.id,
                                firstname: userToUpdate.firstname,
                                lastname: userToUpdate.lastname,
                            }}
                            onSubmit={async (values) => {
                                await finishUpdating(values);
                            }}
                        >
                            {({ errors }) => (
                                <Form>
                                    <Field
                                        as={textFieldOutline}
                                        id="id"
                                        name="id"
                                        placeholder="#########"
                                        type="text"
                                        label="ID"
                                        disabled
                                    />
                                    <Field
                                        as={textFieldOutline}
                                        id="firstname"
                                        name="firstname"
                                        placeholder="First Name"
                                        type="text"
                                        label="First Name"
                                    />
                                    {errors.firstname ? (
                                        <div>{errors.firstname}</div>
                                    ) : null}
                                    <Field
                                        as={textFieldOutline}
                                        id="lastname"
                                        name="lastname"
                                        placeholder="Last Name"
                                        type="text"
                                        label="Last Name"
                                    />
                                    {errors.lastname ? (
                                        <div>{errors.lastname}</div>
                                    ) : null}
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Update User
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}
