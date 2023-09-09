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
  ('The Wash', 9, 50, 90, 70, 50, 40, 60, 78, 83, 88, 90, 92, 94, 95, 96, 97, 97, 98, 98, 98, 98, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100),
  ('Kraw', 14, 70, 85, 90, 60, 15, 16, 17, 18, 19, 54, 75, 87, 91, 92, 95, 95, 95, 95, 95, 95, 96, 96, 96, 96, 96, 96, 96, 96, 96, 100),
  ('Hofang', 18, 80, 10, 10, 30, 6, 7, 7, 7, 8, 9, 10, 11, 12, 32, 45, 63, 76, 83, 89, 90, 90, 90, 91, 92, 93, 95, 96, 97, 98, 100),
  ('Sarcen', 1, 30, 50, 20, 90, 2, 3, 4, 5, 5, 6, 24, 25, 25, 26, 36, 37, 37, 37, 37, 39, 74, 81, 87, 93, 98, 98, 98, 100, 100, 100),
  ('Vessali', 24, 20, 15, 35, 10, 15, 18, 19, 21, 24, 28, 33, 36, 37, 39, 42, 44, 54, 55, 56, 57, 67, 69, 70, 71, 72, 80, 87, 92, 97, 100)
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
  ('bill down tpub', 21, 4, 1, 1, 0, 50, 25, FALSE);  

  
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