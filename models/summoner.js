const axios = require('axios')
const dotenv = require('dotenv')
const result = dotenv.config()
const Summoner = require('./book.js')

const base_api_url = "https://na1.api.riotgames.com/lol"
const match_api_url = "/match/v3/matchlists/by-account"
const summ_api_url = "/summoner/v3/summoners/by-name"
const API_KEY = "?api_key=RGAPI-6b36012a-5e7f-45ea-8213-a32afa65f87d"

let client = {
  // {matches: [{}]}
  matchListByAccountId: function(account_id) {
    let url = `${base_api_url}${match_api_url}/${account_id}${API_KEY}`
    console.log("API REQ: ", url)
    return axios.get(url)
  },
  // {accountId: ...}
  accountBySummonerName: function(summoner_name) {
      return Summoner.find({name: summoner_name, ttl: { $gt: Date.now() }}).limit(1).select('accountId').then((summFound) => {
            if (summFound.length > 0) {
                console.log(summFound, 'Found summoner in db')
                return Promise.resolve(summFound[0].accountId)
            } else {
                let url = `${base_api_url}${summ_api_url}/${summoner_name}${API_KEY}`
                console.log("API REQ: ", url)
                return new Promise(function(resolve, reject) {
                    axios.get(url).then((body) => {
                            Summoner.create({name: summoner_name, accountId: body.data.accountId}, (error, summoner) => {
                                if (error) {console.log(error, "SHIT BROKE TRYING TO CREATE MODEL")}
                                console.log(summoner, "Stored summoner in DB")
                                resolve(body.data.accountId)
                        })
                    }).catch((err) => { reject(err) })
                })
            }
        })
  }
}

module.exports = client;
