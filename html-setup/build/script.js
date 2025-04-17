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
    var _a, _b, _c, _d, _e;
    (_a = document.getElementById("booklistBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", fetchAll);
    (_b = document.querySelector("addbookForm")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", addBook);
    (_c = document.getElementById("updateForm")) === null || _c === void 0 ? void 0 : _c.addEventListener("submit", updatebook);
    (_d = document.getElementById("deleteForm")) === null || _d === void 0 ? void 0 : _d.addEventListener("submit", deletebook);
    (_e = document.getElementById("getbookidForm")) === null || _e === void 0 ? void 0 : _e.addEventListener("submit", getbookbyid);
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
    <div><strong>ID:</strong></div>
    <div>${book._id}</div>
    <div><strong>Title:</strong></div>
    <div>${book.Title}</div>
    <div><strong>Author:</strong></div>
    <div>${book.Author}</div>
    <div><strong>ISBN:</strong></div>
    <div>${book.ISBN}</div>
    <div><strong>Summary:</strong></div>
    <div>${book.Summary}</div>
    `;
        list.appendChild(li);
    });
}
function getbookbyid(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const id = document.getElementById("getbookByID").value;
        const getbookid_url = `https://u05-restful-api-jossan93.onrender.com/api/books/${id}`;
        console.log("Fetching book with ID:", id);
        try {
            // Skicka GET-begäran till API:t
            const response = yield fetch(getbookid_url);
            // Kontrollera om svar från API är okej
            if (response.ok) {
                // Läs data som bok
                const book = yield response.json();
                console.log("Book fetched:", book); // Logga den hämtade boken
                // Visa bokdetaljer på sidan
                const bookDetails = document.getElementById("bookDetails");
                if (book) {
                    bookDetails.innerHTML = `
                    <h3>Book</h3>
                    <strong>Title:</strong> ${book.Title}<br>
                    <strong>Author:</strong> ${book.Author}<br>
                    <strong>ISBN:</strong> ${book.ISBN}<br>
                    <strong>Summary:</strong> ${book.Summary}
                `;
                }
                else {
                    bookDetails.innerHTML = `<p>Book not found.</p>`;
                }
            }
            else {
                console.error("Error fetching book:", response.statusText);
                alert("Book not found.");
            }
        }
        catch (error) {
            console.error("Error:", error);
            alert("Error fetching book.");
        }
    });
}
function addBook(event) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        event.preventDefault(); // Stoppar sidans omladdning
        const add_url = "https://u05-restful-api-jossan93.onrender.com/api/books/createBook";
        const newBook = {
            Title: ((_a = document.getElementById("addTitle")) === null || _a === void 0 ? void 0 : _a.value.trim()) || "",
            Author: ((_b = document.getElementById("addAuthor")) === null || _b === void 0 ? void 0 : _b.value.trim()) || "",
            ISBN: Number((_c = document.getElementById("addISBN")) === null || _c === void 0 ? void 0 : _c.value.trim()),
            Summary: ((_d = document.getElementById("addSummary")) === null || _d === void 0 ? void 0 : _d.value.trim()) || ""
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
                (_e = document.querySelector("addbookForm")) === null || _e === void 0 ? void 0 : _e.reset(); // tömmer formuläret
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
function updatebook(event) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        console.log("🟡 updatebook körs!");
        event.preventDefault();
        const id = document.getElementById("updateID").value;
        const update_url = `https://u05-restful-api-jossan93.onrender.com/api/books/update/${id}`;
        console.log("Uppdaterar bok med URL:", update_url);
        const updatedBook = {
            Title: ((_a = document.getElementById("updateTitle")) === null || _a === void 0 ? void 0 : _a.value) || "",
            Author: ((_b = document.getElementById("updateAuthor")) === null || _b === void 0 ? void 0 : _b.value) || "",
            ISBN: ((_c = document.getElementById("updateISBN")) === null || _c === void 0 ? void 0 : _c.value) || "",
            Summary: ((_d = document.getElementById("updateSummary")) === null || _d === void 0 ? void 0 : _d.value) || ""
        };
        try {
            const response = yield fetch(update_url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedBook)
            });
            if (response.ok) {
                const data = yield response.json();
                console.log("Book updated successfully:", data);
                // alert("Book updated!");
                fetchAll(); // ladda om boklistan
                document.getElementById("updateForm").reset();
            }
            else {
                console.error("Update failed:", response.statusText);
                alert("Failed to update book.");
            }
        }
        catch (error) {
            console.error("Error updating book:", error);
            alert("Error connecting to server.");
        }
    });
}
function deletebook(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const id = document.getElementById("deleteID").value.trim();
        try {
            const res = yield fetch(`https://u05-restful-api-jossan93.onrender.com/api/books/delete/${id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                document.getElementById("deleteForm").reset();
                fetchAll();
            }
        }
        catch (err) {
            console.error("Delete failed:", err);
        }
    });
}
