# Docker

## Notes
- if your using `docker virtualbox` make sure you open virtualbox and the machine is working while you are using the `cmd`
- you will not find your server on `http://localhost:port` or `0.0.0.0:port`. you will find it on `http://192.168.99.100:port`


## commands
- `docker version`: show docker version
- `docker info`: show server and client info
- `docker container run -it -p 80:80 nginx` : create and run and publish docker container of enginx server on port 80 (default)
- `docker container ls`: list all running containers.
- `docker container ls -a` : list all containers wether they are running or not
- `docker container rm :container_id`: delete a container with the id of :container_id
- `docker images`: list all images on your machine
