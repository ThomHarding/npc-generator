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
    //TODO: alignment, age, background math goes here i think
    this.person_id = row.person_id;
    this.name = row.name;
    this.species = row.species;
    this.age_group = row.age_group;
    this.background = row.background;
    this.region_id = row.region_id;
    if (0 >= row.alignment_law_chaos >= 35) {
      this.alignment_law_chaos = 'lawful';
    } else if (36 >= row.alignment_law_chaos >= 65) {
      this.alignment_law_chaos = 'neutral';
    } else {
      this.alignment_law_chaos = 'chaotic';
    }
    if (0 >= row.alignment_good_evil >= 35) {
      this.alignment_good_evil = 'good';
    } else if (36 >= row.alignment_good_evil >= 65) {
      this.alignment_good_evil = 'neutral';
    } else {
      this.alignment_good_evil = 'evil';
    }
    this.technophobia = row.technophobia + ' (out of 100)';
    this.cult_member = 'is ';
    (row.cult_member ? this.cult_member += 'is a cult member' : this.cult_member += 'not a cult member');
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT s.name AS species, b.name AS background, p.name, p.age_group, r.name AS region, p.alignment_good_evil, p.alignment_law_chaos, p.technophobia, p.cult_member  FROM person p JOIN species s ON p.species = s.species_id INNER JOIN background b ON b.background_id = p.background INNER JOIN region r ON r.region_id = p.region_id');
    return rows.map((row) => new Character(row));
  }
  
  static async insert({ name, species, age_group, background, region_id, alignment_good_evil, alignment_law_chaos, technophobia, cult_member }) {
    const { rows } = await pool.query(
      `INSERT INTO person (
        name,
        species,
        age_group,
        background,
        region_id,
        alignment_good_evil
        alignment_law_chaos,
        technophobia,
        cult_member
      )
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9);  
      RETURNING *  ;
    `,
      [name, species, age_group, background, region_id, alignment_good_evil, alignment_law_chaos, technophobia, cult_member]
    );

    return new Character(rows[0]);
  }
}

module.exports = Character;
