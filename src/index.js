import _ from 'lodash';
import sideBarController from './modules/sidebar-controller';

if(localStorage.getItem('projects')) {
    sideBarController.populateProjects();
    //localStorage.clear();
} 





