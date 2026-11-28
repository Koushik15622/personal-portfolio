# Personal Portfolio Website in React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


Built using:

- Front-end library: React
- CSS framework: React-bootstrap
- CSS animations library: Animate.css

In the /personal-portfolio, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### URL shortener

Open **Professional Background → Projects & Research → URL shortener**, or visit
`/projects/url-shortener`. Short links use the same origin at `/s/<code>`.

Copy `backend/.env.example` to `backend/.env` and fill in `MONGODB_URI`.
The database defaults to `portfolio` (override with `MONGODB_DB`). The MongoDB
user needs read/write access to the database. Keep the URI server-side.

For local development, run `npm ci --prefix backend` and `npm start --prefix backend`
from the repository root. The API defaults to port 5001. In a second terminal,
run `npm ci --legacy-peer-deps` and `npm start` for the frontend. To override
the API origin, copy the root `.env.example` to `.env` and set
`REACT_APP_BACKEND_URL`. Restart the frontend after editing it.

For Vercel, deploy the frontend from the repository root and the Express API
from the `backend` root using `backend/vercel.json`. Set `MONGODB_URI` on the
backend project and `REACT_APP_BACKEND_URL` to its HTTPS origin on the frontend
project before rebuilding. Portfolio short links open the frontend, which
forwards the code to the backend for the HTTP redirect.
