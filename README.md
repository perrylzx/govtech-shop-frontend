## Govtech Shop Frontend

The frontend for an online store called Govtech Shop that allows users to manage their item listings. Hosted at https://govtech-items.web.app/
- Objective 1: Frontend and backend
- Objective 2: Create good frontend design. This was my first time trying to - create a good looking design
  - https://www.figma.com/file/wHqtDiQ9ZFOjtHnluaH4Zf/Untitled?node-id=0%3A1
- Objective 3: Setup logger. This logs errors from clients and sends it to - https://sentry.io/organizations/perrys-pugs/issues/?project=6496370
- Objective 4: Validation - validation all fields at src/common/validate.js

# Features

- Landing page (Contains all the current functionality. I decided to contain everything in one page as I felt the form needed to create or update the page could comfortably fit inside the entire page, which could also make a better user experience.) 

  - [GET] Show total list of items, along with count. Each card show all info about the items (id, name, price)
  - [POST] Post item button opens up a modal with a form in it
  - [GET] Filter section can search by name and filter by preferred minimum/maximum price
  - [PUT] Update button on the cards turn the item info into editable text boxes, with a prompt to save changes
  - [DELETE] Delete button on the cards prompts the user to confirm by making it necessary to click again to delete the item

- Errors are logged to sentry at https://sentry.io/organizations/perrys-pugs/issues/?project=6496370



# Startup guide for development

  1. Install packages
  2. Run 'npm run start' 
  3. Go to localhost:3000
  4. The only page lives on the root route /

# Todos

- Cleanup code
  - More strict prop validation
  - Some components can be moved to its own files, to make it less messy
- Disable update button when they haven't made any changes in the update fields
- Use form package instead of my own one, I realized the error handling was difficult
- Validate input on change of update/post item fields instead of on submit
- Disable post button when fields inputs are invalid
- Only left validation for filters
