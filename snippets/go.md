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

- `go mod init <projectName>` : create `go.mod` file for you, similar to package.json

### test

- `go test -cover ./...` will run all the tests around the project.

## Definitions

- `GOROOT`: the folder where goLang is installed
- `GOPATH`: the folder or workspace that contains all your go code.
- by default, on widows, `GOPATH =C:/Users/<user>/go`, `GOROOT=C:/Go`

### package clause

the first line of the package:

1. `package main` : entry point
2. `package <packageName>` : package name `should` match the directory they are in, multiple files can form one package.

## notes

- will not run if unused var.
- prettier will remove the unsued imports automatically.
- if you want to compile with unuseed var, rename it to \_
- `makefile` is similar to npm scripts
- when importing local package, never start with `/`, alawyas start with the project name.
- when appending a struct or slice or map with a new item, never pass the added item by reference, alaways exeplicitly pass its value.
- only capitalized functions or Vars are exported from packages.

## Math

- `math.sqrt2` >>> 1.4142135623730951
- `math.Floor(2.7)` >>> round down // 2
- `math.Ceil(2.7)` >>>> round up // 3

## maps

- key/value pairs (like objects)
- use map of maps:

  ```go
    var mapOfMaps = make(map[string]map[string]string)

  }

    // { "_key1" : { "key1" : "value1", "key2":"value2" } }
  ```

## slices

- array with no predefined length

## Functions

- `strconv.Itoa`: convert to string
- `fmt.Sprintln(a,b)`: converting to one string `a + " " + b \n`
- `fmt.Sprint(a,b)` : return one s `a+b`

## pointers with go

- Go:

  ```javascript
  	  var x int; // assign var named x
  	  &x // give us the memory addres where x stored, &x is of type pointer to T of x (*int)
  	  *(&x) // give us the value that stored in address (&x)
  	  x == *(&x) //true
  ```

- Example:

  ```go
  	var x int;
  	fmt.Printf("%T", &x) // *int, type of pointer to int, Reserves 4 bytes in memory.
  	fmt.Printf("%p", &x) // 0xc00002c008, momory address for the the pointer to x
  	fmt.Printf("%T", x) // int, type of int.
  	fmt.Printf("%p", x) // 0, value of x
  	fmt.Printf("%T", *(&x)) // int, type of the value that stored in the momory address (&x)
  
     // writtin to memory using memory addres
     *(&x) = 4;

	  fmt.Printf("%v\n", x)  // x is now 4;
  ```

### pass pointers to functions

you can pass vars to functions in go :
1. by pointers:  
   1. the function gets access to the memory address (location) to the passed var, so it can directly change it's value.
   2. in the function declaration: specify the type of var as `*varType`.
   3. when calling the function: pass the var as `&varName`.

2. pass by value: 
   1. just pass a normal var, 

3. there is no passing variables by reference. because there are no 2 variables pointing to the same memory address

  ```go

    func main() {
      var x, y int = 5,6;

      SwapByPointers(&x,&y) // call the swapper passing memory addreses of x and y.
      fmt.Println(x,"\n",y) // x now 6, y is 5

       SwapByValue(x,y) // call the swapper passing reference for x and y.
      fmt.Println(x,"\n",y) // x now 6, y is 5
    }

    // passing *int which is a pointer to int
    func SwapByPointers(a *int, b *int){
      var temp int = *(a) // storing the value in the stored memory (&a) into temp.
      *(a) = *(b) // swapping the values existed in the memory.
      *(b) = temp;
    }

    // passing the var, and then use its reference to do the swap
    func SwapByValue(a int, b int){
      var temp int = *(&a)
      *(&a) = *(&b)
      *(&b) = temp;

}
  ```

## Packages

- `log`: logging to the cosole.
- `net/http`: create a server
- `encoding/json`: stringify, destringify json
- `github.com/gorilla/mux`: lite weight server
- `strconv`: handle strings

## web Apps

- read request body in pure net/http:

```go
router.HandleFunc("/test", func(res http.ResponseWriter, req \*http.Request) {
d, \_ := ioutil.ReadAll(req.Body)
log.Printf("data passed is %s", d)
})

````

## references

- https://segment.com/blog/allocation-efficiency-in-high-performance-go-services/#:~:text=Go%20allocates%20memory%20in%20two,will%20be%20on%20the%20stack.
- https://blog.golang.org/pprof

