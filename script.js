function filtrerProduits(categorie) {
  const produits = document.querySelectorAll(".produit");
  produits.forEach(p => {
    if (categorie === "all" || p.classList.contains(categorie)) {
      p.style.display = "block";
    } else {
      p.style.display = "none";
    }
  });
}

function validerCommande() {
  window.location.href = "success.html";
}
