# GoLang Docs
## commands
- `go version`
- `go env`: lists all en variables.
- `go run file.go`
- `go install` : build all apps into `go/bin`
- `go build`: build this project inside this folder
- `go mod init <projectName> ` : create `go.mod` file for you, similar to package.json
- `go test -cover ./...` will run all the tests around the project.

## notes
- will not run if unused var.
- prettier will remove the unsued imports automatically.
- if you want to compile with unuseed var, rename it to _
- `makefile` is similar to npm scripts
- when importing local package, never start with `/`, alawyas start with the project name.
- when appending a struct or slice or map with a new item, never pass the added item by reference, alaways exeplicitly pass its value.

## Math
- `math.sqrt2` >>> 1.4142135623730951
- `math.Floor(2.7)`  >>> round down // 2
- `math.Ceil(2.7)`  >>>> round up // 3

## maps
- key/value pairs (like objects)
- use map of maps:
  ```go
    var mapOfMaps = make(map[string]map[string]string)

	  mapOfMaps["_key1 "] = map[string]string{"key1": "value1", "key2":"value2"}
    
    // { "_key1" : { "key1" : "value1", "key2":"value2" } }
  ```

## slices
- array with no predefined length

## Functions
- `strconv.Itoa`: convert to string

## Packages
- `log`: logging to the cosole.
- `net/http`: create a server
- `encoding/json`: stringify, destringify json
- `github.com/gorilla/mux`: lite weight server
- `strconv`: handle strings


## web Apps
- read request body in pure net/http:

	```go
		router.HandleFunc("/test", func(res http.ResponseWriter, req *http.Request) {
		d, _ := ioutil.ReadAll(req.Body)
		log.Printf("data passed is %s", d)
		})
	```
