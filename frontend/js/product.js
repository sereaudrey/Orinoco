const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
let request= new XMLHttpRequest();
//localStorage.clear();
request.onreadystatechange= function(){
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let product = JSON.parse(this.response);
        const productContainer = document.getElementById('product');
        productContainer.innerHTML += `
            <div class="col-12">
                <div class="card mb-4">
                    <img class="card-img-top" src="${product.imageUrl}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="text-right">${product.price/100} €</p>
                        <select name="lenses">
                            ${getOptions(product.lenses)}
                        </select>

                        <label for="q">Quantité: </label>
                        <select id="qt" name="q">
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                        <button type="button" class="btn-primary" id="buttonBasket" 
                        class="add-to-cart" data-id="${productId}" data-name="Lentilles" data-price="${product.price/100} €" data-url="/product/">Ajouter au panier</button>                                    
                    </div>
                </div>
            </div>
        `;
        // Ajout de l'évènement sur btn
        document.getElementById("buttonBasket").addEventListener('click', (event) => {
            event.preventDefault;
            
            //Panier du client
            let basket = JSON.parse(localStorage.getItem('basket')) === null ? [] : JSON.parse(localStorage.getItem('basket'));
            
            //Ajout d'un article dans le panier
            let camerasPanier = {
                nom: product.name,
                prix: product.price,
                id: productId,
            }

            basket.push(camerasPanier);
            localStorage.setItem('basket', JSON.stringify(basket));
        });
    }
};

request.open('GET', `http://localhost:3000/api/cameras/${productId}`);
request.send();

function getOptions(lenses) {
    let options = '';
    lenses.forEach(lense => {
        options += `<option name="${lense}">${lense}</option>`;
    });
    return options;
}

let basketCount = document.getElementById('basketCount');
basketCount.innerHTML = JSON.parse(localStorage.getItem('basket')).length;
