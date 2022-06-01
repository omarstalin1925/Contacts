import React, { useEffect, useState } from "react";
//import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@material-ui/core";
import {
  DataGrid,
} from "devextreme-react/data-grid";
import { obtenerContactos } from "../actions/contactAction";

const columns = [
  "firstName",
  "lastName",
  "phone",
  "email",
  "createdAt",
  "updatedAt",
];

const orden = [
  {
    value: "firstName:ASC",
    label: "First Name: Asc",
  },
  {
    value: "firstName:DESC",
    label: "First Name: DESC",
  },
  {
    value: "lastName:ASC",
    label: "Last Name: Asc",
  },
  {
    value: "lastName:DESC",
    label: "Last Name: DESC",
  },
];


interface IRow {
  name: string,
  gender: string,
  city: string,
  car: string
}


const ListContacts: React.FC = () => {
  const [contacts, setContacts] = useState([]);
  const [tamanioMax, setTamanioMax] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [ascDesc, setAscDesc] = useState("firstName:ASC");

  const cambiarTamanioMax = (event: any) => {
    setTamanioMax(event.target.value);
  };

  const cambiarPaginacion = (event: any) => {
    setPagina(event.target.value);
  };

  const cambiarOrden = (event: any) => {
    setAscDesc(event.target.value);
  };



  function buscarContactos(evt: any) {
    //evt.preventDefault();
    obtenerContactos(tamanioMax, pagina, ascDesc).then((response: any) => {
      setContacts(response.data.results);
    });
  }

  useEffect(() => {
    obtenerContactos(tamanioMax, pagina, ascDesc).then((response: any) => {
      setContacts(response.data.results);
    });
  }, []);

  return (
    <Container maxWidth="md">
      <div>
        <form>
          <Grid></Grid>
          <br></br>
          <Grid container spacing={1}>
            <Typography component="h1" variant="h5">
              Listado de Contactos
            </Typography>
            <br></br>
            <br></br>
          </Grid>
          <br></br>
          <Grid container spacing={1}>
            <Grid item xs={12} md={3}>
              <TextField
                id="outlined-number"
                label="Número"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={cambiarTamanioMax}
                helperText="Número máximo de resultados por página"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="outlined-number"
                label="Número"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={cambiarPaginacion}
                helperText="Página específica de paginación para mostrar resultados"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                value={ascDesc}
                onChange={cambiarOrden}
                helperText="Ordenar según un campo específico"
              >
                {orden.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                type="submit"
                onClick={(evt) => {
                  buscarContactos(evt);
                }}
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                //style={style.submit}
              >
                Buscar
              </Button>
            </Grid>
          </Grid>

          <br></br>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <DataGrid 
                dataSource={contacts}
                keyExpr="id"
                defaultColumns={columns}
                showBorders={true}
              />
            </Grid>
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
export default ListContacts;
