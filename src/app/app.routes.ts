import { Routes } from '@angular/router';
import { MainContent } from './main-content/main-content';
import { LegalNotice } from './legal-notice/legal-notice';

export const routes: Routes = [
    { path: '', component: MainContent},
    { path: 'legal-notice', component: LegalNotice}
];
