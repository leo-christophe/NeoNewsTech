import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'articles',
        loadComponent: () => import('./article-list/article-list').then(m => m.ArticleList)
    },
    {
        path: '',
        redirectTo: 'articles',
        pathMatch: 'full'
    }
];
