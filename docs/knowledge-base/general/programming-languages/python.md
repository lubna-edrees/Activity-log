# python

## ternary operations:

```python
state = "nice" if is_nice else "not nice"
```

## import files

```py
from fileName import module # same root directory
from folder.fileName import module # if the file existed in a sub directory
```

## General

| function             | description                                    |
| :------------------- | :--------------------------------------------- |
| print(any, sep="\t") | print any number of arguments separated by Tab |
| pprint(any)          | pretty print                                   |

## Dictionary

| function                 | description                                                                       |
| :----------------------- | :-------------------------------------------------------------------------------- |
| d = dict()               | create empty dict                                                                 |
| d.get(key, defaultValue) | get the value of a key in dictionary, if not found will assign defaultValue to it |
| d.keys()                 | return a list of all keys in dictionary                                           |
| d.values()               | return a list of all values in dictionary                                         |
| d.items()                | return a list of items as key, value Tuple                                        |

## Random

| function                  | description                                                              |
| :------------------------ | :----------------------------------------------------------------------- |
| access random by          | import random                                                            |
| random.random()           | generates random real (float) numbers between 0.0 and 1.0 (not included) |
| random.randint(low, high) | generates random integer between low and high (both included)            |
| random.choice(list)       | selects a random element from the list.                                  |

## List

| function               | description                                                |
| :--------------------- | :--------------------------------------------------------- |
| t = list()             | create empty list                                          |
| t.sort( reverse=True ) | sort list descending order                                 |
| t.extend(list)         | take every element of list and add it to end of t by order |
