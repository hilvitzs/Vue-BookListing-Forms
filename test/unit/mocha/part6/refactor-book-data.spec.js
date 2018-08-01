const assert = require("chai").assert;
const esquery = require("esquery");
const esprima = require("esprima");
const helpers = require("../helpers");

describe("BookForm.vue", () => {
  it("should contain a data function that returns a bookData object @book-form-contains-data-object", () => {
    const file = helpers.readFile("src/components/BookForm.vue");
    const nodes = helpers.parseFile(file);
    const script = helpers.getHtmlTag("script", nodes);

    if (script.length == 0) {
      assert(
        false,
        "We either didn't find a script tag, or any code in a script tag in the BookForm component."
      );
    }

    const ast = esprima.parse(script[0].childNodes[0].value, {
      sourceType: "module"
    });

    const data = esquery(ast, "Property[key.name=data]");
    assert(
      data.length > 0,
      "The BookList's `data()` method's return is not present"
    );

    const bookData = esquery(ast, "Property[key.name=bookData]");
    assert(
      bookData.length > 0,
      "The BookList's `bookData` object is not present"
    );

    let bookTitle = esquery(
      data[0],
      'Property[key.name=bookTitle] > .value[value=""]'
    );

    assert(
      bookTitle.length > 0,
      "The `bookData` `bookTitle` property is not defined with value of `''`"
    );

    let bookAuthor = esquery(
      data[0],
      'Property[key.name=bookAuthor] > .value[value=""]'
    );
    assert(
      bookAuthor.length > 0,
      "The `bookData` `bookAuthor` property is not defined with value of `''`"
    );

    let finishedReading = esquery(
      data[0],
      "Property[key.name=finishedReading] > .value[value=false]"
    );

    assert(
      finishedReading.length > 0,
      "The `bookData` `finishedReading` property is not defined with value of `false`"
    );

    let borrowed = esquery(
      data[0],
      "Property[key.name=borrowed] > .value[value=false]"
    );

    assert(
      borrowed.length > 0,
      "The `bookData` `borrowed` property is not defined with value of `false`"
    );

    let bought = esquery(
      data[0],
      "Property[key.name=bought] > .value[value=false]"
    );

    assert(
      bought.length > 0,
      "The `bookData` `bought` property is not defined with value of `false`"
    );

    let notes = esquery(
      data[0],
      "Property[key.name=notes] > .value[value='My notes about the book:']"
    );

    assert(
      notes.length > 0,
      "The `bookData` `notes` property is not defined with value of `My notes about the book:`"
    );
  });
});