pipeline {
    agent any

    stages {
        stage('Clone repository') {
            steps {
                git branch: 'main', url: 'https://github.com/sourav-roy6242/Courier-management.git'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t courier-frontend .'
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t courier-backend .'
                }
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker run -d --name courier-frontend -p 4200:80 courier-frontend || true'
                sh 'docker run -d --name courier-backend -p 5000:5000 courier-backend || true'
            }
        }
    }

    post {
        success {
            echo 'Courier Management project deployed successfully!'
        }
        failure {
            echo 'Build failed. Please check the logs.'
        }
    }
}
