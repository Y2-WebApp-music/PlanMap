export const formatThaiDate = (inputDate ) => {
    // console.log('inputDate : ',{inputDate})
    const dateParts = inputDate.split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const thaiMonth = thaiMonths[parseInt(month, 10) - 1];

    return `${parseInt(day, 10)} ${thaiMonth} ${year}`;
};