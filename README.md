# Setting Up Supabase Locally

## 1. Install Docker

To run Supabase services locally, Docker is required. If you don't have it already, you can download Docker from [here](https://www.docker.com/get-started/).

## 2. Install Package Manager

Before installing the Supabase CLI, you need to have either Brew (for MacOS and Linux) or Scoop (for Windows) installed. These are package managers that Supabase CLI uses for distribution.

- For MacOS and Linux, use [Brew](https://brew.sh/).
- For Windows, use [Scoop](https://scoop.sh/).

## 3. Install Supabase CLI

### Using Brew:

```bash
brew install supabase/tap/supabase
```

### Using Scoop:

```bash
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

## 4. Login to Supabase CLI and Link Project with Remote

To begin, sign in to Supabase CLI using the following command and follow the instructions prompted:

```bash
supabase login
```

Once logged in, you need to link your local project with the remote project. Execute the command below to initiate the linking process:

```bash
supabase link
```

This command will display a list of projects associated with your account. Use the arrow keys to select the correct project and press Enter. You will then be prompted to enter or copy-paste your database password.

By linking your local project with the remote one, you establish a connection that allows you to push and pull changes between your local environment and the remote Supabase project.

## 5. Start Supabase Stack

Navigate to your project folder and start the Supabase stack using the following command:

```bash
start supabase
```

The initial startup might take some time, but within a few minutes, you should see a prompt similar to this:

```
Started supabase local development setup.

         API URL: http://127.0.0.1:54321
     GraphQL URL: http://127.0.0.1:54321/graphql/v1
          DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
      Studio URL: http://127.0.0.1:54323
    Inbucket URL: http://127.0.0.1:54324
      JWT secret: XXXXX
        anon key: XXXXX
service_role key: XXXXX
```

Copy the `anon` and `service_role` key values and paste them into your `.env.local` file.

## 6. Pull Latest Database Changes

To ensure that you are working with the latest version of the database (also in future if there are any changes in
remote you should do this), use the following bash command:

```bash
supabase db pull
```

This command will fetch the latest database changes and create a new migration file in the `supabase\migrations` folder.

Although the newest version of the database changes may not be immediately available in your local database, you can
update your local database to the latest version using the following command:

```bash
supabase migration up
```

Executing this command in your bash terminal will instruct the Supabase stack to apply the newest migration file to your
database, ensuring that your local database is up-to-date with the latest changes.

## 7. Start Developing

With the Supabase stack running locally, you're ready to start developing. Begin your app with the following prompt:

```bash
npm run dev
```

Now, you can navigate to [http://localhost:3000](http://localhost:3000) to view your application. Please note that the local Supabase stack doesn't require normal SMTP configuration. Therefore, all emails, including authentication emails, can be found ONLY on the Inbucket site at [http://127.0.0.1:54324](http://127.0.0.1:54324).

## 8. Deploy Local Database Changes to Remote

As per the Supabase CLI documentation, you can deploy changes made on your local Supabase stack to the remote database using the following bash command:

```bash
supabase db push
```

However, you're probably experiencing issues where changes are not taking effect on the remote database despite receiving the prompt:

```
Connecting to remote database...
Remote database is up to date.
```

The reason for this could be that the feature might require Branching to be enabled, which is a paid feature. So for now lets make changes to remote and then pull them to local.

---
This manual was written using Supabase own instruction that can be found [here](https://supabase.com/docs/guides/cli/getting-started?platform=windowsp)
