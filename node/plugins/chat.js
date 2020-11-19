const fs = require('fs')
const { uuid } = require('uuidv4')

class ChatPlugin {
    checkUserExists(uid,directory) {
        const convoFolder = directory + '/conversations/'+uid
        const convoFile = directory + '/conversations/'+uid+'/chat_partners.json'
        if (!fs.existsSync(convoFolder)) {
            fs.mkdirSync(convoFolder)
        }
        if (!fs.existsSync(convoFile)) {
            fs.writeFileSync(convoFile, '[]')
        }
    }
    checkMessageExists(uid,id,directory) {
        if (id !== 'new-conversation') {
            const convoFile = directory + '/conversations/'+uid+'/'+id+'.json'
            if (!fs.existsSync(convoFile)) {
                fs.writeFileSync(convoFile, '[]')
            }
        }
    }
    startConversation(payload, directory) {
        for (let i in payload.participants) {
            const participant = payload.participants[i]
            this.checkUserExists(participant.sub, directory)
            const convoFile = directory + '/conversations/'+participant.sub+'/chat_partners.json'
            const newConvo = {
                id: payload.id,
                participants: payload.participants.map( item => { return item.sub }),
                action: Date.now(),
                subtitle: "New Conversation!",
                title: payload.participants.filter( item => {
                    return item.sub !== participant.sub
                }).map( item => { return item.username }).join(',')
            }

            var chatFile = require(convoFile)
            if (chatFile === 1) {
                chatFile = []
            }

            chatFile[chatFile.length] = newConvo

            fs.writeFileSync(convoFile, JSON.stringify(chatFile))
            this.checkMessageExists(participant.sub, payload.id, directory)
        }
        return true
    }
    updateChatPartners(file, id, message) {
        var convoFile = require(file)
        for (let i in convoFile) {
            if (convoFile[i].id === id) {
                convoFile[i].subtitle = message
                convoFile[i].action = Date.now()
            }
        }
        fs.writeFileSync(file, JSON.stringify(convoFile))

    }
    sendMessage(payload, directory) {
        for (let i in payload.conversation.participants) {
            const participant = payload.conversation.participants[i]
            const chatPath = directory + '/conversations/' + participant + '/' + payload.conversation.id + '.json'
            this.checkMessageExists(participant, payload.conversation.id, directory)
            const message = {
                from: payload.from,
                mid: payload.mid,
                message:payload.message,
                timestamp: Date.now(),
                seen: payload.seen
            }
            var chatFile = require(chatPath)
            chatFile[chatFile.length] = message
            fs.writeFileSync(chatPath, JSON.stringify(chatFile))

            const convoFile = directory + '/conversations/'+participant+'/chat_partners.json'
            this.updateChatPartners(convoFile, payload.conversation.id, payload.message)
        }
    }
}

module.exports = new ChatPlugin()