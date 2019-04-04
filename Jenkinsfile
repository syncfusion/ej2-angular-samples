#!groovy

node('EJ2Samples') {
    try {
        deleteDir()        

        stage('Import') {
            git url: 'https://gitlab.syncfusion.com/essential-studio/ej2-groovy-scripts.git', branch: 'master', credentialsId: env.JENKINS_CREDENTIAL_ID
            shared = load 'src/shared.groovy'
        }

        stage('Checkout') {
            checkout scm
            shared.getProjectDetails()
            shared.gitlabCommitStatus('running')
        }

        stage('Install') {
            shared.install()
        }

        stage('Build') {
            sh 'npm run build'
        }

        stage('Publish') {
            shared.publish()
        }

        shared.gitlabCommitStatus('success')

        deleteDir()
    }
    catch(Exception e) {
        shared.throwError(e)
        deleteDir()        
    }
}
