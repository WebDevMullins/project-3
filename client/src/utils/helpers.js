import dayjs from 'dayjs'

export function dateFormat(date) {
	return dayjs(date / 1).format('MMM DD, YYYY')
}
