DROP TABLE notes;
DROP TABLE users;

CREATE TABLE users (
  user varchar(255) NULL,
  pass varchar(255),
  PRIMARY KEY (user)
);

CREATE TABLE notes (
  id mediumint(8) unsigned NOT NULL auto_increment,
  fecha varchar(255) DEFAULT "0/0/0",
  texto TEXT DEFAULT "SOME TEXT HERE",

  PRIMARY KEY (id)
) AUTO_INCREMENT=1;

INSERT INTO users (user,pass) VALUES ("Martina Briggs","XPN71XWV6VW"),("Yoshio Dixon","SLR09KEO2ZJ"),("Dahlia Cooper","IHB98RMZ6YX"),("Reed Gilmore","WTV96DIA9IJ"),("Brynne Merrill","XDZ47PQJ1ZS"),("Bernard Nolan","GQM75WRY3YX"),("Blaze Odom","SYU59OLC4VW"),("Cameron Mccullough","LHR36PEV8UH"),("Kimberley Buck","UEU17DPZ8ZI"),("Natalie Pope","ZJY77YHL1PH");
INSERT INTO users (user,pass) VALUES ("Sierra Castillo","IUO48VQQ1FX"),("Odette Holt","WRP26IKB3TP"),("Yen Cotton","JBA48KUF8IJ"),("Rhiannon Scott","NJK39JPV2MT"),("Clio Mooney","URF40EAI1KW"),("Colt William","USX82JML9VV"),("Hayley Travis","BWO69GNH7KR"),("Wilma Sears","XXI78IPQ0KE"),("Mona Hansen","MWE42OAL7PA"),("Blaze Chandler","KYU95VXY3DB");
INSERT INTO users (user,pass) VALUES ("Odysseus Vazquez","RFZ20GLE6LO"),("Azalia Ramsey","RJC95BSU6HG"),("Margaret Mccarthy","ENN67XLH0FI"),("Graiden Strickland","DZI54WPR5ZX"),("Miranda Lucas","FBD95PDI6QC"),("Baker Sargent","KIA45YRU5WO"),("Hu Jefferson","XBR56EEA2LV"),("Odessa Merrill","UUZ83EXY2RW"),("Armand Gardner","NOX14ZUV5IR"),("Violet Rogers","PNK34ECJ6FQ");
INSERT INTO users (user,pass) VALUES ("Gray House","CCL75FEI5WI"),("Julie Mathews","HQF60AJW4NW"),("Quemby Acosta","JWJ41XCK1QX"),("Ulla Massey","DLD26WQT9PA"),("Kylan Franco","RFX03QAG5VO"),("Teagan Craig","MTR88NMD3UF"),("Ayanna Byrd","NCH96DDF8PT"),("Kirby Beard","SRF39GWH7LZ"),("Kibo Rice","GFZ05LUI9SM"),("Edward Roach","JBY97LTA1TY");
INSERT INTO users (user,pass) VALUES ("Keegan Rasmussen","UMQ26JSI8CU"),("Burke Griffith","OTO74AJI8KM"),("Joy Stanley","PLI30VEB5JF"),("Ingrid Walker","GGO21JAM7NE"),("Karyn Weeks","ZWM13VQY2JT"),("Alvin Gomez","QHL34CQC6IY"),("Kai Harris","QLX90CZM5JZ"),("Trevor Flores","RMI86TRX2RA"),("Carl Beard","PNL40HZO6WO"),("Orlando Ochoa","RGY59ICQ9DY");
INSERT INTO users (user,pass) VALUES ("Portia Mendez","ERD89SQM4JT"),("Brandon Oneil","UCC13UNS3VA"),("Kenyon Eaton","YWR35OVA4KI"),("Katell Nicholson","ZGL41PNU9JI"),("Dakota Stafford","BMX15PKG7SQ"),("Alyssa Pittman","OOX94ZKQ8LF"),("Baxter Francis","ONM86ECB4TM"),("Karen Forbes","DOD48QIR3JM"),("Roanna Wells","NVW35KGO6VR"),("Otto Rollins","FBI54YFG8DB");
INSERT INTO users (user,pass) VALUES ("Britanney Mcdaniel","BLX65SZB1QN"),("Dane Rodriquez","SGB71ICA3TY"),("Maya Valentine","HBS44IVD1VR"),("Whitney Weiss","OCS38DSE2KE"),("Aurelia Kelly","WBF98GZS7OO"),("Roth Atkins","UOY63HTO6ZK"),("Quamar Marshall","ETT07MUC7WH"),("Ezekiel Garrison","JGM42KIH9QL"),("Candice Case","LCQ06LRX5EM"),("Kelsie Pickett","AHE70PZF6SX");
INSERT INTO users (user,pass) VALUES ("Bevis Wilkerson","AYA02FJQ8JD"),("Heidi Kidd","XMC92QQV0XL"),("Rebekah Ellis","OQP36GSF4EM"),("Neil Soto","OSE73VFC5WN"),("Piper Francis","VEC42VVP9QT"),("Gwendolyn Crosby","IDN11ZLY3FQ"),("Theodore Rose","UFY34UFE9NP"),("Elvis Bonner","WPP34KIA8BA"),("Karyn Baker","JJI92NLX5IR"),("Ulla Chan","ZZM36SDA2JB");
INSERT INTO users (user,pass) VALUES ("Blair Ray","ZCT49SOC1XY"),("Mannix Richmond","ZKJ20LSN4BE"),("Matthew Ware","XBW10LBQ2ZN"),("Xaviera Clemons","YMK77NWX3HC"),("Georgia Vance","MOP65GYY5MW"),("Breanna Mullins","HEX34NLC6ML"),("Solomon Johns","HNM84CUJ3BS"),("Quinn Hendrix","OBN18RIM8UC"),("Leah Graves","PHO99TQJ3FL"),("Phyllis Cline","WHM74WHI3UT");
INSERT INTO users (user,pass) VALUES ("Ignatius Carter","MGQ93GPB6EU"),("Uma Jacobs","CPY32RRL3EH"),("Hillary Lopez","CAH97RLA9KN"),("Mollie Wiley","TWO87NZO4XV"),("Dylan Michael","FUO36GLW2UK"),("Hilel Lang","BHI44JQV7AP"),("Barclay Mercer","ROT85TFX6WQ"),("Dane Butler","EZA22MRF4UP"),("Ivana Roth","OZZ22LMJ6YO"),("Jared Beard","BWZ93QCF1EO");


