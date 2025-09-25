console.log("PAC Pâtisserie – Site vitrine actif !");

let panier = JSON.parse(localStorage.getItem("panier")) || [];

// Charger catalogue depuis produits.json
if (document.getElementById("catalogue")) {
  fetch("data/produits.json")
    .then(res => res.json())
    .then(produits => {
      let html = "";
      produits.forEach(p => {
        html += `
          <div class="card">
            <img src="${p.image}" alt="${p.nom}">
            <h3>${p.nom}</h3>
            <p>${p.prix.toFixed(2)} €</p>
            <button class="btn" onclick="ajouterAuPanier(${p.id}, '${p.nom}', ${p.prix})">Ajouter</button>
          </div>
        `;
      });
      document.getElementById("catalogue").innerHTML = html;
    });
}

// Ajouter au panier
function ajouterAuPanier(id, nom, prix) {
  panier.push({ id, nom, prix });
  localStorage.setItem("panier", JSON.stringify(panier));
  alert(nom + " ajouté au panier !");
}

// Afficher panier
if (document.getElementById("panier")) {
  afficherPanier();
}

function afficherPanier() {
  let div = document.getElementById("panier");
  let total = 0;
  let html = "<ul>";
  panier.forEach((item, index) => {
    total += item.prix;
    html += `<li>${item.nom} – ${item.prix.toFixed(2)} € <button onclick="supprimer(${index})">X</button></li>`;
  });
  html += "</ul>";
  div.innerHTML = html;
  document.getElementById("total").innerText = total.toFixed(2) + " €";
}

function supprimer(index) {
  panier.splice(index, 1);
  localStorage.setItem("panier", JSON.stringify(panier));
  afficherPanier();
}

// Paiement Stripe (clé test à remplacer par ta clé)
if (document.getElementById("payer")) {
  document.getElementById("payer").addEventListener("click", () => {
    let stripe = Stripe("pk_test_1234567890"); // 🔑 Remplace avec ta clé publique Stripe

    stripe.redirectToCheckout({
      lineItems: panier.map(p => ({
        price_data: {
          currency: "eur",
          product_data: { name: p.nom },
          unit_amount: Math.round(p.prix * 100)
        },
        quantity: 1
      })),
      mode: "payment",
      successUrl: window.location.origin + "/success.html",
      cancelUrl: window.location.origin + "/panier.html"
    });
  });
}
