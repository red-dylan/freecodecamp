var quoteArr = [
["These pretzels are making me thirsty.", "Kramer"],
["These pretzels are making me thirsty.", 'George Costanza'],
["These pretzels are making me thirsty.", "Jerry Seinfeld"],
["These pretzels are making me thirsty.", "Elaine Benes"],
["It became very clear to me sitting out there today that every decision I've made in my entire life has been wrong.", "George Costanza"],
["Yo Yo Ma", "Kramer"],
["You have the chicken, the hen, and the rooster. The chicken goes with the hen... So who is having sex with the rooster?", "Frank Costanza"],
["Jerry, just remember, it's not a lie if you believe it.", "George Costanza"],
["You know I always wanted to pretend I was an architect.", "George Costanza"],
["I'm speechless. I have no speech.", "George Costanza"],
["You know we're living in a society!", "George Costanza"],
["I want to make a good entrance. I never make good entrances.", "George Costanza"],
["Hello, Jerry.", "Newman"],
["Hello, Newman.", "Jerry Seinfeld"],
["Hi, my name is George, I'm unemployed and I live with my parents.", "George Costanza"],
["Just remember, when you control the mail, you control... information.", "Newman"],
["I don't think I've ever been to an appointment in my life where I wanted the other guy to show up.", "George Costanza"],
["See, this is what the holidays are all about. Three buddies sitting around chewing gum.", "Kramer"],
["Little Jerry Seinfeld. Yeah I named my chicken after you.", "Kramer"],
["Mulva?", "Jerry Seinfeld"],
["You very bad man, Jerry. Very bad man.", "Babu Bhatt"],
["You couldn't smooth a silk sheet if you had a hot date with a babe...I lost my train of thought.", "Frank Costanza"],
["Jerry, we have to have sex to save the friendship.", "Elaine Benes"],
["Sex to SAVE the friendship. Well if we have to, we have to.", "Jerry Seinfeld"],
["You’re through, Soup Nazi. Pack it up. No more soup for you. Next!", "Elaine Benes"],
["Are you telling me there’s not one condo available in all of Del Boca Vista?", "Frank Costanza"]
];

// make quoteButton call neQuote
document.getElementById("quoteButton").onclick = function () {newQuote()};
var currQuote = -1;
// newQuote func changes quote text
function newQuote() {
  var quoteSelect = Math.floor(Math.random() * quoteArr.length);
  if (quoteSelect === currQuote){ newQuote();}
  else {
    currQuote = quoteSelect;
    document.getElementById("quote").textContent = '" ' + quoteArr[quoteSelect][0] + ' "';
    document.getElementById("person").textContent = '- ' + quoteArr[quoteSelect][1];
       }
  tweetChange(currQuote);
};
//func to change tweet URL
function tweetChange(quoteIdx) {
  var tweetArr = quoteArr[quoteIdx].slice(0);
  var tweetStr = "";
  // Add " -" at index 1 of quote array and join to tweetStr
  tweetArr.splice(1, 0, " -");
  tweetStr = tweetArr.join("");
  //create tweet url
  document.getElementById("tweet-link").href="https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetStr);
}