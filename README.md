## If you wish to try the project
# download zip

You first need to add .env file to whole project
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

OPENAI_API_KEY = 

REPLICATE_API_TOKEN = 

MONGODB_URI =
```
Where you need to provide this keys yourself.

First run,

```bash
npm install
```

then

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
