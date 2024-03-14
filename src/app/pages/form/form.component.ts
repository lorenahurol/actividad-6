import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersServiceService } from '../../services/usersService.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  // Titulo dinamico de la pagina del formulario (NUEVO/ACTUALIZAR):
  type: string = "NUEVO"
  // Formulario para creacion y actualizacion de usuarios:
  userForm: FormGroup
  // Inyectar el servicio:
  usersService = inject(UsersServiceService)
  // Inyectar el router para redireccionar:
  router = inject(Router)
  // Inyectar el Activated Route para reutilizar el formulario:
  activatedRoute = inject(ActivatedRoute)
  

  // Inicializar el formulario en el constructor:
  constructor() {
    this.userForm = new FormGroup({
      first_name: new FormControl('', [
        Validators.required
      ]),
      last_name: new FormControl('', []),
      username: new FormControl('', []),
      email: new FormControl('', []),
      image: new FormControl('', [])
    }, [])
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      // Si extisten los parametros de ruta - actualizar:
      if (params.id) {
        const response = await this.usersService.getById(params.id)
        // Sobreescribir el formulario (nueva instancia):
        this.userForm = new FormGroup({
          // Crear _id para la actualizacion (le dice a la API lo que tiene que actualizar):
          _id: new FormControl(response._id),
          // Resto de campos:
          first_name: new FormControl(response.first_name, []),
          last_name: new FormControl(response.last_name, []),
          username: new FormControl(response.username, []),
          email: new FormControl(response.email, []),
          image: new FormControl(response.image, [])
        }, [])
      }
      // Si no existen, insertar:
        

    })
    
  }

  // Crear la funcion getDataForm: Insertar los datos del formulario

  // ** Tendria que ser POST o INSERT? ** //

  async getDataForm() {
    if (this.userForm.value._id) {
      const response = await this.usersService.update(this.userForm.value)
      console.log(response)
    } else {
      const response = await this.usersService.create(this.userForm.value)
    // Alert y redireccionar a la home (vista de usuarios):
    if (response.id) {
      alert(`El usuario ${response.id} se ha creado correctamente`)
      this.router.navigate(['/home'])
    } else {
      alert("Error. Intentalo de nuevo")
    }
  }
}



    
}
