<!-- markdownlint-disable MD004 MD026 MD009 MD046 -->
# Bash shell

## intro

- intro

    ```js
    time // show the time
    date // show the date dd/mm/yyyy
    echo "" // print something
    path // show env vars path
    which <program name> // show the path for this program
    pwd // print working directory
    tail // show the last 10 lines of file
    tail -n1 // show the last line of file
    tee <file name> // open interactive to write to file line by line
   
    ```

- cd

    ```js
        cd < relative path | absolute path > // move to that path
        cd ~ // go home
        cd - // go to previous path
    ```

- clear the terminal

    ```js
    clear // clear the terminal
    Ctrl + l // clear the console.
    ```

## File Tree

- ls

  ```js
      ls --help // ls help
      ls // show all files.
      ls -a // show all files, including hiddens.
      ls -l // show all files with details
  ```

- tree

    ```js
        tree // show only folder structure
        tree /f // show folders with files
    ```

## Handle files

- open files

    ```js
    cat file.ext // open file in the terminal

    ```

- delete file

    ```js
        rm <file_name> //  delete a file
        rm -r <directory_name> // delete a directory
    ```

- move, copy, rename files

    ```java
    mv <path1/file> <path2/file> // move file from path1 to path2
    mv <path/file1> <path/file2> // rename file1 to be file2
    cp <path1> <path2> // copy file from path to path
    cat < file1 > file2 // extract file1 content and store it in file2, copy file1 into file 2


    ```

- edit files 

    ```java
    echo "something" > file // create file and write something in it.
    symbol ( > file )  // bind the input stream to something, store something in file
    symbol ( < file)  // bind the output stream to something, extract something from file
    cat file // print file content to the terminal
    cat < file // extract the content of file, and handle it as input to cat.
    cat < file1 > file2 // extract file1 content and store it in file2, copy file1 into file 2
    cat < file1 >> file2 // extract file1 content and "append" it in file2, append file 2
    symbol ( | ) // take the output of command to the left, make it input to the right
    ls -l | tail -n1 // show the last line only of the ls command, ls -l output will be input to tail -n1

    ```

## Curl

- `curl <url>` : make get to url
- `curl -v <url>` : make get to the url with the request info
- ` curl -v -d "<data>" <url> ` : passing data to your request
