console.log('Testing module: ./components/folder - Folder class ');

const assert = require('assert');
const pcb = require('../../index');

let name1 = "FolderOne";
let nameC1 = "FolderCOne";
let nameC2 = "FolderCTwo";

// Test constructor
let folder = new pcb.Folder(name1);
assert( folder.name === name1, "folder.name should equal name1");
assert( Array.isArray(folder.item), "folder should have an array of item");
assert( folder.item.length === 0, "folder.item[] should be length 0");

// Test addFolder
let folderC1 = new pcb.Folder(nameC1);
assert( folder.addFolder(folderC1) === folder, "folder.addFolder() must return a reference to folder");
assert( folder.item[0] === folderC1, "folder.item[0] should be equal to folderC1");
assert.throws( () => { folder.addFolder() } );

// Test createFolder
assert( folder.createFolder(nameC2) === folder.item[1], "folder.createFolder must return a reference to the newly created folder");
assert( folder.item.length === 2, "folder.item.length should be 2");
assert.throws( () => { folder.createFolder() } );

console.log('must add test for addRequestItem, but do RequestItem tests first');