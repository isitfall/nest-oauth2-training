export const encodeToUrlEncoded = (data: Object) => {
    const temp = [];

    for (const key in data) {
        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent(data[key]);

        temp.push(`${encodedKey}=${encodedValue}`);
    }

    return temp.join('&');
}