import _ from 'lodash';
import moment from 'moment';
import sideBarController from './modules/sidebar-controller';

if(localStorage.getItem('projects')) {
    populateProjects();
} 

function populateProjects() {
    let projects = JSON.parse(localStorage.getItem('projects'));

    const projectsHolder = document.querySelector('#sidebar ul');
    
    projects.forEach(project => {
        const listItem = document.createElement('li');
        listItem.textContent = project.name;
        projectsHolder.appendChild(listItem);
    });
}




