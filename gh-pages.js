var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://umb-cs410-fritz.github.io/piling.js-authoring/',
        user: {
            name: 'Emily Gagne', // update to use your name
            email: 'Emily.Gagne001@umb.edu' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)