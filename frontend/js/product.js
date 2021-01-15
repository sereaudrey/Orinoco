const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
let request= new XMLHttpRequest();
//localStorage.clear();
request.onreadystatechange= function(){
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let product = JSON.parse(this.response);
        console.log(product);
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
            let lense = document.getElementById('lenses').value;
            let isAlreadyExist = false;
            let positionInArray = null;
            basket.forEach((camera, index) => {
                if (camera.id === productId && camera.lense === lense) {
                    isAlreadyExist = true;
                    positionInArray = index;
                }
            });

            if (isAlreadyExist && positionInArray !== null) {
                let cameraToUpdate = basket[positionInArray];
                cameraToUpdate.quantity = cameraToUpdate.quantity + 1;

                basket[positionInArray] = cameraToUpdate;
            } else {
                let cameraToAdd = {
                    id: productId,
                    name: product.name,
                    price: product.price,
                    lense: lense,
                    quantity: 1,
                };

                basket.push(cameraToAdd);
            }

            localStorage.setItem('basket', JSON.stringify(basket));

            console.log(localStorage.getItem('basket'));
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
