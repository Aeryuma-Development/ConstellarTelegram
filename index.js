class ConstellarExtension {
  constructor() {
    this._events = {};
    this.version = "v1.0.0-telegram";
    this.mode = undefined;
    this.sector = undefined;
    this.protocol = undefined;
    this.status = undefined;
    this.ApiObj = undefined;
    this.databaseStart = undefined;
    this.systemStart = undefined;
    this.oniichan = [""] //Need Provided
  }
  open(client, tokenApi, mongoLink, status) {
    try {
      var axios = require("axios");
      if (!client) {
        throw 'Client Tidak Ditemukan'
      } else if (!tokenApi) {
        throw 'Token API Tidak Ditemukan'
      }
      const passcode = "rudalbakwancendolmanis"; //Permission Custom ID
      var oniichan = this.oniichan
      //Periksa Izin (Kalau Gak Bisa Ya Kepental 😌)


      //Config
      try {
        this.protocol = "AeryumaSactuanary-Devoid16";
        this.sector = "TelegramSectorProtocol";
        this.mode = 'Normal';
      } catch (err) {
        console.log(`[ERROR] Setup Gagal : ${err}`)
      }

      //Constellar Obj
      this.ApiObj = null
      this.start = Date.now()
      console.log(`[START] Constellar Extension Aeryuma ${this.version}`)

      //Format Start :v
      var Waktu = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
      var date = new Date(Waktu)
      var jam = date.getHours()
      var menit = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
      var detik = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
      var listhari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
      var listbulan = [
          "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
          ]
      var hari = date.getDay()
      var bulan = date.getMonth()
      var format = `${listhari[hari]}, ${date.getDay()} ${listbulan[bulan]} ${date.getFullYear} | ${jam}:${menit}:${detik}`
      //Langsung Gasken :v
      console.log(`
[INFO] Open Constellar 
    ====================================
    Constellar Inugaku (Discord)
    ${format}
    ------------------------------------
    • Node : ${process.version}
    • Constellar : ${this.version}
    • Discord.js : ${require('discord.js').version}
    Dev : Kanaka Nakazawa
    ××××××××××××××××××××××××××××××××××××
    Username : ${client.user.username}
    ID : ${client.user.id}
    Shard : ${this.shard}
    //Shard
    Servers : ${client.guilds.cache.size}
    Members : ${client.users.cache.size}
    Channels : ${client.channels.cache.size}
    ====================================
    ©AeryumaDevelopment`)

      this.systemStart = Date.now();
      console.log('[SETUP] Constellar Disetel Dalam Mode "Normal"')
      console.log('[SETUP] Bahasa Menggunakan Bahasa Indonesia (Kecuali Eror Menggunakan Bahasa Inggris)')

      //Pengecekan Tahap 1
      if (this.status === null || undefined) {
        console.log('(System) Status Tidak Terdaftar')
        return process.exit()
      }
      /*=================
      Uptime
      ===================*/
      var express = require('express')
      var app = express()
      app.get('/', (req, res) => res.sendStatus(200))
      app.listen(process.env.PORT)
      /*=================
      API Get
      ===================*/


      try {
        axios.get('http://AeryumaNoriyomi.nekokawaikanaka.repl.co').then(x => {
          console.log('[INFO] API Connected (JsonObjAPI)...')
          if (x.data === undefined || null) return console.log("[ERROR] Gomenne Oniichan, Ternyata API Menghasilkan undefined / null")
          this.ApiObj = x.data
          client.things = x.data
          client.things.this = x.data.bot.find(x => x.id = client.user.id)
        }).catch(function(error) {
          return console.log(`[ERROR] ApiError (JsonObjAPI) : Gagal Terhubung... Return`)
        })
      } catch (err) {
        console.log(`[ERROR] ApiError (JsonObjAPI) ${err}`)
      }

      setInterval(function() {
        try {
          axios.get('http://AeryumaNoriyomi.nekokawaikanaka.repl.co').then(x => {
            console.log('[INFO] API Restarting..')

            if (x.data === undefined || null) return console.log("[ERROR] Gomenne Oniichan, Ternyata API Menghasilkan undefined / null")
            this.ApiObj = x.data
            client.things = x.data
            client.things.this = x.data.bot.find(x => x.id = client.user.id)
          }).catch(function(error) {
            return console.log(`[ERROR] ApiError (JsonObjAPI) : Gagal Terhubung... Return`)
          })
        } catch (err) {
          console.log(`[ERROR] ApiError (JsonObjAPI) : ${err}`)
        }
      }, 30000)

      //Database Dari .env
      const mongoose = require('mongoose')
      if (!mongoLink) {
        console.log('Login Tanpa Database, Isi Dulu mongoLinknya Kakak 😌')
      } else {
        try {
          this.databaseStart = Date.now()
          mongoose.connect(
            mongoLink, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true }
          );
          mongoose.connection.on('open', () => {
            console.log(`[INFO] Database Connected (Mongoose)`);
          });
          mongoose.connection.on('error', err => {
            console.log("[DATABASE] Error :" + err);
          });
        } catch (err) {
          console.log('[INFO] Database Failed to Connect (Mongoose) :\n\n' + err)
        }

      }

      //Ya Gak Tau Sih...
      const snek = require('node-superfetch');
      client.hastebin = async text => {
        const { body } = await snek
          .post('https://bin-clientdev.glitch.me/documents')
          .send(text);
        return `https://bin-clientdev.glitch.me/${body.key}`;
      };

    } catch (err) {
      console.log(`[ERROR] Eror : ${err}`)
      process.exit()
    }
  }
  //Need Perombakan
  /*setCommandHandling(client) {
    var axios = require('axios')
    //Slash Command
    client.on('interactionCreate', async (interaction) => {
      try {
        var oniichan = this.oniichan;
        const { MessageEmbed } = require("discord.js")

        //========================= C O M M A N D C H E C K
        if (!interaction.isCommand()) return;
        let cmd = interaction.commandName
        let command = await client.commands.get(cmd);
        if (!command) {
          try {
            try { cmd = interaction.options.getSubcommandGroup() } catch { cmd = interaction.options.getSubcommand() }
          } catch (err) {
            console.log("[ERROR] Sebelumnya Ada Eror Kakak :" + err)
          }
        }
        command = await client.commands.get(cmd)
        if (!command) return;
        const Embed = new MessageEmbed()
          .setTitle("Wait a moment..")
          .setDescription('Maybe 0.5 Seconds Or More')
          .setColor("RANDOM")
        interaction.reply({ embeds: [Embed] })


        setTimeout(function(constellar) {
          var dev = oniichan;
          if (command.ownerOnly) {
            if (!dev.includes(interaction.user.id)) return this.respondError(interaction, sentence.owner).reply();
          };

          //======================== P E R M I S S I O N
          if (command.disable) {
            if (!dev.includes(interaction.user.id)) return this.respondError(interaction, "This Command Is Disable").reply();
          }
          if (command.premiumOnly) {
            if (!dev.includes(interaction.user.id)) return this.respondMembership(interaction)
          }
          if (command.betaOnly) {
            if (!dev.includes(interaction.user.id)) return this.respondError(interaction, "This command can only be used by users who have registered with the early access program").reply();
          }

          if (command.botPermission) {
            const Permissions = command.botPermission.filter(x => !interaction.guild.me.permission.has(x)).map(x => "`" + x + "`")
            if (Permissions.length) return interaction.reply(`Oniichan, Give Me Permisions ${Permissions.join(", ")} To Execute This Command!`)
          }

          if (command.authorPermission) {
            const Permissions = command.authorPermission.filter(x => !interaction.member.permission.has(x)).map(x => "`" + x + "`")
            if (Permissions.length) return interaction.reply(`Oniichan Baka!!, You need ${Permissions.join(", ")} Permissions To Execute This Command!`)
          }

          if (command.nsfw) {
            if (!interaction.channel.nsfw) {
              return this.respondNsfw(interaction)
            }
          }

          //Run Command
          var constellar = this;
          if (command) {
            command.run(client, interaction, constellar).catch(err => {
              return this.respondError(interaction, "System Error :" + err).reply()
            })
          }
        }.bind(this), 1250)
      } catch (err) {
        return console.log("[RETURN] Kak, Bot Melompati Perintah Ini Karena Terlambat Merespon :)")
      }
    });
  }*/
  setMode(mode) {
    try {
      if (!this.mode) {
        throw 'Kakak, Kamu Belum Menyalakan Constellar Sama Sekali'
      }

      if (mode === 1 || "Slyph") {
        `[SETUP] Constellar Disetel Dalam Mode Slyph`
        this.mode = "Slyph"
      }
    } catch (err) {
      console.log(`[ERROR] Eror Terdeteksi Kak : ${err}`)
    }
  }

  exit() {
    try {
      if (!this.mode) throw 'Kakak, Kamu Belum Menyalakan Constellar Sama Sekali'
      "[INFO] Mematikan Host / IDE Beserta Constellar"
      client.destroy()
      process.exit()
    } catch (err) {
      `[ERROR] Constellar Gagal Dimatikan, Saranku Matikan Secara Paksa Kak\n\n ${err}`
    }
  }

  on(name, listener) {
    if (!this._events[name]) {
      this._events[name] = [];
    }

    this._events[name].push(listener);
  }

  removeListener(name, listenerToRemove) {
    if (!this._events[name]) {
      throw new Error(`Can't remove a listener. Event "${name}" doesn't exits.`);
    }

    const filterListeners = (listener) => listener !== listenerToRemove;

    this._events[name] = this._events[name].filter(filterListeners);
  }

  emit(name, data) {
    if (!this._events[name]) {
      throw new Error(`Can't emit an event. Event "${name}" doesn't exits.`);
    }

    const fireCallbacks = (callback) => {
      callback(data);
    };

    this._events[name].forEach(fireCallbacks);
  }

  ping() {
    try {
      if (!this.mode) {
        throw 'Kakak, Kamu Belum Menyalakan Constellar Sama Sekali'
      }
      var start = Date.now()
      var end = Date.now()
      return (end - start).toString + 'ms'
    } catch (err) {
      `[ERROR] Eror Terdeteksi Kak : ${err}`
    }
  }
  respondMembership(interaction) {
    var text = `**Missing Access**
    Sorry, This Command Can Only Be Used For Premium Members  Sorry, This Command Can Only Be Used For Premium Members. Go To [Help Center](https://discord.gg/https://discord.gg/PRNEggfpYw) For More Information`
    //Need Provided
  }

  respondError(msg, text) {
    var text = `**Error Respond**\n${text}`
    //Need Provided
  }

  parseDuration(time, lang) {
    //============ •••• ==========
    //Maksimal Tiap Waktu

    var rawms = 1000 //ms
    var rawdetik = 60 //detik
    var rawmenit = 60 //menit
    var rawjam = 24 //jam

    //============ •••• ==========
    //Perhitungan

    var detik = Math.floor(time / rawms);
    if (detik > rawdetik) detik = Math.floor(detik % rawdetik)

    var menit = Math.floor(time / (rawms * rawdetik));
    if (menit > rawmenit) menit = Math.floor(menit % rawmenit)

    var jam = Math.floor(time / (rawms * rawdetik * rawmenit));
    if (jam > rawjam) jam = Math.floor(jam % rawjam)

    var hari = Math.floor(time / (rawms * rawdetik * rawmenit * rawjam))
    //============ •••• ==========
    //Pengkondisian

    var data = `${hari} Days ${jam} Hours ${menit} Minutes ${detik} Seconds`
    if (lang === "en" || undefined || null || "english") {
      return data
    } else if (lang === "id" || "indonesia") {
      data = `${hari} Hari ${jam} Jam ${menit} Menit ${detik} Detik`
      return data
    }
  }

  get(url) {
    var axios = require('axios')
    return axios.get(url).then(x => x.data)
  }
}

module.exports = ConstellarExtension
