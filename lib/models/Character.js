const pool = require('../utils/pool');

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
    this.background = row.background;
    this.region_id = row.region_id;
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

  static async testInsert(name, region_id) {
    console.log('test insert ahoy');
    //unless body has region id?
    const regionInfo = await Character.fetchRegionInfo(2);
    //region info just be what you get from selecting id = regionid on region
    const speciesId = generateSpecies(regionInfo[0]);
    const species = await this.getSpecies(speciesId);
    const age_group = generateAge();
    const background = generateBackground(regionInfo[0]);
    const alignment_good_evil = generateGoodEvil(regionInfo[0]);
    const alignment_law_chaos = generateLawChaos(regionInfo[0]);
    const technophobia = generateTechnophobe(regionInfo[0]);
    const cult_member = generateCultMember();
    console.log(name, species, age_group, background, region_id, alignment_good_evil, alignment_law_chaos, technophobia, cult_member);
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
      [name, speciesId, age_group, background, region_id, alignment_good_evil, alignment_law_chaos, technophobia, cult_member]
    );
    rows[0].species = species;
    console.log('avast.', rows);
    return new Character(rows[0]);
  }
  
  static async insert({ name, body }) {
    const regionInfo = await Character.fetchRegionInfo(body.regionid)[0];
    //region info just be what you get from selecting id = regionid on region
    const species = generateSpecies(regionInfo);
    const age_group = generateAge();
    const background = generateBackground(regionInfo);
    const alignment_good_evil = generateGoodEvil(regionInfo);
    const alignment_law_chaos = generateLawChaos(regionInfo);
    const technophobia = generateTechnophobe(regionInfo);
    const cult_member = generateCultMember();
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
        ($1, $2, $3, $4, $5, $6, $7, $8, $9);  
      RETURNING *  ;
    `,
      [name, species, age_group, background, body.region_id, alignment_good_evil, alignment_law_chaos, technophobia, cult_member]
    );
    return new Character(rows[0]);
  }
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

function generateBackground(regionInfo) {
  const isPrefBackground = Math.round(Math.random() * 100);
  if (isPrefBackground <= 30) {
    return regionInfo.pref_background;
  } else {
    return Math.round(Math.random() * 27);
  }
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
