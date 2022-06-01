import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import Fade from "@material-ui/core/Fade";
import validator from "validator";
import { crearContacto } from "../actions/contactAction";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const CreateContacts = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cambiarFirstName = (event: any) => {
    setFirstName(event.target.value);
  };

  const cambiarLastName = (event: any) => {
    setLastName(event.target.value);
  };

  const cambiarPhone = (event: any) => {
    setPhone(event.target.value);
  };

  const cambiarEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const [values, setValues] = React.useState({
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    email: email,
  });

  function agregarContacto(evt: any) {
    evt.preventDefault();
    if (firstName != "" && lastName != "" && phone != "" && email != "") {
      values.firstName = firstName;
      values.lastName = lastName;
      values.phone = phone;
      values.email = email;

      if (validator.isEmail(email)) {
        crearContacto(values).then((response: any) => {
          setFirstName("");
          setLastName("");
          setPhone("");
          setEmail("");
        });
      } else {
        setMensaje('Ingrese un Email correcto!')
        setOpen(true);
      }
     
    }else{
      if (firstName == "") {
        setMensaje("Ingrese el nombre!")
      }
      if (lastName == "") {
        setMensaje("Ingrese el apellido!")
      }
      if (phone == "") {
        setMensaje("Ingrese el telefono!")
      }
      if (email == "") {
        setMensaje("Ingrese el correo!")
      }
      setOpen(true)
    }
    
  }

  return (
    <Container maxWidth="md">
      <div>
        <form>
          <Grid></Grid>
          <br></br>
          <Grid container spacing={1}>
            <Typography component="h1" variant="h5">
              Crear Nuevo Contacto
            </Typography>
            <br></br>
            <br></br>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} md={3}>
              <TextField
                required
                id="outlined-required"
                label="First Name"
                onChange={cambiarFirstName}
                defaultValue={firstName}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} md={3}>
              <TextField
                required
                id="outlined-required"
                label="Last Name"
                onChange={cambiarLastName}
                defaultValue={lastName}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} md={3}>
              <TextField
                required
                id="outlined-required"
                label="Phone"
                onChange={cambiarPhone}
                defaultValue={phone}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} md={3}>
              <TextField
                required
                id="outlined-required"
                label="Email"
                onChange={cambiarEmail}
                defaultValue={email}
              />
            </Grid>
          </Grid>
          <br></br>
          <Grid container spacing={1}>
            <Grid item xs={12} md={3}>
              <Button
                type="submit"
                onClick={(evt) => {
                  agregarContacto(evt);
                }}
                fullWidth
                variant="contained"
                color="primary"
                size="large"
              >
                Insertar
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <h2>Advertencia</h2>
                  <p>{mensaje}</p>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={12}>
                      <Button
                        type="submit"
                        onClick={(evt) => {
                          handleClose();
                        }}
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                      >
                        Aceptar
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Fade>
            </Modal>
          </Grid>
          <br></br>
        </form>
        <form></form>
        <br></br>
        <br></br>
      </div>
    </Container>
  );
};
export default CreateContacts;
