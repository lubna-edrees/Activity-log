# Git

- list all branches : 
  
    ```js
      git branch -a  // list local and remote branches
      git branch -r  // list remote branches only
      git show-branch // list branches and their last commit

    ```
- unstage last commit:
  
    ```js
    git reset --soft HEAD~1 // unstage last commit and keep the changes
    git reset --hard HEAD~1 // unstage last commit and discard the changes ** careful
    ```
- loging info about repo status:
    ```js
    git log --oneline --graph // list all coments, line for every commit
    ```
