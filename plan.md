@workspace Hello, I am working on a next.js app router project. currently I am trying to a feature that would allow that admin to create, edit publish test questions. I have done few part to this aim However it's yet to be completed which Is what I want you to help me with.

can you now help me to setup /admindash/tests/[testId] it's components, pages and routes, for the plan we'll start with the api routes api -> components -> page

for each file you write indicate it's name and path e.g // app/(dashboards)/admindash/tests/[testId]/page.tsx

Phase 1: API Routes
We need the following API endpoints in /api/admindash/tests/[testId]/:
1. Categories:
- GET    /api/admindash/tests/[testId]/categories      -> List categories
- POST   /api/admindash/tests/[testId]/categories      -> Create category
- PATCH  /api/admindash/tests/[testId]/categories/[id] -> Update category
- DELETE /api/admindash/tests/[testId]/categories/[id] -> Delete category

2. Questions:
- GET    /api/admindash/tests/[testId]/questions      -> List questions
- POST   /api/admindash/tests/[testId]/questions      -> Create question
- PATCH  /api/admindash/tests/[testId]/questions/[id] -> Update question
- DELETE /api/admindash/tests/[testId]/questions/[id] -> Delete question

3. Test:
- GET    /api/admindash/tests/[testId] -> Get test details
- PATCH  /api/admindash/tests/[testId] -> Update test
- DELETE /api/admindash/tests/[testId] -> Delete test

Phase 2: Components
In _components:

1. Test Editor:
- test-actions.tsx -> Test actions (publish, preview, delete)
- test-title-form.tsx -> Edit test title
- test-description.tsx -> Edit test description

2. Categories:
- category-list.tsx -> List and manage categories
- category-item.tsx -> Individual category component
- add-category-button.tsx -> Button to add new category

3. Questions:
- question-list.tsx -> List questions in a category
- question-item.tsx -> Individual question component
- add-question-button.tsx -> Button to add new question

4. Common:
- loading-state.tsx -> Loading spinner
- error-state.tsx -> Error message display

Phase 3: Pages
In [testId]:

1. page.tsx -> Main test editor page
2. loading.tsx -> Loading state
3. error.tsx -> Error handling
4. not-found.tsx -> 404 page