export const formatTime = (f: any): string => {
    if (f < 10) {
        return f = "0".concat(f);
    }
    return f as string;
}

export interface ICountdown { min: string, sec: string, interval?: number }

const futureTime: number = 90000 + new Date().getTime()
export default function countdown(): ICountdown {
    const now  = new Date().getTime()
    const interval: number = futureTime - now
    const minutes: number = Math.floor((interval / 60) / 1000)
    const seconds: number = Math.floor((interval / 1000)  % 60)
    if (interval < 0) {
        return { min: formatTime(0), sec: formatTime(0), interval }
    }
    return { min: formatTime(minutes), sec: formatTime(seconds), interval }
}