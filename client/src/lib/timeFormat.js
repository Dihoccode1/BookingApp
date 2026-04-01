const timeFormat = (minutes) => {
    const hour = Math.floor(minutes / 60);
    const minuteRemainder = minutes % 60;
    return `${hour} giờ ${minuteRemainder} phút`;
}
export default timeFormat;