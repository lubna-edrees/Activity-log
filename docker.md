# Docker

## commands
- `docker container run -it -p 80:80 nginx` : create and run and publish docker container of enginx server on port 80 (default)
- you will not find your server on `http://localhost:port` or `0.0.0.0:port`. you will find it on `http://192.168.99.100:port`
