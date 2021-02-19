// Construction de l'URL avec les paramètres 
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');
const total = urlParams.get('total');
const firstname = urlParams.get('firstname');

let containerMessage = document.getElementById('confirmationMessage');
containerMessage.innerHTML += `${firstname} nous vous remercions d'avoir commandé chez Orinoco ! Votre commande d'un montant de ${total}€ va bientôt vous être expédié.Voici votre numéro de commande : ${orderId}`;