
const connect = require('venom-bot');
const fs = require('fs');
const mime = require('mime-types');
const util = require('util')
const chalk = require('chalk')


connect
    .create({
        session: 'session',
        multidevice: true
    })
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro);
    });



function start(client) {
    try {
        client.onAnyMessage(message => {

        }),
            client.onMessage((message) => {

                var body = message.body
                var type = message.type
                var from = message.from
                var to = message.to
                var sender = message.sender.id.split('@c.us')
                var pushname = message.sender.pushname
                var contact = message.sender.formattedName

                const prefix = /^[°•π÷×¶∆£¢€¥®™=|~!#$%^&.?/\\©^z@,;]/.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™=|~!#$%^&.?/\\©^z,;]/gi) : '-'
                const chats = body.match(prefix) ? body.split(prefix).find((v) => v === body.replace(prefix, "")) : body
                const command = chats?.split(/ +/g)[0] || isOutCmd

                switch (command) {

                    case 'test':
                        client.sendText(from, "Welcome Prassz")
                        break
                    case 'list':
                        const list = [
                            {
                                title: "Pasta",
                                rows: [
                                    {
                                        title: "Ravioli Lasagna",
                                        description: "Made with layers of frozen cheese",
                                    }
                                ]
                            },
                            {
                                title: "Dessert",
                                rows: [
                                    {
                                        title: "Baked Ricotta Cake",
                                        description: "Sweets pecan baklava rolls",
                                    },
                                    {
                                        title: "Lemon Meringue Pie",
                                        description: "Pastry filled with lemonand meringue.",
                                    }
                                ]
                            }
                        ];

                        client.sendListMenu(from, 'Title', 'subTitle', 'Description', 'menu', list)
                            .then((result) => {
                                console.log('Result: ', result); //return object success
                            })
                            .catch((erro) => {
                                console.error('Error when sending: ', erro); //return object error
                            });
                        break
                    case 'button':
                        const buttons = [
                            {
                                "buttonText": {
                                    "displayText": "Text of Button 1"
                                }
                            },
                            {
                                "buttonText": {
                                    "displayText": "Text of Button 2"
                                }
                            }
                        ]
                        client.sendButtons(from, 'Title', buttons, 'Description')
                            .then((result) => {
                                console.log('Result: ', result); //return object success
                            })
                            .catch((erro) => {
                                console.error('Error when sending: ', erro); //return object error
                            });
                        break
                    case 'owner':
                        client
                            .sendContactVcard(from, '6283862323152@c.us', 'Squeezed')
                            .then((result) => {
                                console.log('Result: ', result); //return object success
                            })
                            .catch((erro) => {
                                console.error('Error when sending: ', erro); //return object error
                            });
                        break
                    case 'call':
                        client
                            .sendContactVcardList(from, [
                                '6283862323152@c.us',
                                to,
                            ])
                            .then((result) => {
                                console.log('Result: ', result); //return object success
                            })
                            .catch((erro) => {
                                console.error('Error when sending: ', erro); //return object error
                            });
                        break
                    case 'location':
                        client
                            .sendLocation(from, '-13.6561589', '-69.7309264', 'Brasil')
                            .then((result) => {
                                console.log('Result: ', result); //return object success
                            })
                            .catch((erro) => {
                                console.error('Error when sending: ', erro); //return object error
                            });
                        break
                    case 'ig':
                        client
                            .sendLinkPreview(
                                from,
                                'https://instagram.com/sgt_prstyo',
                                'Instragam Sigit Prasetyo'
                            )
                            .then((result) => {
                                console.log('Result: ', result); //return object success
                            })
                            .catch((erro) => {
                                console.error('Error when sending: ', erro); //return object error
                            });
                        break
                    case 'quoted':
                        client
                            .sendMessageOptions(
                                from,
                                'This is a reply!',
                                {
                                    quotedMessageId: reply,
                                }
                            )
                            .then((retorno) => {
                                resp = retorno;
                            })
                            .catch((e) => {
                                console.log(e);
                            });
                        break
                        case 'menu':
                            client
                            .sendText(from, `
test
button
list
owner
call
location
ig
quoted
`)
                            .then((result) => {
                              console.log('Result: ', result); //return object success
                            })
                            .catch((erro) => {
                              console.error('Error when sending: ', erro); //return object error
                            });
                        break

                    default:
                        if (message.body.startsWith('=>')) {
                            function Return(sul) {
                                sat = JSON.stringify(sul, null, 2)
                                bang = util.format(sat)
                                if (sat == undefined) {
                                    bang = util.format(sul)
                                }
                                client.sendText(message.from, bang)
                            }
                            try {
                                client.sendText(message.from, util.format(eval(`(async () => { return ${message.body.slice(3)} })()`)))
                            } catch (e) {
                                client.sendText(message.from, String(e))
                            }
                        }

                }

            })
    } catch (erro) {
        console.log(erro);
        client.sendText(message.from, util.format(erro));
    }
}





let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
}) 
