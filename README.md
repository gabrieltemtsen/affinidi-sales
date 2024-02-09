# AFFINIDI-SALES

## Overview
Affinidi-Sales builds upon the previous Stackup quest where we developed a basic online store leveraging Affinidi's Vault for user information during the checkout process. In this iteration, I have introduced additional features using Affinidi's products to enhance user experience and functionality.

## Affinidi Products Integration
In addition to the solutions utilized from Affinidi in Quest 4, I have incorporated two new data points from Affinidi's Vault:

1. **HITPicture**: This data point retrieves the user's profile picture from Affinidi's Vault. I have implemented functionality to display the user's profile picture upon login.

2. **HITBirthdate**: Retrieving the user's birthdate from the Vault, I have implemented a feature granting users a 100% discount on their birthdays. Upon clicking the "Apply Birthday Discount" button, if it is the user's birthday, the discount is applied; otherwise, an error message is displayed indicating that it is not their birthdays yet.

## User Experience Enhancement
These new features significantly enhance the user experience by providing personalized content and special discounts based on user data stored securely in Affinidi's Vault by the user. Users now have the ability to see their profile picture upon login, adding a personal touch to their interactions with the platform. Moreover, offering birthday discounts fosters user engagement and loyalty.


## Source Code References
1. **Displaying Profile Picture**:
   - [`Display view`](https://github.com/gabrieltemtsen/affinidi-sales/blob/main/src/components/Navbar.tsx#L55)
   -  [`Logic Request (next-auth-options)`](https://github.com/gabrieltemtsen/affinidi-sales/blob/main/src/lib/auth/auth-options.ts#L35)
   -  [`PEX-QUERY`](https://github.com/gabrieltemtsen/affinidi-sales/blob/main/src/lib/pex-queries.ts#L225)

2. **Applying Birthday Discount**:
   - [`Display view`](https://github.com/gabrieltemtsen/affinidi-sales/blob/main/src/components/Drawer/index.tsx#L250)
   - [`Logic`](https://github.com/gabrieltemtsen/affinidi-sales/blob/main/src/components/Drawer/index.tsx#L114)
   - [`Logic request (neext-auth-options)`](https://github.com/gabrieltemtsen/affinidi-sales/blob/main/src/lib/auth/auth-options.ts#L47)
   - [`PEX-QUERY`](https://github.com/gabrieltemtsen/affinidi-sales/blob/main/src/lib/pex-queries.ts#L255)

## Conclusion
By leveraging Affinidi's products and integrating additional data points from the Vault, I have improved the functionality and user experience of our online store application. These enhancements not only personalize the user experience but also demonstrate the seamless integration of Affinidi's solutions into real-world projects.
