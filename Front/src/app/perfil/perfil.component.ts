import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../Services/publicaciones-service.service';
import { Rutasss } from '../logicaExterna/router';
import { ActivatedRoute } from '@angular/router';
import { perfiles } from '../Models/perfiles';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfil: perfiles = {
    userName: "",
    userDescripcion: "",
    urlImage: "",
    email: "",
    contrasena: "",
    publicaciones: []
  }

  constructor(public peticiones: PublicacionesService, private direccionar: Rutasss, private ruta: ActivatedRoute) { }

  parametro = this.ruta.snapshot.params["id"]
  mostrar = false

  ngOnInit(): void {
    this.getCards();
    this.peticiones.getProfileById(this.parametro).subscribe({
      next: (res: any) => {
        this.mostrar = true
        this.perfil = res;
      },
      error: (err) => console.log(err),
    });
  };

  getCards() {
    this.peticiones.getMyCards(this.parametro).subscribe({
      next: (res) => {
        this.peticiones.documentos = res;
      },
      error: (err) => console.log(err),
    });
  }

  red(param: any) {
    this.direccionar.rect(param);
  }

}
