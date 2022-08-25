export default {
    botBaseroleId: {},
    userBaseroleId: {},
    welcomeMessageTemplate:
        "Welcome to our family - `$SERVER$`, $MENTION$-sama.\nMay I lead you to the rules, $RULES$.",
    goodbyeMsgTemplate: "See you again, $MENTION$-sama.",
} as {
    userBaseroleId: Record<string, string>
    botBaseroleId: Record<string, string>
    welcomeMessageTemplate: string
    goodbyeMsgTemplate: string
}
