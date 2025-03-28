const toggleView = document.querySelector(".toggle");
const books = document.querySelector("#book-list");
const pageCount = document.getElementById("pageCount");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const sortBtn = document.getElementById("sort");
const isGridView = toggleView.hasAttribute("checked");
let page = 1;

// Fetching data from the api
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
    const data = await fetchData();
    books.innerHTML = "";
    
    data.data.data.forEach((book) => {
      const bookItem = document.createElement("a");

      // Base styles (common to both views)
      const baseClasses = [
        "book-item",
        "p-4",
        "border",
        "border-gray-200",
        "rounded-lg",
        "shadow-lg",
        "flex",
        "bg-white",
        "transition",
        "duration-300",
        "hover:shadow-xl",
        "hover:border-blue-300"
      ];

      // Grid view styling
      const gridClasses = [
        ...baseClasses,
        "w-[calc(100%-1rem)]",  // Full width for better responsiveness
        "sm:w-[48%]",           // Two items per row on small screens
        "md:w-[32%]",           // Three items per row on medium screens
        "lg:w-[24%]",           // Four items per row on large screens
        "h-auto",
        "min-w-[250px]",        // Prevents shrinking too much
        "max-w-[400px]",        // Prevents oversized items
        "flex-col",
        "justify-between",
        "items-center",
        "mb-4",
        "transform",
        "hover:scale-105"
      ];

      // List view styling
      const listClasses = [
        ...baseClasses,
        "w-full",
        "flex-row",
        "space-x-4",
        "items-start",
        "p-3",
        "sm:p-4",
        "sm:gap-6",
        "hover:scale-100" // Prevents unintended scaling in list view
      ];

      // Apply class based on view mode
      bookItem.classList.add(...(toggleView.hasAttribute("checked") ? gridClasses : listClasses));

      // Set book link
      bookItem.setAttribute("href", book.volumeInfo.infoLink);

      // Get book thumbnail
      const thumbnail = book.volumeInfo.imageLinks?.thumbnail || "/api/placeholder/150/200";

      // Function to render book details
      const renderBookDetails = () => {
        const isGrid = toggleView.hasAttribute("checked");
        return `
          <img 
            src="${thumbnail}" 
            class="${isGrid 
              ? 'w-[120px] sm:w-[150px] h-[180px] sm:h-[200px] mb-4 object-cover' 
              : 'w-[80px] sm:w-[100px] h-[120px] sm:h-[150px] mr-4 object-cover'
            } rounded-md shadow-md"
            alt="${book.volumeInfo.title || "Book cover"}"
          >

          <div class="flex-grow ${isGrid ? 'text-center' : 'text-left'}">
            <h3 
              id="bookTitle" 
              class="text-lg sm:text-xl font-bold text-gray-800 ${isGrid ? 'mb-1' : 'mb-2'}"
            >
              ${book.volumeInfo.title || "Untitled"}
            </h3>

            <p class="text-sm text-gray-600 ${isGrid ? 'mb-1' : 'mb-2'}">
              By: ${book.volumeInfo.authors?.join(", ") || "Unknown Author"}
            </p>

            <p class="text-xs text-gray-500">
              ${book.volumeInfo.publisher || "Unknown Publisher"} | 
              <span id="publishDate">${book.volumeInfo.publishedDate || "N/A"}</span>
            </p>

            <div class="mt-3 flex flex-wrap ${isGrid ? 'justify-center' : 'justify-start'} text-xs text-gray-600 gap-2">
              ${book.volumeInfo.pageCount ? 
                `<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
                  ${book.volumeInfo.pageCount} Pages
                </span>` : ""}
              ${book.volumeInfo.industryIdentifiers?.[0]?.identifier ? 
                `<span class="bg-green-100 text-green-800 px-2 py-1 rounded-md">
                  ISBN: ${book.volumeInfo.industryIdentifiers[0].identifier}
                </span>` : ""}
              ${book.volumeInfo.averageRating ? 
                `<span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md">
                  Rating: ⭐ ${book.volumeInfo.averageRating} 
                  (${book.volumeInfo.ratingsCount || 0})
                </span>` : ""}
              ${book.volumeInfo.language ? 
                `<span class="bg-gray-200 px-2 py-1 rounded-md">
                  ${book.volumeInfo.language.toUpperCase()}
                </span>` : ""}
            </div>
          </div>
        `;
      };

      // Insert book details
      bookItem.innerHTML = renderBookDetails();

      // Append book item to container
      books.appendChild(bookItem);
    });

    console.log("Books data loaded successfully!");
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};


// Call displayData when page loads
displayData();
// console.log("data");
// console.log(books);

//toggle between grid and list view
toggleView.addEventListener("click", () => {
  const bookCards = document.querySelectorAll(".book-item");
  
  if (toggleView.hasAttribute("checked")) {
    toggleView.removeAttribute("checked");
  } else {
    toggleView.setAttribute("checked", "checked");
  }

  bookCards.forEach((card) => {
    // Grid view classes
    const gridClasses = [
      "flex-col",
      "w-[calc(100%-1rem)]",
      "sm:w-[48%]",
      "md:w-[32%]",
      "lg:w-[24%]",
      "items-center",
      "text-center",
      "min-w-[250px]",
      "max-w-[400px]",
      "transform",
      "hover:scale-105"
    ];

    // List view classes
    const listClasses = [
      "flex-row",
      "w-full",
      "items-start",
      "text-left",
      "space-x-4",
      "hover:scale-100"
    ];

    // Toggle image classes
    const gridImageClasses = [
      "w-[120px]", 
      "sm:w-[150px]", 
      "h-[180px]", 
      "sm:h-[200px]", 
      "mb-4"
    ];
    const listImageClasses = [
      "w-[80px]", 
      "sm:w-[100px]", 
      "h-[120px]", 
      "sm:h-[150px]", 
      "mr-4"
    ];

    // Toggle details container classes
    const gridDetailsClasses = [
      "text-center", 
      "items-center"
    ];
    const listDetailsClasses = [
      "text-left", 
      "items-start"
    ];

    // Get image and details elements
    const cardImage = card.querySelector('img');
    const detailsContainer = card.querySelector('div[class*="flex-grow"]');

    // Determine if it's grid or list view
    const isGridView = toggleView.hasAttribute("checked");

    // Remove existing view-specific classes
    card.classList.remove(...gridClasses, ...listClasses);
    cardImage.classList.remove(...gridImageClasses, ...listImageClasses);
    detailsContainer.classList.remove(...gridDetailsClasses, ...listDetailsClasses);

    // Add  classes based on view
    if (isGridView) {
      card.classList.add(...gridClasses);
      cardImage.classList.add(...gridImageClasses);
      detailsContainer.classList.add(...gridDetailsClasses);
    } else {
      card.classList.add(...listClasses);
      cardImage.classList.add(...listImageClasses);
      detailsContainer.classList.add(...listDetailsClasses);
    }
  });

  // Update toggle button icon
  toggleView.innerHTML = isGridView
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
    // console.log(bookCard[0]);
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
    // console.log(DateArray);
  }
  //sorting by ascending alphabetical order
  if (val == "ascending") {
    const bookCard = document.querySelectorAll(".book-item");
    // console.log(bookCard[0]);
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
    // console.log(DateArray);
  }

  //sorting by descending alphabetical order
  if (val == "descending") {
    const bookCard = document.querySelectorAll(".book-item");
    // console.log(bookCard[0]);
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
    // console.log(DateArray);
  }
});
