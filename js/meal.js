const loadMeals = (mealName) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
        .catch(error => {
            console.log(error)
        })

    const containerItemName = document.getElementById('container-item-name');
    containerItemName.innerText = mealName;
}

const displayMeals = meals => {

    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML = ''
    for (const meal of meals) {
        console.log(meal)
        const divMeal = document.createElement('div');
        divMeal.classList.add('col');
        divMeal.innerHTML = `
        <div class="card card-side bg-base-100 shadow-xl grid grid-cols-2">
            <figure class=""><img src="${meal.strMealThumb}" class=""/></figure>
            <div class="card-body">
            <h2 class="card-title">${meal.strMeal}</h2>
            <p class="text-sm"> This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. </p>
            <div class="card-actions justify-end">
                <label onclick="loadMealDetail(${meal.idMeal})" for="mealDetails" class="btn  bg-yellow-500 border-none">More Details</label>
                
            </div>
            
          </div>
           
            
           
            
        </div>
        `;
        mealContainer.appendChild(divMeal);
    }



}
// search meals
document.getElementById('input-text-search').addEventListener('click', function () {
    const getInputText = document.getElementById('input-text').value;
    document.getElementById('input-text').value = ''
    loadMeals(getInputText);
})





// load meal details
const loadMealDetail = async (idMeal) => {
    // const document.getElementById('mealDetails')
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayMealDetails(data.meals[0]);


    } catch (error) {
        console.log(error);
    }
}

const displayMealDetails = meal => {
    console.log(meal)
    document.getElementById('modal-title').innerText = meal.strMeal;
    const mealDetails = document.getElementById('modal-body');
    mealDetails.innerHTML = `
        <div>
            <div class="md:px-32  flex justify-center">
                <img class="object-fill lg:h-60 lg:w-[50%]" src="${meal.strMealThumb}">
            </div>
            <div class" flex justify-center">
                <h2 class="card-title mt-3 justify-around">Category: ${meal.strCategory}</h2>
                <div class="grid grid-cols-2 mx-40 mt-12">
                <p>Area: ${meal.strArea}</p>
                <p>Measure: ${meal.strMeasure1}</p>
                
                
                
                </div>
               
            </div>
        </div>
       
        
    `;
    //lg:h-80
    //<a href= {'${meal.strYoutube}'}>YouTube Link</a>
}


loadMeals('fish')