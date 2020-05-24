node {
	properties([
	  parameters([
		string(name: 'SELENIUM_URL', defaultValue: 'https://jupiter2.cloud.planittesting.com'),
		string(name: 'SELENIUM_BROWSER', defaultValue: 'firefox'),
		string(name: 'SELENIUM_WAIT', defaultValue: '3'),
		string(name: 'SELENIUM_GRID_URL', defaultValue: 'http://selenium_hub:4444/wd/hub'),
		string(name: 'SELENIUM_HEADLESS', defaultValue: 'true'),
		string(name: 'PARALLEL_TESTS', defaultValue: 'true'),
		string(name: 'DOT_ENDPOINT', defaultValue: 'https://ofzwv8iiqc.execute-api.ap-southeast-2.amazonaws.com/prod/junit'),
		string(name: 'DOT_API_KEY', defaultValue:'IvexKZnKGa41EAuhpyqj32UwjiCpIO7q4d52pQ14')
	  ])
	])
	checkout scm
    def testImage = docker.build("jupitertoys-nodejs-test-image", "./.devcontainer") 
	try {
		testImage.inside('--network=ci_planittesting') {
            stage('Prepare') {
                sh "npm i"
                sh "npm run clean"
            }
			stage ('Run tests') {
				withEnv(["SELENIUM_HEADLESS=${params.SELENIUM_HEADLESS}", "SELENIUM_GRID_URL=${params.SELENIUM_GRID_URL}", "SELENIUM_URL=${params.SELENIUM_URL}", "SELENIUM_BROWSER=${params.SELENIUM_BROWSER}", "SELENIUM_WAIT=${params.SELENIUM_WAIT}"]) {
					try {
						sh 'ls --lha'
						sh "npm test"
						sh 'ls --lha'
					} finally {
						junit 'tests_output/*test*.xml'
						stash includes: 'tests_output/*.xml', name: 'junit-results'
						stash includes: 'test-metadata.yaml', name: 'test-metadata'
					}
				}
			}
		}	
	} finally {
		stage ('Upload Results') {
			def run_id = UUID.randomUUID().toString()
			unstash 'junit-results'
			unstash 'test-metadata'
			sh 'ls -lha .'
			def files = findFiles(glob: 'tests_output/*.xml')
			for(file in files) {
				echo file.path
				def xml_string = readFile(file.path)
				def yaml_string = readFile('test-metadata.yaml')
				sh "curl --location --request POST '${params.DOT_ENDPOINT}/${run_id}' -H 'Content-Type: application/x-www-form-urlencoded' -H 'x-api-key: ${params.DOT_API_KEY}' --form-string 'data=${xml_string}' --form-string 'metadata=${yaml_string}'"
			}                                       
		}
	}
}