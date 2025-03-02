# postman-collection-builder

A way to programatically create and save a postman collection.

## Rationale
I saw the postman API but there was limited doco and the examples were really just an explanation of the json schema

## Installation
`npm i postman-collection-builder`

## Design
The object model in this package mirrors the Postman collection json schema, so that when you save a JSON string of the
Collection object it can be imported into Postman or used with Newman.

Its based on what I have found in the collections I have exported. There could easily be something missing.

### Conventions
Object method names give a hint as to how they behave. There are slightly different return values that are aimed at chaining 
So in the below example of adding an object (a RequestItem) that has already been created, it would be convenient
to have addRequestItem return a reference to the collection so we can chain the method calls. 
eg. `collection.addRequestItem(requestitem01).addRequestItem(requestitem02)`

**Add methods-** methods named `methodOwner.addXxxx(param)` will add the param object passed in to the method owner and return a reference to the method owner.

**Create methods-** methods named `methodOwner.createXxxx(param)` will create a new object and pass back a reference to the newly created obuject, not the method owner. The reason this approach was chosen is that in the prevous case of adding an object we 
already have a reference to the added object. In the case of creating an object, wehave no other (external) method of getting a
reference to the new object.

**Set methods-** methods named `methodOwner.setXxxx(param)` will replace the existing object/ value with the one passed in as param and pass back a reference to the method owner.

## Object Hierarchy

    Collection
        |-- Folder (derived from class Item)
        |   |-- Folder 
        |   |   |-- Folder... (etc.)
        |   |
        |   |-- RequestItem (derived from class Item)
        |   |
        |   |-- Event
        |       |-- Script
        |
        |-- RequestItem
        |   |-- Request
        |   |   |-- Url
        |   |   |-- Headers
        |   |   |   |-- Header
        |   |   |--Body
        |   |       |-- FormData (not yet implemented)
        |   |
        |   |-- Event
        |       |-- Script
        |
        |-- Event
            |-- Script

Class `Collection` can be a parent for one or more `Folder`s and one or more `RequestItem`s. `Collection` maps to a Postman Collection.

`Collection` can also have test scripts and pre request scripts. 

`Folder` and `RequestItem` are derived from class `Item`.

`Folder` maps to a Postman folder.
`RequestItem` maps to a Postman Tab (this is sometimes referred to in Postman doco as a request, but the Postman collection json schema uses the property name `item`).

Class `Item` has functionality common to `Folder` and `RequestItem`, which is the ability to hold an array of `Event`s. We dont use `Item` directly. 

Class `Event` holds the test scripts and the prerequest scripts. It stoes these in an array with exactly one `Script` object for tests and one `Script` object for prerequests (as far as I have seen). We dont use `Event` directly, it only exists to satisfy the postman collection json schema.

`Request` holds the request details for `RequestItem`. `Request` object contains a method (string- POST, GET etc.), a `Url` object, a `Headers` object and a `Body` object.

`Url` holds details of the request url.

`Headers` holds an array of `Header` objects which are string key-value pairs.

`Body` holds the request body as either a 'raw' mode such as json, xml etc or url-encoded form. There may be others that I have not seen.

`Script` contains the just the lines of script code. 

### Notes
(`Collection` is not derived from `Item` because the "name" property is not in the same place and that would require more abstraction that was not warranted). Class `Item` and descendants map to the `item` property in the Postman collection json schema.



