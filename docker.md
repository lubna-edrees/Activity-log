# Docker

## General
- if your using `docker virtualbox` make sure you open virtualbox and the machine is working while you are using the `cmd`
- you will not find your server on `http://localhost:port` or `0.0.0.0:port`. you will find it on `http://192.168.99.100:port`
- `docker images` are like environments. ex: node.js 
- `docker containers` are your own projects that are built on a specific image.
- when you create a container, if the image is not preveously downloaded on your machine it's going to be downloaded from `docker hub`.
- `docker container run <-d | -it> -p <our_local_port>:<virtual_port_for_this_image> <image>`


## commands
- `docker version`: show docker version
- `docker info`: show server and client info
- `docker container run -it -p 80:80 <nginx>` : create and run and publish docker container of enginx server on port 80 (default) in the foreground.
- ` docker container run -d -p 8080:80 --name <container_name> <image>`:
- `docker container ls`: list all running containers.
- `docker container ls -a` : list all containers wether they are running or not
- `docker container rm <container_id>`: delete a container with the id of :container_id from your system.
- `docker images`: list all images on your machine
- `docker pull <image_name> : download the <image_name> from `docker hub`
