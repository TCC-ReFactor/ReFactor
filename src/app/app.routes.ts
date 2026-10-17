import { Routes } from '@angular/router';
import { authGuard } from './auth/guard.service';
import { Index } from './pages/index';
import { CadastroUser } from './pages/cadastro/org-resp/cadastro-user';
import { Login } from './pages/login/login';
import { Perfil } from './pages/perfil/perfil';
import { EditarAnuncio } from './pages/perfil/editar-anuncio';

const publicRoutes: Routes = [
  { path: 'index', component: Index },
  { path: 'cadastro-user', component: CadastroUser },
  { path: 'login', component: Login }
];

const privateRoutes: Routes = [
  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      { path: 'perfil', component: Perfil },
      { path: 'anuncios/:id/editar', component: EditarAnuncio }
    ]
  }
];

export const routes: Routes = [
  ...publicRoutes,
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  ...privateRoutes
];
