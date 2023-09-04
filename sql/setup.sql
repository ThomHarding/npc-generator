-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS background;
DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS species;
DROP TABLE IF EXISTS region;

CREATE TABLE background (
  background_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(200) NOT NULL
  --description
);

CREATE TABLE region (
  region_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR,
  pref_background INT,
  avg_align_good INT,
  avg_align_law INT,
  avg_mercenary INT,
  region_technophobia INT,
  human INT,
  halfling INT,
  triton INT,
  dragonborn INT,
  sea_elf INT,
  lizardfolk INT,
  gnome INT,
  tiefling INT,
  aasimar INT,
  goliath INT,
  orc INT,
  kenku INT,
  elf INT,
  eladrin INT,
  hobgoblin INT,
  goblin INT,
  dwarf INT,
  duergar INT,
  harengon INT,
  yuanti INT,
  shifter INT,
  genasi INT,
  tabaxi INT,
  bugbear INT,
  kobold INT,
  minotaur INT
);

CREATE TABLE person (
  person_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(280) NOT NULL,
  species INT,
  age_group INT, --1 through 20 - 1 is child, 2-4 are teenage, 5-15 are adult, 16-20 are elderly
  background INT,
  region_id INT,
  alignment_good_evil INT, --0 to 100 start at region base, rng a random number 1-50 up or down? 0-35 good, 36-65 neutral, 66-100 evil
  alignment_law_chaos INT, --0 to 100 same, but 0 is law 100 is chaos
  technophobia INT, -- 0 to 100
  cult_member BOOLEAN,
  FOREIGN KEY (region_id) REFERENCES region(region_id)
);

CREATE TABLE species (
  species_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(200) NOT NULL
);

INSERT INTO background (
  name
)
VALUES 
  ('God Fearing'),
  ('Societal Scholar'),
  ('Grave Robber'),
  ('Local Guard'), 
  ('Professional Liar'), 
  ('Empire Artisan'), 
  ('Ex-Shut In'), 
  ('Bureaucrat'),
  ('Law Disrespecter'),
  ('Aquateer'),
  ('Plunderer'),
  ('Privateer'),
  ('Boat Mage'),
  ('Unlanded'),
  ('Enlisted'),
  ('Stranded'),
  ('Showstopper'),
  ('Agent'),
  ('Khanate Servitor'),
  ('Guilded'),
  ('Krawn Influencer'),
  ('Tourist'),
  ('Tribal'),
  ('Dock Warden'),
  ('Vessali Celebrated'),
  ('Smuggler'),
  ('Fisher');

INSERT INTO region (
  name,
  pref_background,
  avg_align_good,
  avg_align_law,
  avg_mercenary,
  region_technophobia,
  human,
  halfling,
  triton,
  dragonborn,
  sea_elf,
  lizardfolk,
  gnome,
  tiefling,
  aasimar,
  goliath,
  orc,
  kenku,
  elf,
  eladrin,
  hobgoblin,
  goblin,
  dwarf,
  duergar,
  harengon,
  yuanti,
  shifter,
  genasi,
  tabaxi,
  bugbear,
  kobold,
  minotaur
)
VALUES 
  ('The Wash', 9, 50, 90, 70, 50, 40, 20, 18, 5, 5, 2, 2, 2, 1, 1, 1, 0, 3, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0),
  ('Kraw', 14, 70, 85, 90, 60, 15, 1, 0, 1, 1, 35, 25, 12, 5, 1, 1, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4),
  ('Hofang', 18, 80, 10, 10, 30, 6, 1, 0, 0, 1, 1, 1, 1, 1, 20, 13, 14, 9, 7, 6, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1),
  ('Sarcen', 1, 30, 50, 20, 90, 2, 1, 1, 1, 0, 1, 18, 1, 0, 1, 10, 1, 0, 0, 0, 2, 35, 7, 6, 6, 5, 1, 0, 1, 0, 0),
  ('Vessali', 24, 20, 15, 35, 10, 15, 3, 1, 2, 3, 4, 5, 3, 1, 1, 3, 2, 10, 1, 1, 1, 10, 2, 1, 1, 2, 8, 7, 5, 5, 3)
  ;

INSERT INTO person (
  name,
  species,
  age_group, --child, teenage x2, adult x8, elderly x3
  background, --as listed on the backgrounds doc
  region_id,
  alignment_good_evil, --0 to 100, 0 good 100 evil 50 neutral
  alignment_law_chaos, --0 to 100, 0 lawful 100 chaotic 50 neutral
  technophobia, -- 0 to 100
  cult_member
)
VALUES 
  ('bill down tpub', 21, 3, 1, 1, 0, 50, 25, FALSE);  

  
INSERT INTO species (
  name
)
VALUES 
  ('human'),
  ('halfling'),
  ('triton'),
  ('dragonborn'),
  ('sea_elf'),
  ('lizardfolk'),
  ('gnome'),
  ('tiefling'),
  ('aasimar'),
  ('goliath'),
  ('orc'),
  ('kenku'),
  ('elf'),
  ('eladrin'),
  ('hobgoblin'),
  ('goblin'),
  ('dwarf'),
  ('duergar'),
  ('harengon'),
  ('yuanti'),
  ('shifter'),
  ('genasi'),
  ('tabaxi'),
  ('bugbear'),
  ('kobold'),
  ('minotaur');