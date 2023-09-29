/**
 * @param {*} date
 * @returns the difference between the current time and provided time
 */
export default function formatTimeAgo(date) {
    const timeDifference = Date.now() - new Date(date);
    const minutes = Math.floor(timeDifference / (1000 * 60));
    if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        if (hours >= 24) {
            const days = Math.floor(hours / 24);
            return `${days} day${days === 1 ? '' : 's'}`;
        }
        return `${hours} hour${hours === 1 ? '' : 's'}`;
    }
    return `${minutes} minute${minutes === 1 ? '' : 's'}`;
}
