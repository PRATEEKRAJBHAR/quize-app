document.getElementById("update-btn").style.display = "none";

function addcategory() {
    let categoryInput = document.getElementById("category");
    let category = categoryInput.value.trim(); // Trim whitespace

    if (category === "") {
        alert("Category is mandatory");
        return;
    }

    let newcategories = JSON.parse(localStorage.getItem("category")) || [];

    // Check for duplicate category (case-insensitive)
    let uniqueCategory = newcategories.some(quiz => quiz.category.trim().toLowerCase() === category.toLowerCase());

    if (uniqueCategory) {
        alert("This Name Category already exists!");
        return;
    }

    newcategories.push({ category: category });

    localStorage.setItem("category", JSON.stringify(newcategories));


    categoryInput.value = "";
    displaycategory();
}

function displaycategory() {
    let newcategories = JSON.parse(localStorage.getItem("category")) || [];

    let reversedQuiz = [...newcategories].reverse(); 
    let categoryContainer = document.querySelector(".categoryContainer");

    if (!categoryContainer) {
        console.error("Category container not found!");
        return;
    }

    categoryContainer.innerHTML = "";

    reversedQuiz.forEach((c, index) => {
        // console.log(c.category, "c");

        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${newcategories.length-index})</td>
            <td>${c.category}</td>
            <td>
                <button class="edit-btn" onclick="editCategory(${newcategories.length-1-index})">Edit</button>
                <button class="delete-btn" onclick="deleteCategory(${newcategories.length-1-index})">Delete</button>
            </td>
        `;
        categoryContainer.appendChild(row);
       
    });
}


// delete category
function deleteCategory(index){
    let newcategories = JSON.parse(localStorage.getItem("category")) || [];
    // console.log(newcategories,"katrina kaif");
newcategories.splice(index,1)
localStorage.setItem("category", JSON.stringify(newcategories));
displaycategory();

}




// edit category
// Edit category function
function editCategory(index) {
    document.getElementById("add-btn").style.display = "none";
    document.getElementById("update-btn").style.display = "block";

    let newcategories = JSON.parse(localStorage.getItem("category")) || [];
    let categoryInput = document.getElementById("category");

    
    categoryInput.value = newcategories[index].category;

   
    let updateBtn = document.getElementById("update-btn");

    // Remove previous event listeners to avoid duplication
    let newUpdateBtn = updateBtn.cloneNode(true);
    updateBtn.replaceWith(newUpdateBtn);
    updateBtn = newUpdateBtn;


    updateBtn.addEventListener("click", () => {
        // alert("ram ram ji");

  
        document.getElementById("add-btn").style.display = "block";
        document.getElementById("update-btn").style.display = "none";


        let updatecategory = categoryInput.value;
        newcategories[index].category = updatecategory;
        localStorage.setItem("category", JSON.stringify(newcategories));

        categoryInput.value = "";
        displaycategory();
    });
}


// function loadCategories() {
//     let categories = JSON.parse(localStorage.getItem("category")) || [];
//     console.log(categories, "categories");
//     let categoryDropdown = document.getElementById("categoryDropdown");

//     categories.forEach(c => {
//         let option = document.createElement("option");
//         option.value = c.category;
//         option.textContent = c.category;
//         categoryDropdown.appendChild(option);
//     });
// }

// document.addEventListener("DOMContentLoaded", loadCategories);
// // Call displaycategory when the page loads
document.addEventListener("DOMContentLoaded", displaycategory);
