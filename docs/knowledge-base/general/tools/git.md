<!-- markdownlint-disable MD004 MD026 MD009 -->
# Git

## Theory [1]:

- data types in git system:
   
   ```java
    /* 1 */ type blob = array<bytes> // file = blob, contain text as bytes
    
    /* 2 */ type tree = map<string><tree | blog> // tree = folder, the string (name of folder) points to the 
          //contents ( can be files or folders) (blobs or another tree)
    
    /* 3 */ type commit =  struct {
      parents : array <commits>  // the actual commit, snapchot of the whole contnet of the repo
      author : string
      message : string
      snapshot: commit

    }
    
    /* 4 */ type object = blob | tree | commit // we refer to any type with object

    /* 5 */ type objects = map <string><object> // the string (object name) points to the actual object

    /* 6 */ function store (object){
        id = hash(object); // hash the object then store this hash in objects map, where it points to the actual object
        objects[id] = object;
    }

    /* 7 */ function load (id){
       return objects[id]; // it retrives the actual object by its id (or hash)
    }

    /* 8 */ type references = map <string> <string> // maps the names I give to the hashes that git gives,
          // so I can access eather by hash or my name.

   ```

   ![theory of git](https://i.imgur.com/9Jmls3W.png)

## logging

* loging info about repo status:

  ```javascript
    git log --oneline --graph // list all commits, line for every commit
    git log --all --graph --decorate // more visual representation.
  ```

- log more data on a specific commit [1]:

    ```git
      git cat-file -p <commit hash>
    ```

## commits

- unstage last commit:

  ```javascript
    git reset --soft HEAD~1 // unstage last commit and keep the changes
    git reset --hard HEAD~1 // unstage last commit and discard the changes ** careful
  ```

- show diff:

  ```javascript
      git diff  // shows diff between HEAD commit, and your files now for entire repo
      git diff <file name> // shows diff between HEAD commit, and your files now for specific file
      git diff <commit1 | branch1> <commit2 | branch2> /* diff between commit1/branch1 and commit2/branch2 for all files */
      git diff <commit1 | branch1> <commit2 | branch2> <file name> /* diff between commit1/branch1 and commit2/branch2 for specifi file. */
      git diff --cached // show the staged chunks

  ```

- delete un staged changes :

  ```javascript
      git checkout <file name> // through away all un stagged changes
      git commit --amend // edit a commit’s contents/message
  ```

- stage only part of the changes to one file (stage chunk of a file):

  ```js
  git add -p <file name> // open interactive terminal to choose which parts u want to commit
  git diff --cached // show the staged chunks
  ```

- show

  ```js
  git show <commit hash> // show deatailed info for that commit
  ```
  
# Undo changes

- discard all changes before staging or commiting them

   ```git
      git reset --hard
   ```
- discard changes in one file:

   ```git
      git checkout -- <file>
   ```

## Branches

- list all branches:

    ```javascript
        git branch // all branches
        git branch -a  // list local and remote branches
        git branch -r  // list remote branches only
        git show-branch // list branches and their last commit
        git branch -vv // list all branches that my env is aware of in details.
    ```

- create Branches

  ```javascript
    git branch <branch name>; git checkout <branch name>; // create new branch, checkout to its
    git checkout -b <branch name> // create new branch, checkout to its
  ```

- delete branches

  ```javascript
  git branch -d <branch name> //delete branch locally
  git branch -D <branch name> // force delete branch locally, if the branch did not merged (force)
  git push origin --delete <branch name>  // delete remote branch
  ```

- remove all deleted remote branches from  local environment (list of branches in VS code)s:
  
  ```javascript
   git fetch --prune //rmove deleted branches from VS list
   ```

- merge branches:

  ```javascript
    git merge <branch name> // merges brannc_name with the current branch you are in.
    git merge --abort // aborting merge command
    git merge --continue // continuing merge process after we resolve conflicts.

  ```

- reslove conflicts:

  ```javascript
  git mergetool // opens interactive command line tool to resolve  conflicts, or open your editor
  ```

## remote

- clone

  ```javascript
    git clone <url> <folder name> // clone remote repo to ur env with all version control history
    git clone <url> <folder name> --shallow // clone only the latest snapshot of remote repo to ur env.

  ```

- fetch and pull:

  ```js
  git push // if u set upstream, u can push directly to the origin.
  git fetch <remote> <branch> // fetch changes in the remote branch, but don't merge them. 
  git fetch <remote> <branch>; git merge; // fetch remote branch, merge it with the current branches
  git pull <remote> <branch>  // fetch remote branch and merge it.
  ```

- handle remote branches: 

  ```javascript
  git remote // list all remote repos
  git remote add <name> <url> // add remote repo, u can access it by name.
  git push <remote name> <local branch>:<remote branch> // push local branch content into remote branch.
  "git branch --set-upstream-to=<remote_name>"  // setting the upstream as remote repo
  ```

## gitconfig

## git blame 

- show whose and which commits resposible for particular challenges

  ```js
  git blame <file name> // show whose and which commits resposible for every line in the file
  ```

## git stash

- save changes temporarly without staging them, then retrive those changes later

  ```js
  git stash // save changes temprarly
  git stash pop // retrive stashed changes
  git stash list // list all stashes as 
  
  /**
   stash@{0}: WIP on feat-reminders: c3012fd chore: reminders final QA and testing adjustments
   stash@{1}: On develop: stach1
   stash@{2}: On improve-asana-sync: move to develop
  */
  
  git apply stash@{0} // apply this stash
  ```

## git rebase [2]

- The second way of combining work between branches is rebasing (first is merging).
- Rebasing takes a set of commits, "copies" them, and plops them down somewhere else.
- rebasing can be used to make a nice linear sequence of commits. The commit log / history of the repository will be a lot cleaner if only rebasing is allowed.

- we have this situation:

    ![start](https://i.imgur.com/gH3fv3m.png)

1. `git rebase master`

    ![git rebase master](https://i.imgur.com/GfbW4CF.png)

    the commit C3 still exists somewhere (it has a faded appearance in the tree), and C3' is the "copy" that we rebased onto master.

2. `git rebase bugfix`

  ![git rebase bugfix](https://i.imgur.com/F9uTUgO.png)

  Since master was an ancestor of bugFix, git simply moved the master branch reference forward in history.

- rebase commands:

  ```js
  git rebase <branch name> // rebase the parrelel branch into the main backbone of changes
  git rebase -i // interactive rebasing
  ```

## git bisect

- manually search history for something
- useful in find the first commit where something broke
- do binary search in the history

## references

- [1] [CAMBRIDGE: lecture 6 : version control](https://www.youtube.com/watch?v=2sjqTHE0zok&t=3020s)
- [2] [learnbranching.js.org](https://learngitbranching.js.org/)
- [3] [successful git branching model](https://nvie.com/posts/a-successful-git-branching-model/)
