migrate((app) => {
    // conversations collection
    const conversations = new Collection({
        name: "conversations",
        type: "base",
        fields: [
            { name: "title", type: "text", required: true },
            { name: "user", type: "relation", required: true, collectionId: "_pb_users_auth_", cascadeDelete: true },
        ],
    })
    app.save(conversations)

    // messages collection
    const messages = new Collection({
        name: "messages",
        type: "base",
        fields: [
            { name: "conversation", type: "relation", required: true, collectionId: conversations.id, cascadeDelete: true },
            { name: "role", type: "text", required: true },
            { name: "content", type: "text", required: true },
        ],
    })
    app.save(messages)
})