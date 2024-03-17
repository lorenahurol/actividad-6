import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersServiceService } from '../../services/usersService.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  // Valor dinamico del boton de envio del formulario (GUARDAR/ACTUALIZAR):
  valor: string = "GUARDAR"
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
        // Validadores:
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\S*$/) // No puede incluir espacios
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$") // Email valido
      ]),
      image: new FormControl('', [
        Validators.required
      ])
    }, [])
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      // Si extisten los parametros de ruta - actualizar:
      if (params.id) {
        this.type = "ACTUALIZAR"
        this.valor = "ACTUALIZAR"
        const response = await this.usersService.getById(params.id)
        // Sobreescribir el formulario (nueva instancia):
        this.userForm = new FormGroup({
          // Crear _id para la actualizacion (le dice a la API lo que tiene que actualizar):
          _id: new FormControl(response._id),
          // Resto de campos:
          first_name: new FormControl(response.first_name, [
            Validators.required,
            Validators.minLength(3)
          ]),
          last_name: new FormControl(response.last_name, [
            Validators.required,
            Validators.minLength(3)
          ]),
          username: new FormControl(response.username, [
            Validators.required,
            Validators.pattern(/^\S*$/)
          ]),
          email: new FormControl(response.email, [
            Validators.required,
            Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
          ]),
          image: new FormControl(response.image, [
            Validators.required
          ])
        }, [])
      }
    })
}

  // Crear la funcion getDataForm: Trabajar con los datos del formulario:
    async getDataForm() {
    if (this.userForm.value._id) {
      // Actualizar usuario:
      const response = await this.usersService.update(this.userForm.value);
      // Alert y redireccionar a la home (vista de usuarios):
      if (response.id) {
        console.log(response)
        Swal.fire({
          title: "Usuario actualizado",
          text: `El usuario ${response._id} se ha actualizado correctamente`,
          icon: "success"
        })
        this.router.navigate(['/home'])
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha habido un problema. Intentálo de nuevo"
        })
      }

      // Si el id del formulario no existe, crear usuario nuevo: 
    } else {
      const response = await this.usersService.create(this.userForm.value)
      if (response.id) {
        console.log(response)
        Swal.fire({
          title: "Usuario creado",
          text: `El usuario ${response.id} se ha creado correctamente`,
          icon: "success"
        })
        this.router.navigate(['/home'])
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha habido un problema. Intentálo de nuevo"
        })
      }
    }
  }

  // Funcion para mostrar los errores de Validacion por pantalla:
  checkControl(FormControlName: string, validator: string): boolean | undefined {
    return this.userForm.get(FormControlName)?.hasError(validator) && this.userForm.get(FormControlName)?.touched

  }
}

/** 
 * 1. Validar Url imagen
 * 2. Active Links
 * 3. Maquetar Estilos
*/

   

