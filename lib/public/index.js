const charForm = document.getElementById('options');
charForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const charName = document.getElementById('charname').value;
  if (!charName) {
    alert('Character name is missing.');
  } else {
    const charAge = document.getElementById('agegroup').value;
    const charSpecies = document.getElementById('species').value;
    const charBackground = document.getElementById('background').value;
    const charRegion = document.getElementById('region').value;
    window.location.href = '/characters/create/' + charAge + '/' + charSpecies + '/' + charBackground + '/' + charName + '/' + charRegion;
  }
});
