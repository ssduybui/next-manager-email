export const ValidateDomain = (domain: string | null | undefined) => {
    const inputDomain = domain;
    const domainRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9-\/]*)?$/;
    if (typeof inputDomain === "string") {
        return domainRegex.test(inputDomain);
    } else {
        return false;
    }
}

export const TotalDateInMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];
    for (let date = new Date(firstDay); date <= lastDay; date.setDate(date.getDate() + 1)) {
        const day = date.getDate();
        const monthFormatted = String(date.getMonth() + 1).padStart(2, '0');
        const yearFormatted = date.getFullYear();
        /* const formattedDate = `${yearFormatted}-${monthFormatted}-${day.toString().padStart(2, '0')}`; */
        const formattedDate = `${day.toString().padStart(2, '0')}`;
        days.push(formattedDate);
    }

    return days;
}