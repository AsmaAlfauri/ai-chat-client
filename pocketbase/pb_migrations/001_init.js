/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
    // Skip if already exists
    try { app.findCollectionByNameOrId("conversations"); return; } catch (_) {}

    const conversations = new Collection({
        name: "conversations",
        type: "base",
        fields: [
            { name: "title", type: "text", required: true },
            {
                name: "user",
                type: "relation",
                required: true,
                collectionId: "_pb_users_auth_",
                cascadeDelete: true,
                maxSelect: 1,
            },
        ],
        listRule: "@request.auth.id != ''",
        viewRule: "@request.auth.id != ''",
        createRule: "@request.auth.id != ''",
        updateRule: "@request.auth.id != ''",
        deleteRule: "@request.auth.id != ''",
    })
    app.save(conversations)

    const messages = new Collection({
        name: "messages",
        type: "base",
        fields: [{
                name: "conversation",
                type: "relation",
                required: true,
                collectionId: conversations.id,
                cascadeDelete: true,
                maxSelect: 1,
            },
            { name: "role", type: "text", required: true },
            { name: "content", type: "text", required: true },
        ],
        listRule: "@request.auth.id != ''",
        viewRule: "@request.auth.id != ''",
        createRule: "@request.auth.id != ''",
        updateRule: "@request.auth.id != ''",
        deleteRule: "@request.auth.id != ''",
    })
    app.save(messages)
}, (app) => {
    try { const m = app.findCollectionByNameOrId("messages");
        app.delete(m) } catch (_) {}
    try { const c = app.findCollectionByNameOrId("conversations");
        app.delete(c) } catch (_) {}
})