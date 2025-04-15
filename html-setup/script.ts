window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("booklist")?.addEventListener("click", fetchAll);
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
        console.error("Det har blivit error",error);
    }
}

function renderBooks(books: any[]) {
    const list = document.getElementById("bookList");
    if (!list) return;
  
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