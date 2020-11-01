import _ from 'lodash';
import moment from 'moment';
import sideBarController from './modules/sidebar-controller';

if(localStorage.getItem('projects')) {
    sideBarController.populateProjects();
    //localStorage.clear();
} 





