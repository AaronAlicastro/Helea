import { Component, NgModule, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PublicacionesService } from '../Services/publicaciones-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'Create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(public peticiones: PublicacionesService, private router: Router) { }

  fecha = ""

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos(){
    this.peticiones.getCategories().subscribe({
      next: (res) => {
        this.peticiones.doccategorias = res;
      },
      error: (err) => console.log(err),
    });
  };

  create(form: NgForm) {
    var confirmacion = confirm("¿Desea confirmar su publicación?")
    if (confirmacion) {
      let hoy = new Date();
      this.fecha = hoy.getDate() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getFullYear() + " " + hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
      form.value.fecha = this.fecha;
      form.value.calificacion = 5;
      this.peticiones.createPost(form.value).subscribe({
        next: (res) => {
          alert("Publicado exitosamente!")
          form.reset();
          this.router.navigate(['feed']);
        },
        error: (err) => console.log(err)
      });
    }
  }


}
