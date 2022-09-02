-- Adds the primary key to the variety join table.
ALTER TABLE `cct_coin_variety_relationships` ADD CONSTRAINT PRIMARY KEY (coin_id, variety_id);

ALTER TABLE `cct_coin_strikes`
    ADD strike_abbreviation VARCHAR(10) NOT NULL COMMENT 'The abbreviation for coin strikes.';