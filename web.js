const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client();

bot.login(botconfig.token);
bot.on("ready", async () => {
  console.log(`${bot.user.username} 봇이 정상적으로 켜졌습니다.`);
  let activNum = 1;
  setInterval(function() {
      if (activNum === 1) {
        bot.user.setActivity("봇을 멘션하여 자동전산체계 이용 가능");
        activNum = 2;
    } else if (activNum === 2) {
        bot.user.setActivity("#국토부_봇 게시판에서 이용방법/현재상황 등 확인 가능");
        activNum = 3;
    } else if (activNum === 3) {
        bot.user.setActivity("문의/버그제보: @JinseoMyeon#0303")
        activNum = 1;
    }
}, 10000);
});

bot.on("message", async message => {
  if(message.author.bot) return;

  let messageArray = message.content.split(" ");
  let contents = message.content.toString();
  let cmd = messageArray[0];
  let args = messageArray.slice();
  let bicon = bot.user.displayAvatarURL;
  let client = message.channel.client;
  function delay (delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
  }
 if (message.isMentioned(client.users.get('756897703182729378'))) {
    let main = new Discord.RichEmbed()
    .setTitle("[행신서버 국토부 자동전산체계]")
    .setDescription("안녕하세요, **행신서버 국토부**에서 운영하는 **자동전산체계**입니다.\n아래 항목 중에서 **원하시는 내용**을 이모지로 선택해주세요.\n\n> :one: : 도시 신청\n> :two: : 신도시 지정 신청\n> :three: : 현재 진행중인 청장/공사장 출마\n> :four: : 국토부 민원/건의 접수")
    .setThumbnail(bicon)
    .setColor("0E8C8C")
    .setFooter("2분간 아무 응답이 없을 시 신청이 취소됩니다.")
    .setTimestamp();
    message.author.send(main).then(msg => {
    msg.react('1️⃣').then(() => msg.react('2️⃣')).then(() => msg.react('3️⃣')).then(() => msg.react('4️⃣'));
  })
 }
})