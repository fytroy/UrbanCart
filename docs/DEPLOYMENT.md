# Deployment Guide

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database backups configured
- [ ] SSL certificate ready
- [ ] Domain registered
- [ ] Email service configured
- [ ] CDN setup (optional)
- [ ] Monitoring tools configured

## Backend Deployment

### Option 1: Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
heroku login
```

2. **Create Heroku App**
```bash
cd server
heroku create urbancart-api
```

3. **Set Environment Variables**
```bash
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret_key
heroku config:set CLOUDINARY_NAME=your_cloudinary_name
# ... set all required variables
```

4. **Deploy**
```bash
git push heroku main
heroku logs --tail
```

### Option 2: AWS EC2

1. **Launch EC2 Instance**
- Ubuntu 20.04 LTS
- t2.micro or higher
- Security group: Allow ports 22, 80, 443

2. **Install Dependencies**
```bash
sudo apt update
sudo apt install nodejs npm mongodb-org
```

3. **Clone Repository**
```bash
git clone your-repo-url
cd server
npm install
```

4. **Configure Nginx**
```bash
sudo apt install nginx
# Configure proxy to Node.js
```

5. **Install PM2**
```bash
npm install -g pm2
pm2 start index.js --name urbancart-api
pm2 startup
pm2 save
```

6. **SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d api.yourdomain.com
```

### Option 3: DigitalOcean App Platform

1. **Connect Repository**
- Link GitHub account
- Select repository

2. **Configure App**
- Runtime: Node.js
- Build: `npm install`
- Run: `npm start`

3. **Environment Variables**
- Add all variables in App Platform console

4. **Deploy**
- Automatic deployment on git push

### Option 4: Railway

1. **Connect Project**
```bash
railway login
railway init
```

2. **Add Services**
```bash
railway add mongodb
```

3. **Configure**
- Set environment variables
- Configure build/start commands

4. **Deploy**
```bash
railway up
```

## Database Setup

### MongoDB Atlas

1. **Create Cluster**
- Visit mongodb.com/atlas
- Create free/paid cluster
- Configure security/backups

2. **Get Connection String**
```
mongodb+srv://username:password@cluster.mongodb.net/urbancart
```

3. **Set Environment Variable**
```bash
MONGODB_URI=mongodb+srv://...
```

### Backup Strategy

1. **Automated Backups**
- Enable MongoDB Atlas backup (daily)
- Retention: 7-90 days

2. **Manual Backups**
```bash
mongodump --uri="mongodb+srv://..." --out /backup/urbancart
mongorestore --uri="mongodb+srv://..." /backup/urbancart
```

## Frontend Deployment

### Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy Client**
```bash
cd client
vercel
```

3. **Configure Environment**
- Add `VITE_API_URL` in Vercel dashboard
- Example: `https://api.yourdomain.com/api`

4. **Domain Setup**
- Add custom domain in Vercel
- Configure DNS

### Netlify

1. **Connect Repository**
- Go to netlify.com
- Connect GitHub
- Select `client` directory

2. **Configure Build**
- Build command: `npm run build`
- Publish directory: `dist`

3. **Environment Variables**
- Add `VITE_API_URL`

4. **Deploy**
- Automatic on git push

### AWS S3 + CloudFront

1. **Create S3 Bucket**
```bash
aws s3 mb s3://urbancart-client
```

2. **Build and Upload**
```bash
npm run build
aws s3 sync dist/ s3://urbancart-client
```

3. **Configure CloudFront**
- Origin: S3 bucket
- Cache behavior: 24 hours

## Admin Dashboard Deployment

### Same as Frontend
- Deploy to separate subdomain (admin.yourdomain.com)
- Use Vercel, Netlify, or AWS

```bash
cd admin
vercel --prod
```

## Domain & DNS Configuration

### Example: GoDaddy/Namecheap

1. **Create DNS Records**
```
@ (root) → CNAME → api.yourdomain.com
www → CNAME → yourdomain.com
api → CNAME → urbancart-api.herokuapp.com
admin → CNAME → urbancart-admin.vercel.app
```

2. **SSL Certificate**
- Enable automatic SSL
- Use Let's Encrypt
- Certificate renewal (30 days before expiry)

## Monitoring & Logging

### Backend Monitoring

1. **Error Tracking: Sentry**
```bash
npm install @sentry/node
```

2. **Performance: New Relic**
```bash
npm install newrelic
```

3. **Logs: LogRocket or ELK**
```bash
npm install logrocket
```

### Frontend Monitoring

1. **Google Analytics**
```javascript
// Add to App.jsx
import ReactGA from 'react-ga4';
ReactGA.initialize('GA_MEASUREMENT_ID');
```

2. **Sentry Error Tracking**
```javascript
import * as Sentry from "@sentry/react";
Sentry.init({ dsn: "YOUR_SENTRY_DSN" });
```

## Email Configuration

### SendGrid

1. **Create Account**
- Visit sendgrid.com
- Verify sender domain

2. **Get API Key**
```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_USER=apikey
SMTP_PASS=SG.xxxxxx
```

### Gmail SMTP

1. **Enable Less Secure Apps**
- Go to Google Account settings
- Enable "Less secure app access"

2. **Get Credentials**
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Performance Optimization

### Image Optimization
```bash
# Using ImageMagick
convert original.jpg -resize 800x600 -quality 85 optimized.jpg
```

### Database Optimization
```javascript
// Create indexes
db.products.createIndex({ slug: 1 })
db.orders.createIndex({ user: 1, createdAt: -1 })
db.users.createIndex({ email: 1 })
```

### CDN Configuration
- Cloudinary for images
- CloudFront for static assets
- Cache headers: max-age=31536000

## Scaling Strategy

### Horizontal Scaling
1. Use load balancer (AWS ELB, Nginx)
2. Deploy multiple backend instances
3. Use managed database (MongoDB Atlas)
4. CDN for static assets

### Vertical Scaling
1. Increase server size
2. Optimize database queries
3. Implement caching (Redis)

## Database Connection Pool

```javascript
mongoose.connect(uri, {
  maxPoolSize: 10,
  minPoolSize: 5,
  retryWrites: true
});
```

## Disaster Recovery

### Backup & Recovery Plan

1. **Database Backups**
- Daily snapshots
- 30-day retention
- Test recovery monthly

2. **Code Repository**
- GitHub/GitLab
- Protected main branch
- Automated backups

3. **Configuration Backup**
- Environment files (encrypted)
- Database credentials
- SSL certificates

### Recovery Procedure

```bash
# Restore from backup
mongorestore --uri="mongodb+srv://..." /backup/urbancart

# Redeploy code
git clone repo
npm install
npm start

# Verify health
curl https://api.yourdomain.com/api/health
```

## Security in Production

1. **HTTPS/SSL**
- Certificate from Let's Encrypt
- Auto-renewal

2. **Firewall Rules**
- Allow only necessary ports
- IP whitelisting (admin panel)

3. **Database Security**
- IP whitelisting
- Strong passwords
- Encrypted connections

4. **Secrets Management**
- Use environment variables
- Don't commit secrets
- Rotate keys regularly

5. **DDoS Protection**
- Cloudflare or AWS Shield
- Rate limiting

## Cost Estimation

### Monthly Costs (Approximate)
- Heroku/Railway: $7-50+
- DigitalOcean: $5+
- MongoDB Atlas: Free - $50+
- Cloudinary: Free - $99+
- Domain: $10-15
- Email Service: Free - $20+
- CDN: $0.085/GB
- **Total**: $50-300+

## Post-Deployment Checklist

- [ ] All endpoints tested
- [ ] Analytics tracking working
- [ ] Email notifications sending
- [ ] Payment system configured
- [ ] Database backups running
- [ ] Monitoring alerts set
- [ ] Documentation updated
- [ ] Team trained
- [ ] Support system ready
- [ ] Marketing ready

---

**Last Updated**: December 2025
