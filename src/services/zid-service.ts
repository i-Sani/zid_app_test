import axios from 'axios';

export class ZidApiService {
    public static async getTokensByCode(code: string) {
        const url = `${process.env.ZID_AUTH_URL}/auth/token`;
        const requestBody = {
            grant_type: 'authorization_code',
            client_id: process.env.ZID_CLIENT_ID,
            client_secret: process.env.ZID_CLIENT_SECRET,
            redirect_uri: `${process.env.MY_BACKEND_URL}/zid/auth/callback`,
            code: code,
        };

        // Add detailed logging to troubleshoot the issue
        console.log('Attempting to fetch tokens with the following data:');
        console.log('URL:', url);
        console.log('Request Body:', requestBody);

        try {
            const response = await axios.post(url, requestBody);
            console.log('Token response:', response.data);  // Log the successful response
            return response.data;
        } catch (error) {
            // Log the error in more detail
            if (error.response) {
                console.error('Error fetching tokens, response from Zid:', error.response.data);  // Log response error details
            } else {
                console.error('Error fetching tokens:', error.message);  // Log general error message
            }
            throw new Error("Failed to retrieve tokens");
        }
    }

    public static async getMerchantProfile(managerToken: string, authToken: string) {
        const url = `${process.env.ZID_BASE_API_URL}/managers/account/profile`;
        const requestHeaders = {
            Authorization: `Bearer ${authToken}`,
            'X-Manager-Token': managerToken,
            Accept: 'application/json',
        };

        try {
            const response = await axios.get(url, { headers: requestHeaders });
            return response.data;
        } catch (e) {
            console.error(e);
        }
    }
}