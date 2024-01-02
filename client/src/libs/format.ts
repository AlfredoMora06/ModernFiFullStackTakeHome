// NOTE: amount MUST BE A NUMBER -- strings may not be formatted correctly
export const formatMoney = (amount: number): string => {
  let options: any = {
    style: "currency",
    currency: "USD",
  }
  const formatter = new Intl.NumberFormat("en-US", options)

  return formatter.format(amount)
}

export function formatDateTimeLongMonth(
  dateString: string, 
): string {
  const date = new Date(dateString)
  const dateLongOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }
  return date.toLocaleDateString("en-US", dateLongOptions)
}

export function formatDateTimeShort(
  dateString: Date, 
): string {
  const date = new Date(dateString)
  const dateShortOptions: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }
  return date.toLocaleDateString("en-US", dateShortOptions)
}