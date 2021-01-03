import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertController, ToastController } from "@ionic/angular";
import { ListaItem } from "src/app/models/lista-item.model";
import { Lista } from "src/app/models/lista.model";
import { DeseosService } from "src/app/services/deseos.service";

@Component({
  selector: "app-agregar",
  templateUrl: "./agregar.page.html",
  styleUrls: ["./agregar.page.scss"],
})
export class AgregarPage implements OnInit {
  lista: Lista;
  nombreItem = "";
  constructor(
    private deseosService: DeseosService,
    private router: ActivatedRoute,
    private alertCtrl: AlertController,
    public toastController: ToastController
  ) {
    const listaId = this.router.snapshot.paramMap.get("listaId");
    this.lista = this.deseosService.obtenerLista(listaId);
  }

  ngOnInit() {}

  agregarItem() {
    if (this.nombreItem.length === 0) {
      return;
    }
    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);
    this.nombreItem = "";
    this.deseosService.guardarStorage();
  }
  cambioCheck(item: ListaItem) {
    const pendientes = this.lista.items.filter((itemData) => {
      return !itemData.completado;
    }).length;

    if (pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this.deseosService.guardarStorage();
  }

  borrar(i: number) {
    this.lista.items.splice(i, 1);
    this.deseosService.guardarStorage();
  }

  async editar(item: ListaItem) {
    const alert = await this.alertCtrl.create({
      header: "Editar",
      inputs: [
        {
          name: "titulo",
          type: "text",
          value: item.desc,
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          
        },
        {
          text: "Editar",
          handler: async (data) => {
            if (data.titulo.length === 0) {
              return;
            } else {
              item.desc = data.titulo;
              const toast = await this.toastController.create({
                message: "Lista editada",
                duration: 900,
                color: "success",
              });
              toast.present();
              this.deseosService.guardarStorage();
              
            }
          },
        },
      ],
    });
    alert.present();
  }
}
