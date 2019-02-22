# Continous Deployment with Azure DevOps

- Create a new Azure DevOps Repo, for example kubernetes to hold the the YAML configuration for Kubernetes

![](images/11-newrepo.jpg)

- In the new repository, create a folder yaml and add the required YAML, provided with repo you cloned earlier.

![](images/12-newfolder.jpg)

- Create build pipeline for the Kubernetes config files

Upload azure-pipelines.yml

- Create a continuous deployment pipeline

*Configure a Service Connection so that Azure DevOps can access resources in your Azure Resource Group for deployment and configuration purposes*

![](images/13-armconnection.jpg)

![](images/14-armconnection2.jpg)

*Create a Release Pipeline, start with an Empty template. Add an Azure Container Registry artifact as a trigger and enable the continuous deployment trigger. Make sure to configure it to point to the Azure Container Registry repository where the build pipeline is pushing the captureorder image*

![](images/15-releasepipeline.jpg)

![](images/16-releasepipeline2.jpg)

![](images/17-artifacts.jpg)

![](images/17-artifacts2.jpg)