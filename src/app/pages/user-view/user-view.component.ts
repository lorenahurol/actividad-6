import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersServiceService } from '../../services/usersService.service';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  // Capturar la ruta activa:
  activatedRoute = inject(ActivatedRoute)
  // Inyectar el servicio:
  userService = inject(UsersServiceService)

  // Pintar un usuario de tipo IUser:
  oneUser!: IUser;

  ngOnInit(): void {
    // Cada vez que se cambia la ruta, se llama a la funcion params (Observable):
    this.activatedRoute.params.subscribe(async(params: any) => {
      // Pasarle el id (alfanumerico) del usuario:
      const id = params.idUser
      try {
        this.oneUser = await this.userService.getById(id)
      } catch (error) {
        console.log(error)
      }
    })
  }

}
