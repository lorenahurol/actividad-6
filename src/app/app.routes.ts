import { Routes } from '@angular/router';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserViewComponent } from './pages/user-view/user-view.component';

export const routes: Routes = [
    // Definiendo las rutas de la aplicacion:
    { path: "", pathMatch: "full", redirectTo: "home"},
    { path: "home", component: UsersListComponent },
    { path: "user/:idUser", component: UserViewComponent },

    
];
