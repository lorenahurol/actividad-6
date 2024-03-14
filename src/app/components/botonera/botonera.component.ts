import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersServiceService } from '../../services/usersService.service';

@Component({
  selector: 'app-botonera',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './botonera.component.html',
  styleUrl: './botonera.component.css'
})
export class BotoneraComponent {
  // Recoger inputs e inicializar a vacio:
  @Input() parent: string = ""
  @Input() idUser: string | undefined = ""

  // Inyectar el servicio:
  usersService = inject(UsersServiceService)

  // ** ME DA ERROR DE ID ** //
 
  // Pantalla de confirmacion (borrar un usuario):
  async deleteUser(id: string | undefined) {
    // Si el id no es undefined, realizar:
    if (id !== undefined) {
      // Confirmar si queremos borrar el usuario:
      let response = confirm(`¿Estas seguro que quieres borrar el usuario ${this.idUser}?`)
    
      // Si response === true - Borrar el usuario:
      if (response) {
        let deleteUser = await this.usersService.delete(id)
        console.log(deleteUser)
        // Crear la funcion delete en el servicio
        // Confirmar por medio de alerta: 
        if (deleteUser._id) {
          alert(`Se ha eliminado correctamente el usuario ${this.idUser}`)
        }
      }
    }
  }

}
