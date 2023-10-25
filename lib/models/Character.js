const pool = require('../utils/pool');
// const { getWashName, getKrawName, getHofangName, getSarcenName, getVessaliName } = require('../utils/charfetches.js');

class Character {
  person_id;
  name;
  species;
  age_group;
  background;
  region_id;
  alignment_law_chaos;
  alignment_good_evil;
  technophobia;
  cult_member;

  constructor(row) {
    this.person_id = row.person_id;
    this.name = row.name;
    this.species = row.species;
    this.region = row.region;
    this.background = row.background;
    if (row.alignment_law_chaos <= 35) {
      this.alignment_law_chaos = 'lawful';
    } else if (36 <= row.alignment_law_chaos && row.alignment_law_chaos <= 65) {
      this.alignment_law_chaos = 'neutral';
    } else if (row.alignment_law_chaos > 65) {
      this.alignment_law_chaos = 'chaotic';
    }
    if (row.alignment_good_evil <= 35) {
      this.alignment_good_evil = 'good';
    } else if (36 <= row.alignment_good_evil && row.alignment_good_evil <= 65) {
      this.alignment_good_evil = 'neutral';
    } else if (row.alignment_good_evil > 65) {
      this.alignment_good_evil = 'evil';
    }
    switch (row.age_group) {
      case 1:
        this.age_group = 'Child';
        break;
      case 2:
        this.age_group = 'Teenager';
        break;
      case 3:
        this.age_group = 'Adult';
        break;
      case 4:
        this.age_group = 'Elderly';
        break;
      default:
        this.age_group = 'Indescribable';
    }
    this.technophobia = row.technophobia + ' (out of 100)';
    this.cult_member = 'is ';
    (row.cult_member ? this.cult_member += 'is a cult member' : this.cult_member += 'not a cult member');
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT s.name AS species, b.name AS background, p.name, p.age_group, r.name AS region, p.alignment_good_evil, p.alignment_law_chaos, p.technophobia, p.cult_member  FROM person p JOIN species s ON p.species = s.species_id INNER JOIN background b ON b.background_id = p.background INNER JOIN region r ON r.region_id = p.region_id');
    return rows.map((row) => new Character(row));
  }

  static async getSpecies(species_id) {
    const { rows } = await pool.query('SELECT name FROM species WHERE species_id = $1', [species_id]);
    return rows[0].name;
  }

  static async fetchRegionInfo(regionId) {
    const { rows } = await pool.query('SELECT * FROM region WHERE region_id = $1;', [regionId]);
    return rows;
    //TODO: man this should be its own model
  }

  static async insert(region_id) {
    //unless body has region id?
    const regionInfo = await Character.fetchRegionInfo(region_id);
    //region info just be what you get from selecting id = regionid on region
    const charName = await generateName(regionInfo[0]);
    const speciesId = generateSpecies(regionInfo[0]);
    const species = await this.getSpecies(speciesId);
    const age_group = generateAge();
    const background = await generateBackground(regionInfo[0]);
    const alignment_good_evil = generateGoodEvil(regionInfo[0]);
    const alignment_law_chaos = generateLawChaos(regionInfo[0]);
    const technophobia = generateTechnophobe(regionInfo[0]);
    const cult_member = generateCultMember();
    console.log(charName, species, age_group, background, region_id, alignment_good_evil, alignment_law_chaos, technophobia, cult_member);
    const { rows } = await pool.query(
      `INSERT INTO person (
        name,
        species,
        age_group,
        background,
        region_id,
        alignment_good_evil,
        alignment_law_chaos,
        technophobia,
        cult_member
      )
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
    `,
      [charName, speciesId, age_group, background, region_id, alignment_good_evil, alignment_law_chaos, technophobia, cult_member]
    );
    rows[0].species = species;
    rows[0].background = await getBackgroundName(rows[0].background);
    rows[0].region = await getRegionName(rows[0].region_id);
    delete rows[0].region_id;
    console.log('avast.', rows[0]);
    return new Character(rows[0]);
  }

  static async insertForm(age_group, speciesId, background, charName, region_id) {
    console.log('whar?', age_group + ' age', speciesId + ' species', background + ' bkgrnd', charName + ' name', region_id + ' region');
    //unless body has region id?
    const regionInfo = await Character.fetchRegionInfo(region_id);
    console.log('region tests ', regionInfo);
    //region info just be what you get from selecting id = regionid on region
    const alignment_good_evil = generateGoodEvil(regionInfo[0]);
    const alignment_law_chaos = generateLawChaos(regionInfo[0]);
    const technophobia = generateTechnophobe(regionInfo[0]);
    const cult_member = generateCultMember();
    console.log(charName, speciesId, age_group, background, region_id, alignment_good_evil, alignment_law_chaos, technophobia, cult_member);
    const { rows } = await pool.query(
      `INSERT INTO person (
      name,
      species,
      age_group,
      background,
      region_id,
      alignment_good_evil,
      alignment_law_chaos,
      technophobia,
      cult_member
    )
    VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
  `,
      [charName, speciesId, age_group, background, region_id, alignment_good_evil, alignment_law_chaos, technophobia, cult_member]
    );
    rows[0].background = await getBackgroundName(rows[0].background);
    rows[0].region = await getRegionName(rows[0].region_id);
    delete rows[0].region_id;
    console.log('avast.', rows[0]);
    return new Character(rows[0]);
  }
}

async function getWashName() {
  //should probably be in its own utility file
  const rngFirst = Math.round(Math.random() * 10);
  const rngLast = Math.round(Math.random() * 10);
  const { rows } = await pool.query(
    `SELECT wash_first FROM regionnames
       WHERE name_id = $1;
      `,
    [rngFirst]
  );
  const firstName = Object.values(rows[0])[0];
  const rows2 = await pool.query(
    `SELECT wash_last FROM regionnames
       WHERE name_id = $1;
      `,
    [rngLast]
  );
  const lastName = rows2.rows[0].wash_last;
  return firstName + ' ' + lastName;
}
  
async function getKrawName() {
  const rngFirst = Math.round(Math.random() * 10);
  const { rows } = await pool.query(
    `SELECT kraw_first FROM regionnames
       WHERE name_id = $1;
      `,
    [rngFirst]
  );
  const firstName = Object.values(rows[0])[0];
  //kraw doesn't do last names
  return firstName;
}
async function getHofangName() {
  const rngFirst = Math.round(Math.random() * 10);
  const rngLast = Math.round(Math.random() * 10);
  const { rows } = await pool.query(
    `SELECT hofang_first FROM regionnames
       WHERE name_id = $1;
      `,
    [rngFirst]
  );
  const firstName = Object.values(rows[0])[0];
  const rows2 = await pool.query(
    `SELECT hofang_last FROM regionnames
       WHERE name_id = $1;
      `,
    [rngLast]
  );
  const lastName = rows2.rows[0].hofang_last;
  return firstName + ' ' + lastName;
}

async function getSarcenName() {
  const rngFirst = Math.round(Math.random() * 10);
  const rngLast = Math.round(Math.random() * 10);
  const { rows } = await pool.query(
    `SELECT sarcen_first FROM regionnames
       WHERE name_id = $1;
      `,
    [rngFirst]
  );
  const firstName = Object.values(rows[0])[0];
  const rows2 = await pool.query(
    `SELECT sarcen_last FROM regionnames
       WHERE name_id = $1;
      `,
    [rngLast]
  );
  const lastName = rows2.rows[0].sarcen_last;
  return firstName + ' ' + lastName;
}
  
async function getVessaliName() {
  const rngFirst = Math.round(Math.random() * 10);
  const rngLast = Math.round(Math.random() * 10);
  const { rows } = await pool.query(
    `SELECT vessali_first FROM regionnames
       WHERE name_id = $1;
      `,
    [rngFirst]
  );
  const firstName = Object.values(rows[0])[0];
  const rows2 = await pool.query(
    `SELECT vessali_last FROM regionnames
       WHERE name_id = $1;
      `,
    [rngLast]
  );
  const lastName = rows2.rows[0].vessali_last;
  return firstName + ' ' + lastName;
}

async function generateName(regionInfo) {
  // const washRng = Math.round(Math.random() * 3);
  let generatedName = 'John Placeholder';
  switch (regionInfo.region_id) {
    //i would LOVE for this to not be a switch statement. sql does not like variables as column names.
    case '1':
      generatedName = getWashName();
      break;
    case '2':
      generatedName = getKrawName();
      break;
    case '3':
      generatedName = getHofangName();
      break;
    case '4':
      generatedName = getSarcenName();
      break;
    case '5':
      generatedName = getVessaliName();
      break;
  }
  return generatedName;

}


function generateSpecies(regionInfo) {
  const rng = Math.round(Math.random() * 100);
  const speciesOptions = Object.values(regionInfo).slice(7);
  for (let i = 0; i < speciesOptions.length; i++) {
    //values for speciesOptions[i] are ascending, so just check in order
    if (rng <= speciesOptions[i]) {
      return (i + 1);
    }
  }
}

function generateAge() {
  const rngAge = Math.round(Math.random() * 10);
  if (rngAge === 0) {
    return 1;
  } else if (rngAge > 0 <= 2) {
    return 2;
  } else if (rngAge > 2 <= 8) {
    return 3;
  } else {
    return 4;
  }
}

async function generateBackground(regionInfo) {
  const isPrefBackground = Math.round(Math.random() * 100);
  let background = 0;
  if (isPrefBackground <= 30) {
    background = regionInfo.pref_background;
  } else {
    background = Math.round(Math.random() * 27);
  }
  return background;
}

async function getRegionName(region_id) {
  const { rows } = await pool.query(
    `SELECT name FROM region
     WHERE region_id = $1;
    `,
    [region_id]
  );
  return rows[0].name;
}

async function getBackgroundName(background_id) {
  const { rows } = await pool.query(
    `SELECT name FROM background
     WHERE background_id = $1;
    `,
    [background_id]
  );
  return rows[0].name;
}

function generateGoodEvil(regionInfo) {
  const isPrefGoodEvil = Math.round(Math.random() * 100);
  if (isPrefGoodEvil <= 50) {
    return regionInfo.avg_align_good;
  } else {
    return Math.round(Math.random() * 100);
  }
}

function generateLawChaos(regionInfo) {
  const isPrefLawChaos = Math.round(Math.random() * 100);
  if (isPrefLawChaos <= 50) {
    return regionInfo.avg_align_law;
  } else {
    return Math.round(Math.random() * 100);
  }
}

function generateTechnophobe(regionInfo) {
  const isPrefTechnophobe = Math.round(Math.random() * 100);
  if (isPrefTechnophobe <= 60) {
    return regionInfo.region_technophobia;
  } else {
    return Math.round(Math.random() * 100);
  }
}

function generateCultMember() {
  const isCultMember = Math.round(Math.random() * 100);
  return (isCultMember <= 2);
}


module.exports = Character;
