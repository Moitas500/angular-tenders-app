import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'admin',
        loadComponent: () => import('./admin/admin.component'),
        children: [
            {
                path: 'products',
                title: 'Productos',
                loadComponent: () => import('./admin/pages/products/products.component'),

            },
            {
                path: 'users',
                title: 'Usuarios',
                loadComponent: () => import('./admin/pages/users/users.component'),
            },
            {
                path: 'sales',
                title: 'Ventas',
                loadComponent: () => import('./admin/pages/sales/sales.component'),
            },
            {
                path: '',
                redirectTo: 'products',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/admin',
        pathMatch: 'full',
    }
];
