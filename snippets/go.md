# GoLang Docs
## commands
- `go version`
- `go env`: lists all en variables.

### run
- `go run file.go` : will compile and build then execute your file
- `$GOPATH/bin/<file>` : execute file.exe file after `file.go` being compiled.

### compile
- `go install` : build (compile) all apps into `GOPATH/bin`
- `go install <dir>/<file>` compile that file into `GOPATH/bin`
- `go build`: build (compile) this project inside this folder

### init
- `go mod init <projectName> ` : create `go.mod` file for you, similar to package.json

### test
- `go test -cover ./...` will run all the tests around the project.

## Definitions
- `GOROOT`: the folder where goLang is installed
- `GOPATH`: the folder or workspace that contains all your go code.
- by default, on widows, `GOPATH =C:/Users/<user>/go `, `GOROOT=C:/Go`
### `package clause`
the first line of the package:
1. `package main` : entry point
2. `package <packageName>` : package name `should` match the directory they are in, multiple files can form one package.


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
- `fmt.Sprintln(a,b)`: converting to one string `a + " " + b  \n`
- `fmt.Sprint(a,b)` : return one s `a+b`

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
