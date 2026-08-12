import { Routes } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
    },

    {
        path: 'components',
        loadChildren: () => import('../../components/components.module').then(m => m.ComponentsModule)
    },

    {
        path: 'forms',
        loadChildren: () => import('../../forms/forms.module').then(m => m.FormsModule)
    },
    {
        path: 'usuarios',
        loadChildren: () => import('../../usuarios/usuarios.module').then(m => m.UsuariosModule)
    },

    {
        path: 'animais',
        loadChildren: () => import('../../animais/animais.module').then(m => m.AnimaisModule)
    },

    {
        path: 'assistente',
        loadChildren: () => import('../../deepseek/deepseek.module').then(m => m.DeepseekModule)
    }

];
