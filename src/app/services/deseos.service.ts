import { Injectable } from "@angular/core";
import { join } from "path";
import { Lista } from "../models/lista.model";

@Injectable({
  providedIn: "root",
})
export class DeseosService {
  //lista de las tareas
  listas: Lista[] = [];
  constructor() {
    this.cargarStorage();
  }

  crearLista(titulo: string) {
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();

    return nuevaLista.id;
  }
  obtenerLista(id: string | number) {
    id = Number(id);
    return this.listas.find((listaData) => {
      return listaData.id == id;
    });
  }
  guardarStorage() {
    localStorage.setItem("data", JSON.stringify(this.listas));
  }

  cargarStorage() {
    if (localStorage.getItem("data")) {
      this.listas = JSON.parse(localStorage.getItem("data"));
    } else {
      this.listas = [];
    }
  }
}
