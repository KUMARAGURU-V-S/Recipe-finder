// Add Recipe Function
document.getElementById("add-recipe-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const title = document.getElementById("recipe-title").value;
  const description = document.getElementById("recipe-description").value;

  const recipe = { title, description };

  try {
      const response = await fetch("http://localhost:3000/add-recipe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(recipe),
      });

      const data = await response.json();
      alert(data.message); // Show success or error message
      document.getElementById("add-recipe-form").reset(); // Reset the form
  } catch (error) {
      alert("Failed to add recipe. Please try again.");
  }
});

// Search Recipes Function
async function searchRecipes() {
  const query = document.getElementById("search-query").value.trim();

  if (!query) {
      alert("Please enter a search term.");
      return;
  }

  const response = await fetch(`http://localhost:3000/search?query=${query}`);
  const recipes = await response.json();

  const resultsDiv = document.getElementById("results");
  if (recipes.length === 0) {
      resultsDiv.innerHTML = "<p>No recipes found.</p>";
  } else {
      resultsDiv.innerHTML = recipes
          .map(r => `<p><strong>${r.title}:</strong> ${r.description}</p>`)
          .join("");
  }
}
// View All Recipes Function
async function viewAllRecipes() {
  try {
      const response = await fetch("http://localhost:3000/all-recipes");
      const recipes = await response.json();

      const resultsDiv = document.getElementById("all-recipes-results");
      if (recipes.length === 0) {
          resultsDiv.innerHTML = "<p>No recipes found.</p>";
      } else {
          resultsDiv.innerHTML = recipes
              .map(r => `<p><strong>${r.title}:</strong> ${r.description}</p>`)
              .join("");
      }
  } catch (error) {
      console.error("Error fetching all recipes:", error);
      alert("Failed to load recipes. Please try again.");
  }
}
