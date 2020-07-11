# Git

## logging


* loging info about repo status:

  ```javascript
    git log --oneline --graph // list all coments, line for every commit
  ```

## commits
* unstage last commit:

  ```javascript
    git reset --soft HEAD~1 // unstage last commit and keep the changes
    git reset --hard HEAD~1 // unstage last commit and discard the changes ** careful
  ```

## Branches 

### list branches :

- list all branches:

    ```javascript
        git branch -a  // list local and remote branches
        git branch -r  // list remote branches only
        git show-branch // list branches and their last commit
    ```

### delete branches

- localy:

  ```javascript
  git branch -d <branch name> //delete branch locally
  ```
- locally, if the branch did not merged (force) :
  
  ```javascript
  git branch -D <branch name> // force delete branch locally
  ```
- remote: 
  
  ```javascript 
  git push origin --delete <branch name>  // delete remote branch
  ```
