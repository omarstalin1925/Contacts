import HttpRequest from "../services/HttpRequest";

export const obtenerContactos = (tamanioMax, pagina, ascDesc) => {
  return new Promise((resolve, eject) => {
    HttpRequest.get(
      "https://bkbnchallenge.herokuapp.com/contacts?perPage=" +
        tamanioMax +
        "&page=" +
        pagina +
        "&_sort=" +
        ascDesc
    ).then((response) => {
      resolve(response);
    });
  });
};

export const obtenerContactosEdit = () => {
  return new Promise((resolve, eject) => {
    HttpRequest.get("https://bkbnchallenge.herokuapp.com/contacts").then(
      (response) => {
        resolve(response);
      }
    );
  });
};

export const crearContacto = (contacto) => {
  return new Promise((resolve, eject) => {
    HttpRequest.post(
      "https://bkbnchallenge.herokuapp.com/contacts",
      contacto
    ).then((response) => {
      resolve(response);
    });
  });
};

export const editContacto = (id, contacto) => {
  return new Promise((resolve, eject) => {
    HttpRequest.put(
      "https://bkbnchallenge.herokuapp.com/contacts/" + id,
      contacto
    ).then((response) => {
      resolve(response);
    });
  });
};

export const deleteContacto = (id) => {
    return new Promise((resolve, eject) => {
      HttpRequest.delete(
        "https://bkbnchallenge.herokuapp.com/contacts/" + id
      ).then((response) => {
        resolve(response);
      });
    });
  };
