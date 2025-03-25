const toggleView = document.querySelector(".toggle");
const books = document.querySelector("#book-list");
const pageCount = document.getElementById("pageCount");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const sortBtn = document.getElementById("sort");

let page = 1;

// Fetching data from the server
const fetchData = async () => {
  const response = await fetch(
    `https://api.freeapi.app/api/v1/public/books?page=${page}&limit=10`
  );
  const data = await response.json();
  return data;
};

// Displaying data on the webpage
const displayData = async () => {
  try {
    const data = await fetchData(); // Wait for data to be fetched
    books.innerHTML = ""; // Clear existing content before injecting new data

    data.data.data.forEach((book) => {
      const bookItem = document.createElement("a");
      if (toggleView.hasAttribute("checked")) {
        bookItem.classList.add(
          "book-item",
          "p-5",
          "w-[300px]",
          "h-[400px]",
          "border",
          "border-gray-300",
          "rounded-lg",
          "shadow-lg",
          "flex",
          "flex-col",
          "justify-center",
          "items-center",
          "rounded-lg",
          "shadow-md", // Similar to box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          "overflow-hidden",
          "m-4", // Equivalent to margin: 16px;
          "transition",
          "duration-200",
          "transform",
          "hover:scale-105", // Slightly increases size on hover
          "hover:shadow-lg",
         "bg-gradient-to-r",
          "from-gray-500",
          "to-gray-300"
        );
      } else {
        bookItem.classList.add(
          "book-item",
          "w-[45%]",
          "p-5",
          "border",
          "border-gray-300",
          "rounded-lg",
          "shadow-lg",
          "flex",
          "justify-center",
          "items-center",
          "bg-white",
          "hover:shadow-xl",
          "transition-shadow",
          "duration-300",
          "bg-gradient-to-r",
          "from-gray-500",
          "to-gray-300"
        );
      }
      bookItem.setAttribute("href", book.volumeInfo.infoLink);

      const thumbnail =
        book.volumeInfo.imageLinks?.thumbnail || "/api/placeholder/150/200";

      bookItem.innerHTML = `
        <img src="${thumbnail}" class="mx-auto" width="150" height="200" alt="${
        book.volumeInfo.title || "Book cover"
      }" class="object-contain rounded-md shadow-md">
        
      <div>

        <div class="mt-3 text-center">
            <h3 id="bookTitle" class="text-lg font-bold text-gray-800">${
              book.volumeInfo.title || "Untitled"
            }</h3>
            
            <p class="text-sm text-gray-900">By: ${
              book.volumeInfo.authors?.join(", ") || "Unknown Author"
            }</p>
            <p class="text-xs text-gray-800">${
              book.volumeInfo.publisher || "Unknown Publisher"
            } |<span id="publishDate"> ${
        book.volumeInfo.publishedDate || "N/A"
      } </span></p>
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
        </div>
  `;

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

toggleView.addEventListener("click", () => {
  const bookCard = document.querySelectorAll(".book-item");
  console.log("jbfvb", bookCard);
  console.log(bookCard);
  // books.classList.toggle("flex-col");

  if (toggleView.hasAttribute("checked")) {
    toggleView.removeAttribute("checked");
  } else {
    toggleView.setAttribute("checked", "checked");
  }
  bookCard.forEach((card) => {
    card.classList.toggle("flex-col");
    card.classList.toggle("w-[45%]");
    card.classList.toggle("w-[300px]");
    card.classList.toggle("h-[400px]",);

    console.log(card);
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
prevBtn.addEventListener("click", async (e) => {
  if (page > 1) {
    page -= 1;
    books.innerHTML = "";
    pageCount.innerText = `Page ${page} of 21`;
    await displayData();
  }
});
nextBtn.addEventListener("click", async (e) => {
  if (page < 21) {
    page += 1;
    books.innerHTML = "";
    pageCount.innerText = `Page ${page} of 21`;
    await displayData();
  }
});

//sorting functionality
sortBtn.addEventListener("change", (e) => {
  const val = e.target.value;
  //sorting by date
  if (val == "date") {
    const bookCard = document.querySelectorAll(".book-item");
    console.log(bookCard[0]);
    const DateArray = Array.from(bookCard);
    DateArray.sort((a, b) => {
      const dateA = new Date(
        a.querySelector("#publishDate").textContent.trim()
      );
      const dateB = new Date(
        b.querySelector("#publishDate").textContent.trim()
      );
      return dateA - dateB;
    });

    books.innerHTML = "";
    DateArray.forEach((card) => {
      books.appendChild(card);
    });
    console.log(DateArray);
  }
  //sorting by ascending alphabetical order
  if (val == "ascending") {
    const bookCard = document.querySelectorAll(".book-item");
    console.log(bookCard[0]);
    const DateArray = Array.from(bookCard);
    DateArray.sort((a, b) => {
      const target1 = a.querySelector("#bookTitle").textContent.trim();
      const target2 = b.querySelector("#bookTitle").textContent.trim();
      return target1.localeCompare(target2);
    });

    books.innerHTML = "";
    DateArray.forEach((card) => {
      books.appendChild(card);
    });
    console.log(DateArray);
  }
  
  //sorting by descending alphabetical order
  if (val == "descending") {
    const bookCard = document.querySelectorAll(".book-item");
    console.log(bookCard[0]);
    const DateArray = Array.from(bookCard);
    DateArray.sort((a, b) => {
      const target1 = a.querySelector("#bookTitle").textContent.trim();
      const target2 = b.querySelector("#bookTitle").textContent.trim();
      return target2.localeCompare(target1);
    });

    books.innerHTML = "";
    DateArray.forEach((card) => {
      books.appendChild(card);
    });
    console.log(DateArray);
  }
});
