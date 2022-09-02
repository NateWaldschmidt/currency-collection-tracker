-- July 23rd, 2022, 8:33 AM
-- Created by Nathaniel Waldschmidt

CREATE TABLE cct.`cct_users` (
    id           BIGINT NOT NULL AUTO_INCREMENT,
    first_name   VARCHAR(255)                 COMMENT "The legal first name of the user",
    last_name    VARCHAR(255)                 COMMENT "The legal last name of the user.",
    password     VARCHAR(255) NOT NULL        COMMENT "The password used by the user.",
    display_name VARCHAR(255) NOT NULL UNIQUE COMMENT "The user's display name within the application visible to other users",
    email        VARCHAR(255) NOT NULL UNIQUE COMMENT "The user's email address",
    mobile_phone VARCHAR(12)                  COMMENT "The user's mobile phone number",
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);