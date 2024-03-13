import { Component, inject } from '@angular/core';
import { UsersServiceService } from '../../services/usersService.service';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  // Inyectar el servicio:
  usersService = inject(UsersServiceService)
  arrUsers: any[] = []
  currentPage: number = 1;
  totalPages: number = 1;

  async ngOnInit(): Promise<void> {
    // Cargar la pagina en la que estamos:
    await this.loadPage(this.currentPage);
  }

  // Pedir los datos de la API a la promesa del servicio - Traerlos a la pagina cargada:
  async loadPage(page: number): Promise<void> {
    const response: any = await this.usersService.getAll(this.currentPage)
    this.arrUsers = response.results
    // Pedir informacion sobre las paginas:
    this.totalPages = response.total_pages
    this.currentPage = page
  }

  // Pasar a la pagina siguiente. Incremento en 1:
  async nextPage(): Promise<void> {
    if (this.currentPage < this.totalPages) {
      await this.loadPage(this.currentPage++)
    }
  }

  // Volver a la pagina anterior. Decremento en 1:
  async previousPage(): Promise<void>{
    //
    if (this.currentPage >= 1) {
      await this.loadPage(this.currentPage--)
    }
  }

}
