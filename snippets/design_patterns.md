# Design Patterns

## intro

- useful for learn frameworks quickly.
- ease communications between teams.
- SRP: single responsiplity priciple, in oop, every class should have only one single responsabilty.
- OCP: open close priciple, our classes should be open for extention, closed for modification.

## Essentials

- package: the name where the main class is actually defined, entry point.
- class:  object that holds properties and methods and can be instanciated.
- public: accessable every where.
- static: we can call the function directly without creating an instance of the classs.
- void: no return.
- main function takes one single argument as an array of strings holds everything you are passing from the command line.

```java

// Main.java
package com.activityLog

public class Main {
    public static void main ( String[] args ) {
        User me = new User("Ahmad"); // calling the constructor of User.

       me.sayHello(); // hello, Ahmad  
    }
}

// User.java
package com.activityLog

public class User {
    // property
    public String name;

    // constructor
    public User( String name) {
        this.name = name;
    }

    // Method
    public void sayHello(){
        system.out.printLn("Hello, " + this.name);
    }
}
```

### class coupling

- when a class is depending on another class. eg. main class is coupling with (depending on) User class.
- if we change User class, Main class may broke, then you need to change it or recompile and redeploy.

### interface
  
  1. a contract that specifies the cabapilities that a class should provide.
  2. it is a class, holds essential functions of the class that they need to be redefined in the classes.
  3. you can't use the interface itself, but you can create a class from it then use this class.

```java
package activityLog

// define interface, TaxCalculator.java
public interface TaxCalculator {
    float calculateTax();
}

// implement class from interface, TaxCalculator2020.java
public class TaxCalculator2020 implements TaxCalculator {
    @override
    public float calculateTax() {
        return 1.0;
    }
}

// implement another class from interface, TaxCalculator2021.java
public class TaxCalculator2021 implements TaxCalculator {
    @override
    public float calculateTax() {
        return 2.0;
    }
}

//main
public class Main {
    public static void main ( String[] args ) {
        TaxCalculator calc = getTaxCalculator();
        clac.calculateTax(); // what ever you change under the hood, this will stay working.
    }

    public static TaxCalculator getTaxCalculator () {

        if( date.year() == 2020 ){
            return new TaxCalculator2020();
        } else {
            return new TaxCalculator2021();
        }
    }
}

```

### encapsulation
  
  1. use access modifiers to encapsulate class properties (class state).
  2. so, no direct changes to class properties except through functions (setters and getters)
  3. bundlling the data and the methods working on this data in one single class. and hide the state of the object inside the class.
  4. so, we protect object state from unwanted changes. then saving our program from going into invalid state.

### Abstraction

1. hiding un-necessary details deep inside the class.
2. this will reduce complexity, functions with less params.
3. we can have few public main method in our class that fires several private functions that we don't see.
4. eg. `MyClass.sendEmail()` and the send emain will be like this `function sendEmail(){ getSender(); getRecever(); copyItToDb(); getSendingStatus() }`
5. so instead of calling those 4 methods manually, we fire `sendEmail()` will trigger them without us knowing that these functions actually existed.

### Inheretance

1. a way of reusing code, so it eliminate redandant code.

### polymorphism

1. many forms.
2. the object can behaves in many forms depending on the context.
3. create an abstract class with an abstract mthod then define those differently in each inhereted class.
4. the extended class can behave as the super class (if it is not abstract or interface) or as his own class.

### UML

- unified moduling language
- draw charts to represent code.

    ![uml language](https://i.imgur.com/2JDuWL4.png)

- meaning of the three types of arrows in the diagrams:

    ![arrows meaning](https://i.imgur.com/YRjRSC9.png)

## Memento pattern

- 3 classes: originator, memento, caretaker.

- undo problem (mechanism).
- create our class eg. Editor, have 2 funcs: `createState()`, `restoreState()`. ----> `originator`.
- create another class eg. EditorState to save the state of our class. ------> `memento`
- push our states to a third class called history which stores list of our class states. have funcs: `pushToHistory()` , `popFromHistory()`. ------> caretaker

 ![memento pattern](https://i.imgur.com/oAaXPJe.png)

## state patteren

### naiive

- the app behavior changes with a state variable.
- this state variable should be private on its class and you need setters and getters to deal with it.
- you can pass this state by define it on top of your application then pass it to every other class in the app.
- at every function you should check for this state app and define different behavior depending on this state.

    ![example](https://i.imgur.com/J6UbujD.png)

### pattern

- polymorphism is essential.
- 3 classes: context, state, concreteStateA, concreteStateB ..
- canvas problem

- you define a canvas class has the mouse listeners functions . ---> context.
- define a new class called tool wich also have the same functions. -----> state.
- the second class should be abstract and take the defentions of its functions from other classes like selection or bruch, those classes have the dedfinitons of those functions. ----> concreteStates.
- the second class (state) chooses the functions defentions depending on the app state.

    ![state pattern](https://i.imgur.com/RpLq8FS.png)
