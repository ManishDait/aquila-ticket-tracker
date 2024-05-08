export const formatDateTime = (str: string): string => {
    const date = new Date(str);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hours = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${min}, ${new Date(year, month - 1, day).toLocaleString('en-US', { month: 'long', day: 'numeric' })} ${year}`
}