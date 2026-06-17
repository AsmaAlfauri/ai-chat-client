/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
    // conversations collection
    const conversations = new Collection({
        name: "conversations",
        type: "base",
        fields: [{
                name: "title",
                type: "text",
                required: true,
            },
            {
                name: "user",
                type: "relation",
                required: true,
                collectionId: "_pb_users_auth_",
                cascadeDelete: true,
            },
        ],
        listRule: "@request.auth.id != ''",
        viewRule: "@request.auth.id != ''",
        createRule: "@request.auth.id != ''",
        updateRule: "@request.auth.id != ''",
        deleteRule: "@request.auth.id != ''",
    })
    app.save(conversations)

    // messages collection
    const messages = new Collection({
        name: "messages",
        type: "base",
        fields: [{
                name: "conversation",
                type: "relation",
                required: true,
                collectionId: conversations.id,
                cascadeDelete: true,
            },
            {
                name: "role",
                type: "text",
                required: true,
            },
            {
                name: "content",
                type: "text",
                required: true,
            },
        ],
        listRule: "@request.auth.id != ''",
        viewRule: "@request.auth.id != ''",
        createRule: "@request.auth.id != ''",
        updateRule: "@request.auth.id != ''",
        deleteRule: "@request.auth.id != ''",
    })
    app.save(messages)
}, (app) => {
    // revert
    const messages = app.findCollectionByNameOrId("messages")
    app.delete(messages)

    const conversations = app.findCollectionByNameOrId("conversations")
    app.delete(conversations)
})