export default {
    baseRoleId: {},
    welcomeMsgTemplate:
        "Welcome to our family - `$SERVER$`, $MENTION$-sama.\nMay I lead you to the rules, $RULES$.",
    goodbyeMsgTemplate: "See you again, $MENTION$-sama.",
} as {
    baseRoleId: Record<string, string>
    welcomeMsgTemplate: string
    goodbyeMsgTemplate: string
}
