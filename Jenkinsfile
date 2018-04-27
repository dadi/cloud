pipeline {
  agent any

    stages {
          stage('API tests') {
            steps {
              sh "pwd"
              sh "newman run test/collection.json -e test/environment.json -r cli,junit,html"
            }
      }
  }
}
