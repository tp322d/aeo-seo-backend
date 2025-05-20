# DeepRank Strapi Backend

## Overview
Strapi-based backend for the DeepRank AI SEO consulting platform. This application provides the API and content management system for the frontend application, handling lead generation, website analysis, and content management.

## Features
- Lead Management System
- Website Analysis API
- Content Management System
- SEO Score Calculation
- AEO (AI Engine Optimization) Analysis
- RESTful API Endpoints
- Admin Dashboard

## System Requirements
- Node.js v22.15.1
- npm (comes with Node.js)
- MySQL/MariaDB database
- PM2 (for production deployment)

## Project Structure
```
aeo-seo-backend/
├── config/         # Strapi configuration files
│   ├── api.ts      # API configuration
│   ├── database.ts # Database configuration
│   └── server.ts   # Server configuration
├── database/       # Database configuration and migrations
├── public/         # Public assets
├── src/
│   ├── api/       # API endpoints and models
│   │   ├── lead/  # Lead management
│   │   ├── website-check/ # Website analysis
│   │   └── about/ # About page content
│   ├── admin/     # Admin panel customization
│   └── plugins/   # Custom plugins
└── dist/          # Production build output
```

## Development Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Create `.env` file with:
   ```env
   HOST=0.0.0.0
   PORT=1337
   APP_KEYS=your-app-keys
   API_TOKEN_SALT=your-token-salt
   ADMIN_JWT_SECRET=your-admin-jwt-secret
   TRANSFER_TOKEN_SALT=your-transfer-token-salt
   DATABASE_HOST=localhost
   DATABASE_PORT=3306
   DATABASE_NAME=your_database_name
   DATABASE_USERNAME=your_username
   DATABASE_PASSWORD=your_password
   ```

3. Run development server:
   ```bash
   npm run develop
   ```

## Production Deployment

### Building the Application
1. Build the application:
   ```bash
   NODE_ENV=production npm run build
   ```

### Service Configuration
The application runs as a systemd service in production.

1. Service file location: `/etc/systemd/system/deeprank-strapi-back.service`

2. Service configuration:
   ```ini
   [Unit]
   Description=DeepRank Strapi Backend
   After=network.target

   [Service]
   Type=simple
   User=deeprank
   WorkingDirectory=/home/deeprank/deeprank-strapi-backend/aeo-seo-backend
   ExecStart=/home/deeprank/.nvm/versions/node/v22.15.1/bin/npm run start
   StandardOutput=append:/var/log/deeprank-backend.log
   StandardError=append:/var/log/deeprank-backend.error.log
   Restart=always
   RestartSec=10
   Environment=NODE_ENV=production
   Environment=PATH=/home/deeprank/.nvm/versions/node/v22.15.1/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

   [Install]
   WantedBy=multi-user.target
   ```

### Managing the Service
1. Start the service:
   ```bash
   sudo systemctl start deeprank-strapi-back.service
   ```

2. Stop the service:
   ```bash
   sudo systemctl stop deeprank-strapi-back.service
   ```

3. Check service status:
   ```bash
   sudo systemctl status deeprank-strapi-back.service
   ```

4. View logs:
   ```bash
   tail -f /var/log/deeprank-backend.log
   tail -f /var/log/deeprank-backend.error.log
   ```

## API Documentation
- Admin panel available at: https://api.deeprank.ai/admin
- API endpoints available at: https://api.deeprank.ai/api
- Documentation available in the Strapi admin panel

### Available Endpoints
- `/api/leads` - Lead management
  - POST: Create new lead
  - GET: List all leads
  - GET /:id: Get specific lead
  - PUT /:id: Update lead
  - DELETE /:id: Delete lead

- `/api/website-check` - Website analysis
  - POST: Analyze website
  - GET: List all analyses
  - GET /:id: Get specific analysis

- `/api/about` - About page content
  - GET: Get about page content
  - PUT: Update about page content

## Database Management
1. Backup database:
   ```bash
   mysqldump -u your_username -p your_database_name > backup.sql
   ```

2. Restore database:
   ```bash
   mysql -u your_username -p your_database_name < backup.sql
   ```

## Security Configuration
1. CORS settings in `config/server.ts`:
   ```typescript
   cors: {
     enabled: true,
     origin: ['https://deeprank.ai', 'https://www.deeprank.ai', 'http://localhost:3000'],
   }
   ```

2. Content Security Policy in Nginx:
   ```nginx
   add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://www.youtube-nocookie.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://www.youtube.com https://www.youtube-nocookie.com; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com; connect-src 'self' https://api.deeprank.ai; font-src 'self' data:; object-src 'none'; media-src 'self'; frame-ancestors 'self';" always;
   ```

## Troubleshooting
1. If the service fails to start:
   - Check logs in `/var/log/deeprank-backend.log`
   - Verify database connection
   - Check environment variables
   - Ensure Node.js version is correct

2. If the build fails:
   - Clear `dist` directory
   - Remove `node_modules` and reinstall dependencies
   - Check for TypeScript errors

3. If API calls fail:
   - Check CORS configuration
   - Verify API permissions
   - Check database connection
   - Review error logs

## Maintenance
1. Regular updates:
   ```bash
   npm update
   ```

2. Database maintenance:
   - Regular backups
   - Index optimization
   - Query optimization

3. Monitoring:
   - Check application logs
   - Monitor database performance
   - Review error logs
   - Monitor API response times

## Security Considerations
- The application runs under the `deeprank` user
- HTTPS is enforced in production
- CORS is properly configured
- Content Security Policy is implemented
- API endpoints are protected
- Database credentials are secured
- Rate limiting is implemented
- Input validation is enforced

# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

```
yarn strapi deploy
```

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
