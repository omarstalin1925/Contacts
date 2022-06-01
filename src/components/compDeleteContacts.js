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

import { deleteContacto, obtenerContactos } from "../actions/contactAction";

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
const DeleteContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [tamanioMax, setTamanioMax] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [ascDesc, setAscDesc] = useState("firstName:ASC");
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState("");
  const classes = useStyles();

  function obtenerFila(event) {
    let data = event.selectedRowsData[0];
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setId(data.id);
    handleOpen();
  }

  function eliminarContacto(evt) {
    evt.preventDefault();
    deleteContacto(id).then((response) => {
      setId("");
      handleClose();
    });
    window.location.reload(true);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
              Eliminar Contacto
            </Typography>
            <br></br>
            <br></br>
          </Grid>
          <Grid>
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
                displayMode={'full'}
                showPageSizeSelector={true}
                showInfo={true}
                showNavigationButtons={true}
              />
            </DataGrid>
          </Grid>
          <br></br>
          <br></br>

          <Grid item xs={12} md={2}>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <h2>Confirmación</h2>
                  <p>
                    Está seguro que desea eliminar el contacto {firstName}{" "}
                    {lastName}?
                  </p>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                      <Button
                        type="submit"
                        onClick={(evt) => {
                          eliminarContacto(evt);
                        }}
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                      >
                        Aceptar
                      </Button>
                    </Grid>
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
                        Cancelar
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
export default DeleteContacts;
