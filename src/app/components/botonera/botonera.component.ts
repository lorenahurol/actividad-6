import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersServiceService } from '../../services/usersService.service';
import Swal from 'sweetalert2';

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
   
  async deleteUser(id: string | undefined) {
    // Si el id no es undefined, realizar:
    if (id !== undefined) {
      Swal.fire({
        title: `Estas seguro de eliminar al usuario: ${this.idUser}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, estoy seguro"
      }).then(async (result) => {
        // Si OK === true - Borrar el usuario:
        if (result.isConfirmed) {
          try {
            await this.usersService.delete(id)
            console.log("Borrado")
            Swal.fire({
              title: "Borrado",
              text: `Se ha borrado correctamente al usuario: ${this.idUser}`,
              icon: "success"
            })
          } catch (error) {
            console.error("Error al borrar el usuario:", error)
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Ha habido un problema. Intentálo de nuevo"
            })
          }
        }
          
      })
    }
  }
}