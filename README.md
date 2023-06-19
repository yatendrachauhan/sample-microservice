# Sample Microservice

#### This application is developed using nodejs and mongodb. This will provide 3 endpoints for creating collection, insert record and fetch records.
#### /api/collection for creating new collection if not exist. Need to pass collection name in this form {"collectionName": <collection_name>}
#### /api/insert for inserting records. Need to pass collection name and records in this form {"collectionName":<collection_name>,"documents":[<records_list>]}
#### /api/fetch/:collectionName for getting the records. Need to replace collectionName with your collection name.

### Installation 

#### First git clone the repo.
#### Run npm i for installing the dependency 
#### Run docker build for creating the docker image, use this image for deployment
#### Or you can use the docker image from docker hub
#### Then apply the cooresponding yaml files for mongodb and nodejs application deployment (yaml files are also on the same repo)

### Important Links

#### [Code Repo](https://github.com/yatendrachauhan/sample-microservice)
#### [Docker Image](https://hub.docker.com/r/yatendrachauhan30/sample-microservice/tags)
#### [Service API tier url for featching records](http://34.170.174.122:3000/api/fetch/mycollection)
