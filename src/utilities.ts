export function filtered<S>(collections: Readonly<{ name: string;[key: string]: any }[]>, keyName: string): S {
    return collections.filter(item => item.name === keyName)[0].value
}
