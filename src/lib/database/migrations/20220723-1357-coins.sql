CREATE TABLE cct.`cct_coin_strikes`(
    id    BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE cct.`cct_coin_groups`(
    id           BIGINT NOT NULL AUTO_INCREMENT,
    title        VARCHAR(255) NOT NULL,
    denomination INT NOT NULL COMMENT "The denomination of the coin's group multiplied by 100",
    PRIMARY KEY (id)
);

CREATE TABLE cct.`cct_us_mints`(
    id          BIGINT NOT NULL AUTO_INCREMENT,
    mark        VARCHAR(2)            COMMENT "The mark that is produced by this U.S. mint",
    city        VARCHAR(255) NOT NULL COMMENT "The city where this U.S. mint resides",
    state       VARCHAR(255) NOT NULL COMMENT "The state where this U.S. mint resides",
    date_opened DATETIME              COMMENT "The date of when this U.S. mint opened",
    date_closed DATETIME              COMMENT "The date of when this U.S. mint closed",
    PRIMARY KEY (id)
);

CREATE TABLE cct.`cct_materials`(
    id    BIGINT       NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL COMMENT 'The title of this material (i.e. Silver)',
    PRIMARY KEY (id)
);

CREATE TABLE cct.`cct_coin_compositions`(
    id          BIGINT        NOT NULL AUTO_INCREMENT,
    title       VARCHAR(100)  NOT NULL COMMENT 'The title of what this composition is used with',
    weight      INT           NOT NULL COMMENT 'The weight of this coin multiplied by 100',
    description VARCHAR(1000)          COMMENT 'A description of this composition',
    PRIMARY KEY (id)
);

CREATE TABLE cct.`cct_coin_composition_relationships`(
    material_id    BIGINT NOT NULL,
    composition_id BIGINT NOT NULL COMMENT 'The composition this is making up',
    percentage     INT    NOT NULL COMMENT 'The percentage this material multiplied by 1000',
    CONSTRAINT `fk_material`         FOREIGN KEY (material_id)    REFERENCES cct_materials(id),
    CONSTRAINT `fk_coin_composition` FOREIGN KEY (composition_id) REFERENCES cct_coin_compositions(id)
);

CREATE TABLE cct.`cct_coins`(
    id               BIGINT NOT NULL AUTO_INCREMENT,
    group_id         BIGINT NOT NULL COMMENT "The coin group that this coin belongs to",
    year             INT             COMMENT "The year that the coin was produced/ displays on the coin",
    mint_mark_id     BIGINT          COMMENT "The mark that appears on the coin",
    additional_title VARCHAR(255)    COMMENT "An additional title to append to the coin",
    strike_id        BIGINT NOT NULL COMMENT "The type of strike for this coin",
    mint_id          BIGINT NOT NULL COMMENT "The mint that produced this coin",
    mintage          BIGINT          COMMENT "The number of this coin that were produced",
    diameter         INT             COMMENT "The diameter of the coin in millimeters multiplied by 100",
    composition_id   BIGINT          COMMENT "The composition of the coin",
    date_created     DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_updated     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT `fk_coin_group`  FOREIGN KEY (group_id)       REFERENCES cct_coin_groups(id),
    CONSTRAINT `fk_mint_mark`   FOREIGN KEY (mint_mark_id)   REFERENCES cct_us_mints(id),
    CONSTRAINT `fk_strike`      FOREIGN KEY (strike_id)      REFERENCES cct_coin_strikes(id),
    CONSTRAINT `fk_composition` FOREIGN KEY (composition_id) REFERENCES cct_coin_compositions(id)
);

CREATE TABLE cct.`cct_coin_varieties`(
    id          BIGINT NOT NULL AUTO_INCREMENT,
    title       VARCHAR(255) NOT NULL,
    description VARCHAR(1000) COMMENT "A description of what this variety is",
    PRIMARY KEY (id)
);

CREATE TABLE cct.`cct_coin_variety_relationships`(
    coin_id    BIGINT NOT NULL,
    variety_id BIGINT NOT NULL,
    description VARCHAR(1000) COMMENT "A description of how to identify this coin's variety"
);