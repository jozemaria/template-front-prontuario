import { Routes } from '@angular/router';
import { authGuard } from 'src/app/guard/auth.guard';

//Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const CONTENT_ROUTES: Routes = [

    {
        path: 'auth',
        loadChildren: () => import('./../../auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'pages',
        loadChildren: () => import('./../../pages/pages.module').then(m => m.PagesModule),
        canActivate: [authGuard]
    }
];
