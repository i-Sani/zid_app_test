import axios from 'axios';

export class ZidApiService {
    public static async getTokensByCode(code: string) {
        const url = `${process.env.ZID_AUTH_URL}/oauth/token`;
        const requestBody = {
            grant_type: 'authorization_code',
            client_id: process.env.ZID_CLIENT_ID,
            client_secret: process.env.ZID_CLIENT_SECRET,
            redirect_uri: `${process.env.BASE_URL}/zid/auth/callback`,
            code: code,
        };
        try {
            console.log('Sending request to:', url);
            console.log('Request body:', JSON.stringify(requestBody, null, 2));
            const response = await axios.post(url, requestBody);
            console.log('Response:', JSON.stringify(response.data, null, 2));
            return response.data;
        } catch (error) {
            console.error('Error getting tokens:', error.response?.data || error.message);
            return {
                status: 'error',
                message: error.response?.data || error.message
            };
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
