import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Lista } from "src/app/models/lista.model";
import { DeseosService } from "src/app/services/deseos.service";
import { IonList, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
@Component({
  selector: "app-listas",
  templateUrl: "./listas.component.html",
  styleUrls: ["./listas.component.scss"],
})
export class ListasComponent implements OnInit {
  @ViewChild(IonList) lista: IonList;

  @Input() terminada = true;
  constructor(
    public deseosService: DeseosService,
    public router: Router,
    public toastController: ToastController,
    private alertCtrl: AlertController
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
      color: "success",
    });
    toast.present();
  }

  async editarLista(lista: Lista) {
    const alert = await this.alertCtrl.create({
      header: "Editar",
      inputs: [
        {
          name: "titulo",
          type: "text",
          value: lista.titulo,
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            this.lista.closeSlidingItems();
          },
        },
        {
          text: "Editar",
          handler: async (data) => {
            if (data.titulo.length === 0) {
              return;
            } else {
              lista.titulo = data.titulo;
              const toast = await this.toastController.create({
                message: "Lista editada",
                duration: 900,
                color: "success",
              });
              toast.present();
              this.deseosService.guardarStorage();
              this.lista.closeSlidingItems();
            }
          },
        },
      ],
    });

    alert.present();
  }
}
