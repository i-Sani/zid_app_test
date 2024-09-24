import { Request, Response } from 'express';

export function zidAuthRedirect(req: Request, res: Response) {
  const queries = new URLSearchParams({
    client_id: process.env.ZID_CLIENT_ID,
    redirect_uri: `${process.env.MY_BACKEND_URL}/zid/auth/callback`,
    response_type: 'code'
  });
  
  const authUrl = `${process.env.ZID_AUTH_URL}/oauth/authorize?${queries}`;
  res.redirect(authUrl);
}

export default zidAuthRedirect;
  // export const zidAuthRedirect = (req, res, next) => {
//     try {
//         const queries = new URLSearchParams({
//             client_id: process.env.ZID_CLIENT_ID,
//             redirect_uri: `${process.env.MY_BACKEND_URL}/zid/auth/callback`,
//             response_type: 'code',
//         });

//         const authUrl = `${process.env.ZID_AUTH_URL}/oauth/authorize?${queries}`;

//         console.log('Zid Auth Redirect - Environment variables:');
//         console.log('ZID_CLIENT_ID:', process.env.ZID_CLIENT_ID);
//         console.log('MY_BACKEND_URL:', process.env.MY_BACKEND_URL);
//         console.log('ZID_AUTH_URL:', process.env.ZID_AUTH_URL);
//         console.log('Constructed Auth URL:', authUrl);

//         return res.redirect(authUrl);
//     } catch (error) {
//         console.error('Error in zidAuthRedirect:', error);
//         return res.status(500).json({ error: 'Internal server error during redirect', details: error.message });
//     }
// };

//https://zid-authentication-test-b9e04d3a5911.herokuapp.com/zid/auth/callback?code=def502004b0a2f5aaba912cf25aa37998340041017bf43ede4fc6e4f7ff3dbf7f589c4165599cbfadac07fdf285d705a8530c5712415e98c99fbcb96ce867f44a4097edc53c1884df6001b9ffbee0f3d86c52953fd3f7b4c60167b62c5d6740bd78d4df665421bbd69ca0fab29bd9e0598c37f74ad494a6c45d895b80a5a527c200173e1f7404a73e32fe257cc2db1ac0f6b9baf69576bed2311a701804042339c0a7b66a357774825fc00d4bf8fe10c1970a366f25883a1bca0e9651102156100368b9cc5e1c7212dda0b62fe39e6064d6673460d411438d8e676f5942fad2c8737f1bb98e640c9236c07b8af34ced7b68bdd2e685ffe43ccff712c0ad3e5fdfa8e627bac2fe7212a9eb8de85583f1a59a8cfcf641e7ff9a4a128fba0e1d81f23b4909ae64100a0cc38623f311832259bc8df589d090c555166622c22f10904e99b5614cca2ace0b28ee34668f7da81d2a57c575510523b7846bd52948b31f5b120ad542ad88a546d0f2ff895b1766fd0f9900f51a3bc713884a0aa7dd9407e4e0745290c4c1a5df2f061b9ae11dfd7c3c187f871e3ca62af8134484481b40996fdda728d4016f4014a7bd029fb1807a146a2443ef9be5771d1e1fe5489757287c07f770c47188d062fdd4dd7760300a8292f8412dd9005d10d1d5f11e0c27d51c92b4ece17a71a6a27d42390c86cfe47ed928ec679d948b7a8d9058f48774a0905d09aae56e16c86ff0f0f86a162bed31a4465ed2c3e080ae4421cdecf814136d0142392bc3449f1e7c649482fdc256d82f092a63eadd89ad4855cb0b48280badfcd0e346445a52592a78c8dc4ab189e7892f5d6670d4313c378fd5e399e3961e8a59b7d2cc4734379dabd49bee3ce761658b14ef92b9380f8a6db3206763c36440dbe6cf0ee09b8b32a586700b5a92281b79bf4408aa9821328c5a22d44ab3adb1077ec74543cf07a50d52bd7fe502d590d8863bc1728a91ecf9e02705c199b915fa0520766cc1abdc0981ae2d46856c8b9026b7ada31d05fb6801d87931fc729bd0cd63b89e7079a1128cdba61166466308f9bb0fdc8237dd2cfcae129c0308c4053eada14e70c0c3ee88414f08ab1cf823f6b205262111e22403588658f722606fe9ec12aa02ac7677ac60cfd6704e004b4f500b9ddc557a3463ef743fd6c2118f19d9698841506d9a24708112b1d04b151ad29bd7c3a617aa1536c6a2f74367bfbcfc2796a513ed8bc3c1cdbc89c8cedb6c824d398b7292cfe234b8300b27420b548227d1989d510e857147a74ef35d9cf1c4f8224b534d8f6c1c793fc1228a32bf390ae382e22d07bc0581614779ddc2d39784aceb11ac9448b7f24cc7e1283ebe42d122002cdbaef6ca74e543ed5fe3107c2eba76beb30fd4640d8502b95b9155f1776ea4dacfac1278fb0c01e3f735a676faa704899455363ddf7cd81191949b96e74a8b9ba9b37409cbb11eaacf393724f80fbc7d23acfed4b48e3dbb72d27c72e60694f3728db8be050ee6c54e18004e723fae84a59e526867cb75e846fbfe1a610b1bb6df88a26e33ca25279f9f12a6648e3d96020006ddba92934c2c34de42053dbe390c5258ad4187f84e0aca161eede240826e33feb408b72480b99394dad0ecd5103