import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Lista } from "src/app/models/lista.model";
import { DeseosService } from "src/app/services/deseos.service";
import { ToastController } from "@ionic/angular";
@Component({
  selector: "app-listas",
  templateUrl: "./listas.component.html",
  styleUrls: ["./listas.component.scss"],
})
export class ListasComponent implements OnInit {
  @Input() terminada = true;
  constructor(
    public deseosService: DeseosService,
    public router: Router,
    public toastController: ToastController
  ) {}

  ngOnInit() {}

  listaSeleccionada(lista: Lista) {
    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  async borrarLista(lista: Lista) {
    this.deseosService.borrarLista(lista);
    const toast = await this.toastController.create({
      message: "Lista borrada",
      duration: 900,
      color:"success"
    });
    toast.present();
  }
}
