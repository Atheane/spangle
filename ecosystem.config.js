module.exports = {
  apps: [{
    name: 'spangle',
    script: './server.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-52-57-73-145.eu-central-1.compute.amazonaws.com',
      key: '~/.ssh/ssh_aws_jeu_cv_ifocop_predator.pem',
      ref: 'origin/master',
      repo: 'git@github.com:Atheane/spangle.git',
      path: '/home/ubuntu/spangle',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
