export const formateDate = (picker: any) => {
  const date = new Date(picker);

  // Format the date and time
  const options: object = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  const formattedDateTime = date.toLocaleDateString('en-NZ', options);
  return formattedDateTime;
};
