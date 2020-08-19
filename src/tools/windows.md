<!-- markdownlint-disable MD004 MD026 MD009 MD046 -->
# Windows

## General notes

* it's fine to delete files that are no more than 24 hours old from `c/windows/users/username/AppData/Temp` 

## freeing memory using cleanManager

1. open task runner `windowsIcon + R`.
2. type `cleanmgr.exe` then hit run.

## windows Powershell

- env path

    ```java
        $env:path // shows env path variables
        $env:Path -split ';' // show env path vars, single line for each var
        
    ```
