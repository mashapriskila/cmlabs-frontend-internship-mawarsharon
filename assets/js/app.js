// Fetch categories using jQuery and Axios
function fetchCategories() {
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(response => {
            console.log(response); // Check if data is being received
            const categories = response.data.categories;
            let categoryList = '';

            categories.forEach(category => {
                categoryList += `
                    <a href="category.html?category=${category.strCategory}" class="block rounded-lg shadow-lg overflow-hidden">
                        <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="w-full h-32 object-cover">
                        <div class="p-4">
                            <h2 class="font-bold text-lg">${category.strCategory}</h2>
                        </div>
                    </a>
                `;
            });

            $('#category-list').html(categoryList); // Using jQuery to set HTML
        })
        .catch(error => {
            console.error('Error fetching categories:', error); // Log any errors
        });
}

// Fetch meals by category using jQuery and Axios
function fetchCategoryMeals(category) {
    console.log('Fetching meals for category:', category); // Log the category
    $('#category-title').text(`Meals in ${category}`);
    $('#category-name').text(category);

    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(response => {
            console.log(response); // Check if data is being received
            const meals = response.data.meals;
            let mealList = '';

            meals.forEach(meal => {
                mealList += `
                    <a href="meal-detail.html?meal-id=${meal.idMeal}" class="block rounded-lg shadow-lg overflow-hidden">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-32 object-cover">
                        <div class="p-4">
                            <h2 class="font-bold text-lg">${meal.strMeal}</h2>
                        </div>
                    </a>
                `;
            });

            $('#meal-list').html(mealList); // Using jQuery to set HTML
        })
        .catch(error => {
            console.error('Error fetching meals:', error); // Log any errors
        });
}

// Fetch meal details using jQuery and Axios
function fetchMealDetail(mealId) {
    console.log('Fetching details for meal ID:', mealId); // Log the meal ID

    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => {
            console.log(response); // Check if data is being received
            const meal = response.data.meals[0];
            $('#meal-name').text(meal.strMeal);
            $('#meal-title').text(meal.strMeal); // Menampilkan nama makanan
            $('#meal-img').attr('src', meal.strMealThumb);
            $('#meal-instructions').text(meal.strInstructions);

            // Ingredients
            let ingredients = '';
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];
                if (ingredient && measure) {
                    ingredients += `<li>${measure} ${ingredient}</li>`;
                }
            }
            $('#meal-ingredients').html(ingredients); // Using jQuery to set HTML

            // Add YouTube video if available
            if (meal.strYoutube) {
                const videoId = meal.strYoutube.split('v=')[1];
                $('#meal-video').html(`
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" 
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen></iframe>
                `); // Using jQuery to set HTML
            }
        })
        .catch(error => {
            console.error('Error fetching meal details:', error); // Log any errors
        });
}
