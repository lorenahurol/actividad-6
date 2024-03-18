import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersServiceService } from '../../services/usersService.service';
import { BotoneraComponent } from '../../components/botonera/botonera.component';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [RouterLink, BotoneraComponent],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  // Capturar la ruta activa:
  activatedRoute = inject(ActivatedRoute)
  // Inyectar el servicio:
  userService = inject(UsersServiceService)

  // Pintar un usuario de tipo IUser:
  // Añado "| undefined " para solucionar error core.mjs:7494 ERROR TypeError: Cannot read properties of undefined (reading 'image') at UserViewComponent_Template (user-view.component.html:5:40)
  oneUser!: IUser | undefined;

  ngOnInit(): void {
    // Cada vez que se cambia la ruta, se llama a la funcion params (Observable):
    this.activatedRoute.params.subscribe(async(params: any) => {
      // Pasarle el id (alfanumerico) del usuario:
      const id = params.idUser
      try {
        this.oneUser = await this.userService.getById(id)
      } catch (error) {
        console.log("No se ha podido recuperar el usuario", error)
      }
    })
  }

}
