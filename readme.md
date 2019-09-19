# postman-collection-builder

A way to programatically create and save a postman colleciton. My main aim was to be able to create a 
postman collection from database records to automate
testing.

## Rationale
I saw the postman API but there was limited doco and the examples were really just an explanation of the json schema

I type check a lot of inputs and throw on them because this is run in a dev environment, so no need to handle errors, just fix them.

I wanted to have everything in one file because they are all related, but it got pretty long and unwieldy

## To Be Sorted
I like the addxxx methods to return the object they come from for chaining, like a Collection's addFolder
method to return the collection aso you can go
`collection.addFolder('FolderOne').addFolder('FolderTwo')`
*** got it- use createFolder which returns a ref to foler
use addFolder which adds an existing folder. No ref required so return a ref the the object 
holding the addFolder (collection, FOlder or Item) then this can chain more add folders,
the idea being that if you addFolder(exitsingFolder) you already have a ref to it

