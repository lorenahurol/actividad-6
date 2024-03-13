import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  // Inyectar el httpClient en el servicio:
  httpClient = inject(HttpClient);
  // Url de la API:
  baseUrl: string = "https://peticiones.online/api/users/"

  // Traer todos los datos de la API (pagina 1) por medio de promesa:
  getAll(page: number = 1): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}?page=${page}`))

  }
}
