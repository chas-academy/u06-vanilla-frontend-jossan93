window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("booklistBtn")?.addEventListener("click", fetchAll);
    document.querySelector("form")?.addEventListener("submit", addBook);
    document.getElementById("updateForm")?.addEventListener("submit", updatebook);
  });  

async function fetchAll() {
    const all_url = "https://u05-restful-api-jossan93.onrender.com/api/books/";
    try {
        const response = await fetch(all_url);
        if (!response.ok) {
            throw new Error(`HTTP fel: ${response.status}`);
        }
    const books = await response.json();
    console.log(books);
    renderBooks(books);
    } catch (error) {
        console.error("Something gone wrong",error);
    }
}

function renderBooks(books: any[]) {
    const list = document.getElementById("bookList");
    if (!list) return;
  
    list.innerHTML = "";
  
    books.forEach(book => {
      const li = document.createElement("li");
      li.innerHTML = `
      <strong>ID:</strong> ${book._id}<br>
      <strong>Title:</strong> ${book.Title}<br>
      <strong>Author:</strong> ${book.Author}<br>
      <strong>ISBN:</strong> ${book.ISBN}<br>
      <strong>Summary:</strong> ${book.Summary}
    `;
      list.appendChild(li);
    });
}

async function addBook(event: Event) {
    event.preventDefault(); // Stoppar sidans omladdning
    const add_url = "https://u05-restful-api-jossan93.onrender.com/api/books/createBook";

    const newBook = {
        Title: (document.getElementById("addTitle") as HTMLInputElement)?.value || "",
        Author: (document.getElementById("addAuthor") as HTMLInputElement)?.value || "",
        ISBN: (document.getElementById("addISBN") as HTMLInputElement)?.value || "",
        Summary: (document.getElementById("addSummary") as HTMLInputElement)?.value || ""
    };

    try {
        const response = await fetch(add_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBook)
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Book has been added:", data);
            //alert("Book has been added!");
            fetchAll();
            document.querySelector("form")?.reset(); // tömmer formuläret
        } else {
            console.error("Something went wrong:", response.statusText);
            alert("Error adding book");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Connection error.");
    }
}
        
async function updatebook(event: Event) {
    console.log("🟡 updatebook körs!");
    event.preventDefault();

    const id = (document.getElementById("updateID") as HTMLInputElement).value;
    const update_url = `https://u05-restful-api-jossan93.onrender.com/api/books/update/${id}`;

    console.log("Uppdaterar bok med URL:", update_url);

    const updatedBook = {
        Title: (document.getElementById("updateTitle") as HTMLInputElement)?.value || "",
        Author: (document.getElementById("updateAuthor") as HTMLInputElement)?.value || "",
        ISBN: (document.getElementById("updateISBN") as HTMLInputElement)?.value || "",
        Summary: (document.getElementById("updateSummary") as HTMLInputElement)?.value || ""
    };

    try {
        const response = await fetch(update_url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedBook)
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Book updated successfully:", data);
            // alert("Book updated!");
            fetchAll(); // ladda om boklistan
            (document.getElementById("updateForm") as HTMLFormElement).reset();
        } else {
            console.error("Update failed:", response.statusText);
            alert("Failed to update book.");
        }
    } catch (error) {
        console.error("Error updating book:", error);
        alert("Error connecting to server.");
    }
}
