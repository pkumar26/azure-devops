
# Continous Integration & Continous Delivery with Azure DevOps

## Using Azure DevOps to create container images & pushing such images to Azure container registry
- Visit https://dev.azure.com and sign-in with your Azure subscription credentials
- If this is a new Azure DevOps account, a quick wizard will guide you to create a new organization
- Create a new private project, and give it a name.

![](images/1-newproject.jpg)
- Click new repo and import the code for helloworld image from the public GitHub repository located at https://github.com/pkumar26/azure-devops.git

![](images/2-importrepo.jpg)
![](images/3-importrepo.jpg)
- Define variables in your build pipeline in the web UI
>
        dockerId: The admin user name/Service Principal ID for the Azure Container Registry.
        acrName: The Azure Container Registry name.
        dockerPassword: The admin password/Service Principal password for Azure Container Registry.
![](images/7-variablegroup.jpg.jpg)
![](images/8-variables.jpg)
- Build pipeline for the application Docker container is included in the repo.

![](images/4-setupbuild.jpg)
- Choose YAML as the pipeline template

![](images/5-yaml.jpg)
- Browse to and select the devops-pipelines.yml file. You may also change the agent to be Hosted Ubuntu

![](images/6-yamlfile.jpg)

- Click on variables tab and link already created variable group

![](images/9-link.jpg)

- Save & queue will automatically start the build pipeline. Verify that it completes successfully. Once completed, you may verify on azure portal that image is pushed in your repository.

![](images/10-repos.jpg)
