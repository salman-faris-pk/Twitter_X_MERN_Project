import moment from 'moment';

export const formatPostDate = (createdAt) => {
    const currentDate = moment();
    const createdAtDate = moment(createdAt);

    const timeDifferenceInSeconds = currentDate.diff(createdAtDate, 'seconds');
    const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
    const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
    const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);

    if (timeDifferenceInDays > 1) {
        return createdAtDate.format('MMM DD');
    } else if (timeDifferenceInDays === 1) {
        return '1d';
    } else if (timeDifferenceInHours >= 1) {
        return `${timeDifferenceInHours}h`;
    } else if (timeDifferenceInMinutes >= 1) {
        return `${timeDifferenceInMinutes}m`;
    } else {
        return 'Just now';
    }
};

export const formatMemberSinceDate = (createdAt) => {
    const date = moment(createdAt);
    return `Joined ${date.format('MMMM YYYY')}`;
};
