# MATH 1280: unit 1: Introduction to statistics

## Definitions

-   **science of statistics**: deals with the collection, analysis, interpretation and presentation of data.
-   **probability**: study uncertainty, formalization and quantification of the notion of uncertainty, deals with the chance of event occurring.
-   **population**: entire collection of persons, things or objects under study.
-   **sample**: studying entire large populations is inefficient; a sample is a portion **(or subset)** of the entire population, this sample will be studied to gather information about the population.
-   **statistic**: a number that is a property of the **sample**.
-   **parameter**: a number that is a property of the **population**; a statistic of a sample is used to **estimate** a parameter of the population; the better the sample representing the entire population the more accurate the estimation of the parameter from the statistic.
-   **average (mean)**: (sum) / (count)
-   **portion**: (count (size) of specific group) / (size of entire population or sample).

## R programming language

-   R is object oriented;
-   `<-` is the assignment operator in R.
-   **every variable is an object in R**.
-   some R functions that are available in R shell:

    |                R function                 | its action                                                                                                             |
    | :---------------------------------------: | :--------------------------------------------------------------------------------------------------------------------- |
    |                c(...args)                 | combine all its args into one object                                                                                   |
    |               table(object)               | prints a table that contains the frequency of each element in the object                                               |
    |                plot(table)                | plots the table content                                                                                                |
    |                  getwd()                  | get the current working directory                                                                                      |
    |                setwd(path)                | set current directory to the supplied path                                                                             |
    |               mean(object)                | calculates the mean of this object                                                                                     |
    |              summary(object)              | find the most common stats calculations for this object such as: mean, median, 1,2,3rd Quarter ..                      |
    |        save.image (filename.Rdata)        | saves the current workspace image into a workspace image file called `filename.Rdata` in the current working directory |
    |              rm(list = ls())              | clear session memory                                                                                                   |
    |                    q()                    | quits the shell                                                                                                        |
    |           load(filename.Rdata)            | loads values saved in a workspace image `file.Rdata` into session memory                                               |
    |            read.csv (filePath)            | reads csv file                                                                                                         |
    |               file.choose()               | opens a finder navigator to select a file                                                                              |
    | read.table (filePath, headers, sep =",")  | same as read.csv()                                                                                                     |
    |           read.delim(filePath)            | reads tabular data from **tab delimited** .txt files                                                                   |
    |               View(object)                | open detailed description of the object in the view popup                                                              |
    | write.table (object, filename, separator) | export object data into external file, filename contains the extension of the new file                                 |
    |      write.csv(...), write.csv2(...)      | as above, but only export csv files                                                                                    |

## References

-   Yakir, B. (2011). Introduction to Statistical Thinking (With R, Without Calculus). Retrieved from <http://pluto.huji.ac.il/~msby/StatThink/IntroStat.pdf>
