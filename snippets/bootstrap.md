# Bootstrap

- bootsrap : `<i class="material-icons">Ahmad Ali</i>`
- div `.col-12 col-sm-6` : 12 on xs, 6 on sm and above.
- div `.col`: 12 on all.
- div `.col-sm-4`, div `.col-sm`, div `.col-sm-3` : from sm and above, first div 4, last div 3, middle div will take the rest.
- item `.d-sm-none d-md-block` : hide from sm and above, until find another `d` will show from md and above.
- class `order`: EX: `.sm-order-first` and `.sm-order-last`.
- center vertically: `.align-items-center` or `align-self-center`
- center Horizontally : `text-center` or `justify-content-center`
- navbar:
  - nav: `.navbar navbar-dark navbar-expand-sm bg-primary` : dark blue nav, stacked on sm.
  - nav > ul : `.navbar-nav mr-auto` : left side menu.
  - nav > ul > li : `.nav-item` :
  - nav > ul > li: `.active` : highlight current page link.
  - nav > ul > li > a : `.nav-link`
  - navbar menu button: `<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu-id" >`
  - menu button > span : `.navbar-toggler-icon`
  - surround ul menu with div: `<div class="collapse navbar-collapse" id="#menu-id">`
- push elemnt as much as you cant to the left (margin right): `.mr-auto`.
- push elemnt as much as you cant to the right (margin left): `.ml-auto`.

- bootsrap breadcrumbs:

```html
<ol class="col-12 breadcrumb">
  <li class="breadcrumb-item"><a href="index.html">Home</a></li>
  <li class="breadcrumb-item active">About</li>
</ol>
```

- `.table-responsive`: should added in a wrapper div, not applied to the table directly.
- addtional html tags: `dl` `dt` `dd` `blockqoute` `embed` `object`
- bootsrap images: `.umg-fluid` `.rounded` `.rounded-corners` `.rounded-circle`
- Bootstrap javascript:
  - `tabs` and `pills` navigation.
    ![nav pills](https://i.imgur.com/Z8m15k0.png)
  - `accordion` navigation
  - `tooltips` `popover` `modals`
  - tooltips code: `data-toggle="tooltip" data-html="true" title="string" data-placement="bottom"`
