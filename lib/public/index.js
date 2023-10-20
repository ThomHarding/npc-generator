import Character from '../models/Character';
console.log('index js firing');
const charForm = document.getElementById('options');
charForm.addEventListener('submit', async (e) => {
  console.log('form event listener firing');
  e.preventDefault();
  const charName = document.getElementById('charname').value;
  const charAge = document.getElementById('agegroup').value;
  const charSpecies = document.getElementById('species').value;
  const charBackground = document.getElementById('background').value;
  const charRegion = document.getElementById('region').value;
  console.log('wait does this not ', charName, charSpecies, charAge, charBackground, charRegion);
  window.location.href = '/characters/create/' + charAge + '/' + charSpecies + '/' + charBackground + '/' + charName + '/' + charRegion;
  await Character.insertForm(charAge, charSpecies, charBackground, charName, charRegion);
});
