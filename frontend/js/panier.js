// Envoyer la requête








let request = new XMLHttpRequest();
request.onreadystatechange= function(){
    if (this.readyState === XMLHttpRequest.DONE && this.status === 201) {
        let response = JSON.stringify(this.response);
        console.log(response);
        // response.contact / response.products / response.order_id
    }
};

let basket = JSON.parse(localStorage.getItem('basket')) === null ? [] : JSON.parse(localStorage.getItem('basket'));
console.table(basket);
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
    const ids = [];
    basket.forEach(product => {
        ids.push(product.id);
    })
    const body = {
        contact: {
            firstName: document.getElementById("prenom").value,
            lastName: document.getElementById("nom").value,
            address: document.getElementById("adresse").value,
            city: document.getElementById("ville").value,
            email: document.getElementById("mail").value,
        },
        products: ids
    };
    console.log(body);
    axios.post("http://localhost:3000/api/cameras/order", JSON.stringify(body))
    
    //request.send(JSON.stringify(body));
});


