/**
 * website-check controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::website-check.website-check', ({ strapi }) => ({
  async create(ctx) {
    try {
      const { url, userEmail } = ctx.request.body.data;

      // Validate URL
      if (!url) {
        return ctx.badRequest('URL is required');
      }

      // Format URL if needed
      let formattedUrl = url.trim();
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = 'https://' + formattedUrl;
      }

      try {
        new URL(formattedUrl);
      } catch (e) {
        return ctx.badRequest('Invalid URL format');
      }

      // Get analysis results from service
      const analysisResults = await strapi.service('api::website-check.website-check').analyzeWebsite(formattedUrl);

      // Create the website check record with analysis results
      const entry = await strapi.entityService.create('api::website-check.website-check', {
        data: {
          url: formattedUrl,
          ...(userEmail && { userEmail }), // Only include email if it exists
          seoScore: analysisResults.seoScore,
          aeoScore: analysisResults.aeoScore,
          analysisResults: analysisResults.analysisResults,
          lastChecked: new Date().toLocaleDateString('en-CA'), // Format as YYYY-MM-DD without time
        },
      });

      // Return the created entry
      return {
        data: {
          id: entry.id,
          attributes: {
            url: entry.url,
            userEmail: entry.userEmail,
            seoScore: entry.seoScore,
            aeoScore: entry.aeoScore,
            analysisResults: entry.analysisResults,
            lastChecked: entry.lastChecked,
          },
        },
      };
    } catch (err) {
      console.error('Error in website check:', err);
      return ctx.badRequest('Failed to analyze website', { error: err.message });
    }
  },
}));
