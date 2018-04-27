pipeline {
    agent {label 'jenkins-master'}

    stages {
          stage('API tests') {
            steps {
              sh "newman run test/collection.json -e test/environment.json -r cli,junit,html"
            }
      }
  }
}
