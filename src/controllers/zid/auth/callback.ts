// @ts-nocheck
import {ZidApiService} from "../../../services/zid-service";
export const zidAuthCallback = async (req, res) => {
    try {
      const zidCode = req.query.code;
      
      // Retrieve merchant tokens
      const merchantTokens = await ZidApiService.getTokensByCode(zidCode);
      
      const managerToken = merchantTokens.access_token;
      const authToken = merchantTokens.authorization;
      const refreshToken = merchantTokens.refresh_token;
  
      // Check if the user already exists in the database
      let user = await UserService.getUserByZidToken(managerToken);
      
      if (!user) {
        const zidMerchantDetails = await ZidApiService.getMerchantProfile(managerToken, authToken);
        // Create user from Zid merchant details response
        user = await UserService.createUserFromZidDetails(zidMerchantDetails, managerToken, authToken, refreshToken);
      } else {
        // Update existing user's tokens
        await UserService.updateUserTokens(user.id, managerToken, authToken, refreshToken);
      }
  
      // Set session or JWT token here if you're using session-based or token-based authentication
      
      // Redirect the user to your application dashboard.
      return res.redirect(process.env.DASHBOARD_URL);
    } catch (error) {
      console.error('Error in Zid auth callback:', error);
      return res.status(500).json({ error: 'Authentication failed' });
    }
  };
  