const pool = require('../utils/pool');

class Character {
  person_id;
  name;
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
    this.age_group = row.age_group;
    this.background = row.background;
    this.region_id = row.region_id;
    this.alignment_good_evil = row.alignment_good_evil;
    this.alignment_law_chaos = row.alignment_law_chaos;
    this.technophobia = row.technophobia;
    this.cult_member = row.cult_member;
  }

  static async getAll() {
    //TODO: background is a join from background
    const { rows } = await pool.query('SELECT p.person_id, name, age_group, background, region_id, alignment_good_evil, alignment_law_chaos, technophobia, cult_member FROM person p');
    return rows.map((row) => new Character(row));
  }
}

module.exports = Character;
