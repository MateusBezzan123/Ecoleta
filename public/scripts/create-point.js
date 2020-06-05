function populateUfs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => {
      return res.json();
    })
    .then((states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}
populateUfs();

function getCities() {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");
  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState];

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
  innerHTML = "<option value>Selecione uma Cidade</option>";
  citySelect.disabled = true;
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
      }
      citySelect.disabled = false;
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

const itemsToCollect = document.querySelectorAll(".itens-grid li");

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectItem);
}

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectItem(event) {
  const itemLi = event.target;
  itemLi.classList.toggle("selected");
  const itemId = itemLi.dataset.id;

  const alreadySelected = selectedItems.findIndex(function (item) {
    const itemFound = item == itemId;
    return itemFound;
  });

  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter(function (item) {
      const itemDifferent = item != itemId;
      return itemDifferent;
    });
    selectedItems = filteredItems;
  } else {
    selectedItems.push(itemId);
  }
  collectedItems.value = selectedItems;
}
