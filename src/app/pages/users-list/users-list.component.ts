import { Component, inject } from '@angular/core';
import { UsersServiceService } from '../../services/usersService.service';
import { UserCardComponent } from '../../components/user-card/user-card.component';

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
    const response: any = await this.usersService.getAll(page)
    this.arrUsers = response.results
    // Pedir informacion sobre las paginas:
    this.totalPages = response.total_pages
    this.currentPage = page
  }

  // Ir a página:
  async goToPage(pageNumber: number): Promise<void> {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      await this.loadPage(pageNumber)
    }
  }

  // Página anterior:
  previousPage(): void {
    if (this.currentPage > 1) {
      this.loadPage(this.currentPage - 1)
    }
  }

  // Página siguiente:
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadPage(this.currentPage + 1)
    }
  }

  // Array con el número de página:
  getPageNumbers(): number[] {
    const pageNumbers = []
    for (let i = 0; i < this.totalPages; i++) {
      pageNumbers.push(i + 1)
    }
    return pageNumbers
}
}
