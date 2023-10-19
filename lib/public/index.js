const charForm = document.getElementById('options');
charForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const charName = document.getElementById('charname').value;
  //const charSpecies = document.getElementById('race').value;
  // i'd have to regex every valid species and that would not be pleasant
  const charAge = document.getElementById('agegroup').value;
  const charBackground = document.getElementById('background').value;
  const charRegion = document.getElementById('region').value;
  console.log(charName, charAge, charBackground, charRegion);
  // handle submit
});
