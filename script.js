const books = document.querySelector("#book-list");
let page=1;
// Fetching data from the server
const fetchData = async () => {
  const response = await fetch(`https://api.freeapi.app/api/v1/public/books?page=${page}&limit=10`);
  const data = await response.json();
  return data; 
};

// Displaying data on the webpage
const displayData = async () => {
  try {
    const data = await fetchData(); // Wait for data to be fetched
    books.innerHTML = ""; // Clear existing content before injecting new data

    data.data.data.forEach((book) => {
      const bookItem = document.createElement("div");
      bookItem.classList.add(
        "book-item",
        "p-5",
        "border",
        "border-gray-300",
        "rounded-lg",
        "shadow-lg",
        "flex",
        "flex-col",
        "justify-center",
        "content-center",
        "bg-white",
        "hover:shadow-xl",
        "transition-shadow",
        "duration-300",
        "bg-gradient-to-r",
        "from-gray-500",
        "to-gray-300"
      );

      const thumbnail =
        book.volumeInfo.imageLinks?.thumbnail || "/api/placeholder/150/200";

      bookItem.innerHTML = `
      <a href="${book.volumeInfo.infoLink}">
        <img src="${thumbnail}" width="150" height="200" alt="${
        book.volumeInfo.title || "Book cover"
      }" class="object-contain rounded-md shadow-md">
        
        <div class="mt-3 text-center">
            <h3 class="text-lg font-bold text-gray-800">${
              book.volumeInfo.title || "Untitled"
            }</h3>
            
            <p class="text-sm text-gray-900">By: ${
              book.volumeInfo.authors?.join(", ") || "Unknown Author"
            }</p>
            <p class="text-xs text-gray-800">${
              book.volumeInfo.publisher || "Unknown Publisher"
            } | ${book.volumeInfo.publishedDate || "N/A"}</p>
        </div>
        
        <div class="mt-3 flex flex-wrap justify-center text-xs text-gray-600 gap-2">
            ${
              book.volumeInfo.pageCount
                ? `<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-md">${book.volumeInfo.pageCount} Pages</span>`
                : ""
            }
            ${
              book.volumeInfo.industryIdentifiers?.[0]?.identifier
                ? `<span class="bg-green-100 text-green-800 px-2 py-1 rounded-md">ISBN: ${book.volumeInfo.industryIdentifiers[0].identifier}</span>`
                : ""
            }
            ${
              book.volumeInfo.averageRating
                ? `<span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md">Rating: ⭐ ${
                    book.volumeInfo.averageRating
                  } (${book.volumeInfo.ratingsCount || 0})</span>`
                : ""
            }
            ${
              book.volumeInfo.language
                ? `<span class="bg-gray-200 px-2 py-1 rounded-md">${book.volumeInfo.language.toUpperCase()}</span>`
                : ""
            }
        </div>
      </a>`;

      books.appendChild(bookItem);
    });

    console.log("Books data loaded successfully!");
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

// Call displayData when page loads
displayData();
console.log("data");
console.log(books);

//toggle between grid and list view
const toggleView = document.querySelector(".toggle");

toggleView.addEventListener("click", () => {
  const bookCard = document.querySelectorAll(".book-item");
  console.log("jbfvb", bookCard);
  console.log(bookCard);

  books.classList.toggle("flex-col");
  bookCard.forEach((card) => {
    console.log(card.classList); 
    card.classList.toggle("flex-col");
    
  });


  toggleView.innerHTML = books.classList.contains("grid")
    ? `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
</svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
</svg>`;
});

//search functionality

const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", (e) => {
  const bookCard = document.querySelectorAll(".book-item");
  const searchValue = e.target.value;
  // console.log(searchValue);
  bookCard.forEach((card) => {
    // console.log(card);
    const title = card.querySelector("h3").innerText.toLowerCase();
    const author = card.querySelector("p").innerText.toLowerCase();

    // console.log(title,author);
    if (
      title.includes(searchValue.toLowerCase()) ||
      author.includes(searchValue.toLowerCase())
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});



//pagination functionality
const pageCount = document.getElementById("pageCount");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

prevBtn.addEventListener("click", async(e) => {
  if (page > 1) {

    page -=1;
    books.innerHTML="";
    pageCount.innerText = `Page ${page} of 21`;
    await displayData();
  }
});
nextBtn.addEventListener("click", async(e) => {
  if (page < 21) {
    page += 1;
    books.innerHTML="";
    pageCount.innerText = `Page ${page} of 21`;
    await displayData();
  }
})