import { Injectable } from "@angular/core";
import { Lista } from "../models/lista.model";

@Injectable({
  providedIn: "root",
})
export class DeseosService {
  //lista de las tareas
  listas: Lista[] = [];
  constructor() {
    const lista1 = new Lista("Recolectar piedras");
    const lista2 = new Lista("Proyectos portfolio");

    this.listas.push(lista1, lista2);
    
  }
}
