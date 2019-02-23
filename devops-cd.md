# Continous Deployment with Azure DevOps

- Visit https://dev.azure.com and continue with same project you created earlier for CI.
- Create a new Azure DevOps Repo, for example k8s-deploy-apps to hold the the YAML configuration for Kubernetes

![](images/11-newrepo.jpg)

- Edit all files under yaml directory in locally cloned repo and modify:\
    **<yourACRRegistry.azurecr.io>** with your repo url and \
    **\<k8sSecretName>** with your secret created earlier
- Edit helloworld-v2.yaml again and change \
    **##BUILD_ID##** with the version you noted earlier in CI steps.
- In the new repository, create a folder yaml and add all YAMLs you modified in previous step to it.
- You must mention file name while creating folder e.g. test.yaml but you can delete it once you upload other YAMLs.

![](images/12-newfolder.jpg)

- Upload azure-pipelines.yaml and store it in root directory. Then create a new build pipeline

**Create artifacts build pipeline for the Kubernetes config files**

![](images/19-build.jpg)

**Create a continuous deployment pipeline that triggers upon either new container images or new YAML configuration artifacts to deploy the changes to your cluster.**

- Configure a Service Connection so that Azure DevOps can access resources in your Azure Resource Group for deployment and configuration purposes

![](images/13-armconnection.jpg)

>Select your resource group

![](images/14-armconnection2.jpg)

**Create a Release Pipeline**

- Start with an Empty template. Add an Azure Container Registry artifact as a trigger and enable the continuous deployment trigger. Make sure to configure it to point to the Azure Container Registry repository where the build pipeline is pushing the captureorder image*

![](images/15-releasepipeline.jpg)

![](images/16-releasepipeline2.jpg)

![](images/17-artifacts.jpg)

- Add another Build artifact coming from the k8s-deploy-apps pipeline as a trigger and enable the continuous deployment trigger. This is the trigger for changes in the YAML configuration.

![](images/17-artifacts2.jpg)

- Add tasks to the default stage. You may rename this stage as dev/ production etc.

![](images/18-renamestage.jpg)
 - Make sure the agent pool is Hosted Ubuntu 1604 then add an inline Bash Script task that will do a token replacement to replace ##BUILD_ID## in the helloworld & aci YAMLs file with the actual build being released. Remember that these yamls were published as build artifacts.

 ![](images/20-task1.jpg)

>You’ll want to get the Docker container tag incoming from the Azure Container Registry trigger to replace the ##BUILD_ID## token. If you named that artifact _helloworld, the build number will be in an environment variable called RELEASE_ARTIFACTS__HELLOWORLD_BUILDNUMBER. Similarly for the other artifact _k8s-deploy-apps, its build ID would be stored in RELEASE_ARTIFACTS__K8s-DEPLOY-APPS-CI_BUILDID. You can use the following inline script that uses the sed tool.

    sed -i "s/##BUILD_ID##/${RELEASE_ARTIFACTS__HELLOWORLD_BUILDNUMBER}/g" "$SYSTEM_ARTIFACTSDIRECTORY/_k8s-deploy-apps-CI/yaml/helloworld-v1.yaml"

    sed -i "s/##BUILD_ID##/${RELEASE_ARTIFACTS__HELLOWORLD_BUILDNUMBER}/g" "$SYSTEM_ARTIFACTSDIRECTORY/_k8s-deploy-apps-CI/yaml/helloworld-internal.yaml"

- Add a Deploy to Kubernetes task. Configure access to your AKS cluster using the service connection created earlier.

- Scroll down and check Use configuration files and browse file path.
> Filled value will look similar to this: $(System.DefaultWorkingDirectory)/_k8s-deploy-apps-CI/yaml/helloworld-internal.yaml

 ![](images/20-task2.jpg)

 ![](images/20-task3.jpg)

> **Hint:** Do the same for all other YAMLs. You can right click on the Kubernetes task and clone it. Select appropriate file for every cloned task.

 ![](images/20-task4.jpg)

- Create a manual release and pick the latest build as the source. Verify the release runs and that the captureorder service is deployed