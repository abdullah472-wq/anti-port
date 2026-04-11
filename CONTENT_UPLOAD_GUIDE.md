# Content Upload Guide (Projects + Blogs)

You can now update content without touching TypeScript files.

## Files to edit

- `public/content/projects.json`
- `public/content/blogs.json`

## How to update

1. Open one of the JSON files.
2. Add or edit an item object.
3. Upload related images to `public/projects/` or `public/blog/`.
4. Put the image path in JSON (example: `"/projects/new-project.webp"`).
5. Deploy.

## Project fields

- `id` (string, unique)
- `title` (string)
- `description` (string)
- `image` (string path)
- `category` (`Web` | `Mobile` | `Full Stack`)
- `tech` (array of strings or comma-separated string)
- `liveUrl` (string, optional)
- `githubUrl` (string, optional)
- `featured` (boolean, optional)
- `lighthouseScore` (number, optional)
- `loadTime` (string, optional)
- `mobileResponsive` (boolean, optional)

## Blog fields

- `id` (string, unique)
- `slug` (string, unique)
- `title` (string)
- `excerpt` (string)
- `date` (string)
- `readingTime` (string)
- `category` (string)
- `image` (string path)
- `content` (string, optional)

## Optional remote data URLs

If you want to host JSON elsewhere (Google Sheet API, CDN, etc.), set:

- `NEXT_PUBLIC_PROJECTS_DATA_URL`
- `NEXT_PUBLIC_BLOGS_DATA_URL`

If these are not set, the app uses `/content/projects.json` and `/content/blogs.json`.
