import { Routes } from '@angular/router';
import { isLoggedInGuard } from './guards/is-logged-in.guard';
import { isNotLoggedInGuard } from './guards/is-not-logged-in.guard';
import { isAdminGuard } from './guards/is-admin.guard';
import { aceptoTerminosGuard } from './guards/acepto-terminos.guard';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: "full" },
    {
        path: 'home', loadComponent: () => import('./components/home/home.component').then(
            x => x.HomeComponent
        )
    },
    {
        path: 'login', loadComponent: () => import('./components/login/login.component').then(
            x => x.LoginComponent
        ),
        canActivate: [isNotLoggedInGuard],
    },
    {
        path: 'alta-repartidor', loadComponent: () => import('./components/alta-repartidor/alta-repartidor.component').then(
            x => x.AltaRepartidorComponent
        ),
        canActivate: [isLoggedInGuard],
    },
    {
        path: 'detalle-repartidor', loadComponent: () => import('./components/detalle-repartidor/detalle-repartidor.component').then(
            x => x.DetalleRepartidorComponent
        ),
        canActivate: [isLoggedInGuard],
    },

    {
        path: 'helados', loadComponent: () => import('./components/helados/helados.component').then(
            x => x.HeladosComponent
        ),
        canActivate: [isAdminGuard],
    },

        {
        path: 'aceptar-terminos', loadComponent: () => import('./components/aceptar-terminos/aceptar-terminos.component').then(
            x => x.AceptarTerminosComponent
        ),
        canActivate: [isLoggedInGuard],
        canDeactivate: [aceptoTerminosGuard],
    },

    {
        path: '**', loadComponent: () => import('./components/page-not-found/page-not-found.component').then(
            x => x.PageNotFoundComponent
        )
    },
];
