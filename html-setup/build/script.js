"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
window.addEventListener("DOMContentLoaded", () => {
    var _a, _b;
    (_a = document.getElementById("booklistBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", fetchAll);
    (_b = document.querySelector("form")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", addBook);
});
function fetchAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const all_url = "https://u05-restful-api-jossan93.onrender.com/api/books/";
        try {
            const response = yield fetch(all_url);
            if (!response.ok) {
                throw new Error(`HTTP fel: ${response.status}`);
            }
            const books = yield response.json();
            console.log(books);
            renderBooks(books);
        }
        catch (error) {
            console.error("Something gone wrong", error);
        }
    });
}
function renderBooks(books) {
    const list = document.getElementById("bookList");
    if (!list)
        return;
    list.innerHTML = "";
    books.forEach(book => {
        const li = document.createElement("li");
        li.innerHTML = `
      <strong>Title:</strong> ${book.Title}<br>
      <strong>Author:</strong> ${book.Author}<br>
      <strong>ISBN:</strong> ${book.ISBN}<br>
      <strong>Summary:</strong> ${book.Summary}
    `;
        list.appendChild(li);
    });
}
function addBook(event) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        event.preventDefault(); // Stoppar sidans omladdning
        const add_url = "https://u05-restful-api-jossan93.onrender.com/api/books/createBook";
        const newBook = {
            Title: ((_a = document.getElementById("addTitle")) === null || _a === void 0 ? void 0 : _a.value) || "",
            Author: ((_b = document.getElementById("addAuthor")) === null || _b === void 0 ? void 0 : _b.value) || "",
            ISBN: ((_c = document.getElementById("addISBN")) === null || _c === void 0 ? void 0 : _c.value) || "",
            Summary: ((_d = document.getElementById("addSummary")) === null || _d === void 0 ? void 0 : _d.value) || ""
        };
        try {
            const response = yield fetch(add_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newBook)
            });
            if (response.ok) {
                const data = yield response.json();
                console.log("Book has been added:", data);
                //alert("Book has been added!");
                fetchAll();
                (_e = document.querySelector("form")) === null || _e === void 0 ? void 0 : _e.reset(); // tömmer formuläret
            }
            else {
                console.error("Something went wrong:", response.statusText);
                alert("Error adding book");
            }
        }
        catch (error) {
            console.error("Error:", error);
            alert("Connection error.");
        }
    });
}
