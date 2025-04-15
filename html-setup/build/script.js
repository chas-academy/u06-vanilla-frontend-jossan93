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
    var _a;
    (_a = document.getElementById("booklist")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", fetchAll);
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
            console.error("Det har blivit error", error);
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
