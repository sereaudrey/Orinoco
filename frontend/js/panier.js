
let request = new XMLHttpRequest();
request.onreadystatechange= function(){
    if (this.readyState === XMLHttpRequest.DONE && this.status === 201) {
        let response = JSON.stringify(this.response);
        console.log(response);
        // response.contact / response.products / response.order_id
    }
};

let basket = JSON.parse(localStorage.getItem('basket')) === null ? [] : JSON.parse(localStorage.getItem('basket'));

basket.forEach(product => {
    document.getElementById("cart-tablebody").innerHTML += `
        <tr>
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${product.lense}</td>
            <td>${(product.price/100)*product.quantity}€</td>
        </tr>
    `
});
// Ajout de l'évènement sur btn
document.getElementById("buttonCommand").addEventListener('click', (event) => {
    event.preventDefault;
    const body = {
        contact: {
            firstName: document.getElementById("prenom").value,
            lastName: document.getElementById("nom").value,
            address: document.getElementById("adresse").value,
            city: document.getElementById("ville").value,
            email: document.getElementById("mail").value,
        },
        products: [
            basket.forEach(productId => {
                localStorage.getItem('basket');
            }
        ]
    };
    request.open("POST", `http://localhost:3000/api/cameras/order`, true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(body));
});

let basketCount = document.getElementById('basketCount');
basketCount.innerHTML = JSON.parse(localStorage.getItem('basket')).length;

