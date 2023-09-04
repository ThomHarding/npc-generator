const pool = require('../utils/pool');

class Character {
  person_id;
  name;
  species;
  age_group;
  background;
  region_id;
  alignment_good_evil;
  alignment_law_chaos;
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
    this.alignment_good_evil = row.alignment_good_evil;
    this.alignment_law_chaos = row.alignment_law_chaos;
    this.technophobia = row.technophobia;
    this.cult_member = row.cult_member;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT s.name AS species, b.name AS background, p.name, p.age_group, r.name AS region, p.alignment_good_evil, p.alignment_law_chaos, p.technophobia, p.cult_member  FROM person p JOIN species s ON p.species = s.species_id INNER JOIN background b ON b.background_id = p.background INNER JOIN region r ON r.region_id = p.region_id');
    return rows.map((row) => new Character(row));
  }
}

module.exports = Character;
