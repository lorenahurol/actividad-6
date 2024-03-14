import { Routes } from '@angular/router';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { FormComponent } from './pages/form/form.component';

export const routes: Routes = [
    // Definiendo las rutas de la aplicacion:
    { path: "", pathMatch: "full", redirectTo: "home"},
    { path: "home", component: UsersListComponent },
    { path: "user/:idUser", component: UserViewComponent },
    // Rutas para la creacion y actualizacion de usuarios (Reutilizando el componente de formulario):
    { path: "newuser", component: FormComponent },
    { path: "updateuser/:id", component: FormComponent}
];
