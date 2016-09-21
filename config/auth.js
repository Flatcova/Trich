// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '122795888178850', // your App ID
        'clientSecret'  : '06b3dee149a8eda263a881151e932dbf', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'L1LZASfV55TdcKgp5PiXHQvt8',
        'consumerSecret'    : 'ObQVZ7jlVz8cHiV2W3nELaQZhAgAr1Q2mU8AJ98W2ZZGEVwvcb',
        'callbackURL'       : 'http://localhost:3000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '668415300177-24gqu1umtos6a5o19f7ve4kn9fri00bl.apps.googleusercontent.com',
        'clientSecret'  : '0IgohWAvHMWSw1_1aCqqM6Nk',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};