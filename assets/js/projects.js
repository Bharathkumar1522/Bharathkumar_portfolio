const projects = [
    {
        "id": 1,
        "name": "Animal Kingdom",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac porttitor mauris. In malesuada vitae quam ut bibendum. Duis at purus vitae tellus venenatis mattis. Donec eu pulvinar urna. Maecenas id ornare est, quis pulvinar arcu. Phasellus euismod condimentum nulla, a auctor turpis porta ut. Nunc tristique nec mi sed semper. Vivamus ut ligula enim. Pellentesque ut imperdiet elit. Morbi semper nulla dictum justo vehicula, ut aliquet nisi pulvinar. Morbi in diam eget est auctor euismod sed id velit.",
        "imageURL" : "./assets/images/portfolio/project-1.png",
        "githubURL": "https://github.com/Bharathkumar1522/animal-kingdom",
        "liveURL": "https://bharathkumar1522.github.io/animal-kingdom/",
        "tag" : "Development"
    }, {
        "id": 2,
        "name": "Animal Kingdom",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac porttitor mauris. In malesuada vitae quam ut bibendum. Duis at purus vitae tellus venenatis mattis. Donec eu pulvinar urna. Maecenas id ornare est, quis pulvinar arcu. Phasellus euismod condimentum nulla, a auctor turpis porta ut. Nunc tristique nec mi sed semper. Vivamus ut ligula enim. Pellentesque ut imperdiet elit. Morbi semper nulla dictum justo vehicula, ut aliquet nisi pulvinar. Morbi in diam eget est auctor euismod sed id velit.",
        "imageURL" : "./assets/images/portfolio/project-1.png",
        "githubURL": "https://github.com/Bharathkumar1522/animal-kingdom",
        "liveURL": "https://bharathkumar1522.github.io/animal-kingdom/",
        "tag" : "Development"
    },{
        "id": 3,
        "name": "Animal Kingdom",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac porttitor mauris. In malesuada vitae quam ut bibendum. Duis at purus vitae tellus venenatis mattis. Donec eu pulvinar urna. Maecenas id ornare est, quis pulvinar arcu. Phasellus euismod condimentum nulla, a auctor turpis porta ut. Nunc tristique nec mi sed semper. Vivamus ut ligula enim. Pellentesque ut imperdiet elit. Morbi semper nulla dictum justo vehicula, ut aliquet nisi pulvinar. Morbi in diam eget est auctor euismod sed id velit.",
        "imageURL" : "./assets/images/portfolio/project-1.png",
        "githubURL": "https://github.com/Bharathkumar1522/animal-kingdom",
        "liveURL": "https://bharathkumar1522.github.io/animal-kingdom/",
        "tag" : "Development"
    },
];
 

document.querySelectorAll('.rn-portfolio').forEach(project => {
    project.addEventListener('click', function () {
        const projectId = parseInt(this.dataset.id, 10);
        const projectDetails = projects.find(p => p.id === projectId);

        if (projectDetails) {
            document.querySelector('#projectTitle').innerHTML = ` <span>Featured - ${projectDetails.tag}</span> ${projectDetails.name}`;
            document.querySelector('#projectDesc').textContent = projectDetails.description;
            document.querySelector('#projectImage').src = projectDetails.imageURL;
            document.querySelector('#githubURL').href = projectDetails.githubURL;
            document.querySelector('#projectLiveURL').href = projectDetails.liveURL;
        }
    });
});