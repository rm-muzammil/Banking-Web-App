// src/lib/utils.ts
export function generateAccountNumber() {
    const prefix = "ACC";
    const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit number
    return `${prefix}${randomNum}`;
}
