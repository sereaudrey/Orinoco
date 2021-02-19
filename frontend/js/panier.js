// Afficher les produits dans le panier
let basket = JSON.parse(localStorage.getItem('basket')) === null ? [] : JSON.parse(localStorage.getItem('basket'));
let total = 0;
basket.forEach(product => {
    total += (product.price/100) * product.quantity;
    document.getElementById("cart-tablebody").innerHTML += `
        <tr>
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${product.lense}</td>
            <td>${(product.price/100) * product.quantity}€</td>
        </tr>
    `
});
document.getElementById('total').innerHTML += total;

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

    // Envoyer la requête
    axios.post('http://localhost:3000/api/cameras/order', body)
        .then(function (response) {
            window.location.replace(`confirmation.html?orderId=${response.data.orderId}&total=${total}&firstname=${response.data.contact.firstName}`);
        });
    ;
});