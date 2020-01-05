export function CreateAccount(accountid, account, accountname) {
    return ({ accountid, account, accountname })
}
export function CreateCSI(csiid, csi, title) {
    return ({ csiid, csi, title })
}
export function makeID(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}