# Docker
- alawys start by this command to start the defaul machine

   ```bash
   docker-machine start default
   ```
   
- Resource: [Brad Traversy Help](https://gist.github.com/bradtraversy/89fad226dc058a41b596d586022a9bd3)

## General
- if your using `docker virtualbox` make sure you open virtualbox and the machine is working while you are using the `cmd`
- you will not find your server on `http://localhost:port` or `0.0.0.0:port`. you will find it on `http://192.168.99.100:port`
- `docker images` are like environments. ex: node.js 
- `docker containers` are your own projects that are built on a specific image.
- when you create a container, if the image is not preveously downloaded on your machine it's going to be downloaded from `docker hub`.
- `docker container run <-d | -it> -p <our_local_port>:<virtual_port_for_this_image> <image>`
- `docker volume` is a way to pull a continer into your local file system and start editing it.


## commands
- `docker version`: show docker version
- `docker info`: show server and client info
- `docker container run -it -p 80:80 <nginx>` : create and run and publish docker container of enginx server on port 80 (default) in the foreground.
- ` docker container run -d -p 8080:80 --name <container_name> <image>`: create and run a container in the background
- `docker container < ls | ps >`: list all running containers.
- `docker container ls -a` : list all containers wether they are running or not
- `docker container rm <container_id>`: delete a container with the id of :container_id from your system.
- `docker images`: list all images on your machine
- `docker pull <image_name> : download the <image_name> from `docker hub`
- `docker stop <container_id>`: stop a running container.
- `docker ps`: list all running containers.
- ` docker container run -d -p 3306:3306 --name <my_name> --env MYSQL_ROOT_PASSWORD=<pass> mysql` : create mysql container with `env` variables which is `password`.
- `docker container rm <contaier_name | container_id> -f`: remove a running container.
- `docker container exec -it mynginx bash`: open the container file system interactively into bash command line
- create a volume and grap the files into your local machine

   ```docker container run -d -p 8080:80 -v /${pwd}://usr/share/nginx/html --name nginxwebsite nginx```
   > make sure to use extra `/` before your 2 paths as `/${pwd}` and `//usr/share/nginx/hhtml` on windows.

- push the current container to docker hub:

   ```bash
       docker push <username>/<repo_name>
   ```

## Edit contianer files
- Edit files of `nginx` container on the fly

   ```bash
    > docker container exec -it mynginx bash
    > ls
    > cd usr/share/nginx
   ```
- create a volume and grap the files into your local machine

   ```bash
   docker container run -d -p 8080:80 -v /${pwd}://usr/share/nginx/html --name nginxwebsite nginx 
   ```
   > make sure to use extra `/` before your 2 paths as `/${pwd}` and `//usr/share/nginx/hhtml` on windows. 
   
   ## Docker-machine
   - commands:
      ```js
      > docker-machine ls // list all machines
      > docker-machine start default // starts the default machine
      > docker-machine stop default //stops the default machine
      ```

