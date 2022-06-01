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

import {
  DataGrid,
  Scrolling,
  Selection,
  Pager,
  Paging
} from "devextreme-react/data-grid";
import Fade from "@material-ui/core/Fade";
import {
  obtenerContactos,
  editContacto,
} from "../actions/contactAction";
import validator from "validator";

const allowedPageSizes = [5, 10, 'all'];
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

const columns = [
  "firstName",
  "lastName",
  "phone",
  "email",
  "createdAt",
  "updatedAt",
];

const EditContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [tamanioMax, setTamanioMax] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [ascDesc, setAscDesc] = useState("firstName:ASC");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function obtenerFila(event) {
    let data = event.selectedRowsData[0];
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setPhone(data.phone);
    setEmail(data.email);
    setId(data.id);
  }

  const [values, setValues] = React.useState({
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    email: email,
  });

  function editarContacto(evt) {
    evt.preventDefault();
    if (firstName != "" && lastName != "" && phone != "" && email != "") {
    values.firstName = firstName;
    values.lastName = lastName;
    values.phone = phone;
    values.email = email;
    if (validator.isEmail(email)) {
      editContacto(id, values).then((response) => {
        setFirstName("");
        setLastName("");
        setPhone("");
        setEmail("");
      });
      window.location.reload(true);
    } else {
      setMensaje('Ingrese un Email correcto!')
      setOpen(true);
    }
    
  }
  else{
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

  const cambiarFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const cambiarLastName = (event) => {
    setLastName(event.target.value);
  };

  const cambiarPhone = (event) => {
    setPhone(event.target.value);
  };

  const cambiarEmail = (event) => {
    setEmail(event.target.value);
  };
  useEffect(() => {
    obtenerContactos(tamanioMax, pagina, ascDesc).then((response) => {
      setContacts(response.data.results);
    });
  }, []);
  return (
    <Container maxWidth="md">
      <div>
        <form>
          <br></br>
          <Grid container spacing={1}>
            <Typography component="h1" variant="h5">
              Editar Contacto
            </Typography>
            <br></br>
            <br></br>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <DataGrid
                dataSource={contacts}
                keyExpr="id"
                defaultColumns={columns}
                showBorders={true}
                onSelectionChanged={obtenerFila}
              >
                <Selection mode="single" />
                <Scrolling rowRenderingMode="virtual"></Scrolling>
                <Paging defaultPageSize={10} />
                <Pager
                  visible={true}
                  allowedPageSizes={allowedPageSizes}
                  displayMode={"full"}
                  showPageSizeSelector={true}
                  showInfo={true}
                  showNavigationButtons={true}
                />
              </DataGrid>
            </Grid>
          </Grid>
          <br></br>
          <br></br>
          <Grid container spacing={1}>
            <Grid item xs={12} md={2}>
              <TextField
                required
                id="outlined-required"
                label="First Name"
                onChange={cambiarFirstName}
                defaultValue={firstName}
                value={firstName}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                required
                id="outlined-required"
                label="Last Name"
                onChange={cambiarLastName}
                defaultValue={lastName}
                value={lastName}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                required
                id="outlined-required"
                label="Phone"
                onChange={cambiarPhone}
                defaultValue={phone}
                value={phone}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                required
                id="outlined-required"
                label="Email"
                onChange={cambiarEmail}
                defaultValue={email}
                value={email}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                type="submit"
                onClick={(evt) => {
                  editarContacto(evt);
                }}
                fullWidth
                variant="contained"
                color="primary"
                size="large"
              >
                Actualizar
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} md={2}>
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
                    <Grid item xs={12} md={6}>
                      <Button
                        type="submit"
                        onClick={(evt) => {
                          handleClose(evt);
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
        <br></br>
        <br></br>
      </div>
    </Container>
  );
};

export default EditContacts;
