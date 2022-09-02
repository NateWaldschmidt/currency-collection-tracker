
CREATE TABLE cct.`cct_collections`(
    id           BIGINT NOT NULL AUTO_INCREMENT,
    user_id      BIGINT NOT NULL       COMMENT "The ID of the user who owns this collection",
    title        VARCHAR(255) NOT NULL COMMENT "The title of this collection",
    description  VARCHAR(255) NOT NULL COMMENT "A description of what this collection is",
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT `fk_users` FOREIGN KEY (user_id) REFERENCES cct_users(id)
);

