# Currency Collection Tracker
Created and Maintained by Nathaniel Waldschmidt

The Currency Collection Tracker is a system intended to track your collection of United States currency. The application will be capable of tracking both coins and paper currency and will provide historical information for both forms. Collections will be capable of being tracked in multiple formats including lists, grids, and custom formats to match which ever form you collect your numismatic collectables.

## Collected Historical Data

### Coins
- Year
- Mint
- Mintmark
- Varieties and Errors
- Strike Type
- Mintage
- Denomination
- Diameter
- Weight
- Metallic Composition
  - Metal
  - Composition Percentage
- Melt Value
- Obverse Design
- Reverse Design

### Paper Currency
- Series Year
- Signatures
- Varieties and Errors
- Printage
- Denomination
- Dimensions
- Type
  - Federal Reserve Note
  - Gold Certificate
  - Silver Certificate
  - Legal Tender
  - National Bank Note
- Manufactured Location
- Federal Reserve Stamp

## ~~Docker Preview~~ (To Be Added)
1. Ensure the environment variables for the `docker-compose.yml` file are set. These include:
    - `ACCESS_TOKEN_SECRET`
      - Used for auth
    - `DATABASE_NAME`
      - The name for the database.
    - `DATABASE_ROOT_PASSWORD`
      - The password to be set for the root MySQL user.
    - `DATABASE_USER`
      - The username for the MySQL user assigned to the server.
    - `DATABASE_USER_PASSWORD`
      - The password for the MySQL user.
2. Build and up the container.
```
docker-compose up --build
```
3. Test the connection at [localhost:3000](localhost:3000)
4. ~~Restore the database with the provided MySQL database dump.~~