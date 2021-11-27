<!-- markdownlint-disable MD004 MD026 MD009 MD046 -->
# shell scripting

## intro

- intro

    ```java
    file.sh // file extention for shel files.
    $foo = "bar"  // define foo
    echo $foo // print foo value
    echo "something $foo" // $foo is a variable, this won't work with single quote.
    echo "something $(<cmnd>)" // cmnd will be executed, and its value will be addeed to the string.
    $# // number of arguments
    $0 // comand name
    $1 - $9 // first - 9th argument
    $$  // Process identification number (PID) for the current script
    -ne // not equal
    convert image.{png,jpg} // convert image.png or image.jpg



    ```

## comments

- .cmd files:

    ```shell
        @echo off
        rem your comment here
        rem another comment line
    ```

- .sh files:

    ```shell
        # your comment here
        # another comment line
    ```

## Execute

- run .sh files in cmd or powershell:

    ```shell
        Bash <file.sh> <args>
        sh <file.sh> <args>
    ``` 

## handy shell scripts

- create private github repo from the terminal:

    ```shell
        create=curl -H "Authorization: token <token>" -H "Contnet-Type: application/json" https://api.github.com/user/repos -d "{ \"name\": \"$1\", \"private\": true }"
    ```

- create private github repo and add it to the existing project: 

    ```shell
        create-add=curl -H "Authorization: token <token>" -H "Contnet-Type: application/json" https://api.github.com/user/repos -d "{ \"name\": \"$1\", \"private\": true }" && git remote add origin https://github.com/<your github user name>/$1.git
    ```

- create folder and cd into it:

    ```shell
        mcd=mkdir $1 && cd $1
    ```

## references:

- [1] [CAMBRIDGE: shell scripting](https://www.youtube.com/watch?v=kgII-YWo3Zw)