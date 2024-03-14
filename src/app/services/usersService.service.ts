import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  // Inyectar el httpClient en el servicio:
  httpClient = inject(HttpClient)
  // Url de la API:
  baseUrl: string = "https://peticiones.online/api/users/"

  // Traer todos los datos de la API (pagina 1) por medio de promesa:
  getAll(page: number = 1): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}?page=${page}`))

  }

  // Traer el id de cada usuario:
  getById(id: string): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/${id}`))
  }

  // Eliminar un usuario con una id determinada: 
  delete(id: string): Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/${id}`))
  }

  // Insertar los datos del formulario para crear un nuevo usuario:
  create(formValue: IUser): Promise<IUser> {
    return lastValueFrom(this.httpClient.post<IUser>(this.baseUrl, formValue))
  }

  // Metodo update para actualizar los datos del usuario:
  update(formValue: IUser): Promise<IUser> {
    return lastValueFrom(this.httpClient.put<IUser>(`${this.baseUrl}/${formValue._id}`, formValue ))
  }
}
