module.exports = {

    addLinkOpenedEmail(body, campaign, lead) {
        const linkTrack = `http://${process.env.APP_URL}/tracks/open/campaign/${campaign}/lead/${lead}`;
        body += `<img src="${linkTrack}">`;
        return body;
    },

    addLinkClickedLinkEmail(body, campaign, lead) {
        const regex = /<a href="(.*?)"|<a href='(.*?)'/g;
        const linkTrack = `http://${process.env.APP_URL}/tracks/click/campaign/${campaign}/lead/${lead}/`;
        body = body.replace(regex, `<a href=\"${linkTrack}link\/$1$2\"`);
        return body;
    
    }

}