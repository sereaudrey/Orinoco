// Requête pour récupérer l'API
axios.get("http://localhost:3000/api/cameras")
    .then(function (response) {
        console.log(response);
        const productContainer = document.getElementById('product-list');
        response.data.forEach(product => {
            productContainer.innerHTML += `
                <div class="col-4">
                    <div class="card mb-4">
                        <img class="card-img-top" src="${product.imageUrl}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="text-right">${product.price/100} €</p>
                            <a href="product.html?id=${product._id}" class="btn btn-primary">En savoir plus</a>
                        </div>
                    </div>
                </div>
            `;
        });
    })
    .catch(function (error) {
        console.error(error);
    })