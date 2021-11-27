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
    
 ## UEFI and secure boot
 
 - some new computers onlly allow windows to run, through their uefi settings.
 - secure boot is the feature that prevent other system from runing.
 - IMPORTANT: if you want in any case to change the boot path, you need to disable secuer boot from: start_computer > F2 > uefi settings.
