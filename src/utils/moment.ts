import moment from "moment";

const getDate = (): string => moment().format("YYYY-MM-DD");

const getTime = (): string => moment().format("mm:ss");
const getDateTime = (): string => moment().format("YYYY-MM-DD hh:mm:ss");
const getDateTimeByDate = (shit: Date): string =>
  moment(shit).format("YYYY-MM-DD hh:mm:ss");

const getParsedDate = (arg: Date): string => moment(arg).format("YYYY-MM-DD");

const getFormat = (format: string): string => moment().format(format);

const getKoreanDateTime = (arg: Date): string =>
  moment(arg).format("YYYY[년] MM[월] DD[일] HH[:]mm");

const getWeekNo = (v_date_str: string): number => {
  var date = new Date();
  if (v_date_str) {
    date = new Date(v_date_str);
  }
  return Math.ceil(date.getDate() / 7);
};

const weekNumberByMonth = (dateFormat: string): number => {
  const inputDate = new Date(dateFormat);

  // 인풋의 년, 월
  let year = inputDate.getFullYear();
  let month = inputDate.getMonth() + 1;

  // 목요일 기준 주차 구하기
  const weekNumberByThurFnc = (paramDate: Date) => {
    const year = paramDate.getFullYear();
    const month = paramDate.getMonth();
    const date = paramDate.getDate();

    // 인풋한 달의 첫 날과 마지막 날의 요일
    const firstDate = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDate.getDay() === 0 ? 7 : firstDate.getDay();
    const lastDayOfweek = lastDate.getDay();

    // 인풋한 달의 마지막 일
    const lastDay = lastDate.getDate();

    // 첫 날의 요일이 금, 토, 일요일 이라면 true
    const firstWeekCheck =
      firstDayOfWeek === 5 || firstDayOfWeek === 6 || firstDayOfWeek === 7;
    // 마지막 날의 요일이 월, 화, 수라면 true
    const lastWeekCheck =
      lastDayOfweek === 1 || lastDayOfweek === 2 || lastDayOfweek === 3;

    // 해당 달이 총 몇주까지 있는지
    const lastWeekNo = Math.ceil((firstDayOfWeek - 1 + lastDay) / 7);

    // 날짜 기준으로 몇주차 인지
    let weekNo: any = Math.ceil((firstDayOfWeek - 1 + date) / 7);

    // 인풋한 날짜가 첫 주에 있고 첫 날이 월, 화, 수로 시작한다면 'prev'(전달 마지막 주)
    if (weekNo === 1 && firstWeekCheck) weekNo = "prev";
    // 인풋한 날짜가 마지막 주에 있고 마지막 날이 월, 화, 수로 끝난다면 'next'(다음달 첫 주)
    else if (weekNo === lastWeekNo && lastWeekCheck) weekNo = "next";
    // 인풋한 날짜의 첫 주는 아니지만 첫날이 월, 화 수로 시작하면 -1;
    else if (firstWeekCheck) weekNo = weekNo - 1;

    return weekNo;
  };

  // 목요일 기준의 주차
  let weekNo = weekNumberByThurFnc(inputDate);

  // 이전달의 마지막 주차일 떄
  if (weekNo === "prev") {
    // 이전 달의 마지막날
    const afterDate = new Date(year, month - 1, 0);
    year = month === 1 ? year - 1 : year;
    month = month === 1 ? 12 : month - 1;
    weekNo = weekNumberByThurFnc(afterDate);
  }
  // 다음달의 첫 주차일 때
  if (weekNo === "next") {
    year = month === 12 ? year + 1 : year;
    month = month === 12 ? 1 : month + 1;
    weekNo = 1;
  }

  return weekNo;
};

const daysBetween = function daysBetween(date1: Date, date2: Date): number {
  // 24시간(1일)을 밀리초로 계산
  const oneDay = 1000 * 60 * 60 * 24;

  // 두 날짜 사이의 밀리초 차이를 계산
  const diffInMs = Math.abs(date1.getTime() - date2.getTime());

  // 밀리초 차이를 하루 단위로 변환하여 반환
  return Math.floor(diffInMs / oneDay);
};

export {
  getDate,
  getTime,
  getFormat,
  getParsedDate,
  weekNumberByMonth,
  getKoreanDateTime,
  getDateTime,
  daysBetween,
  getDateTimeByDate,
};
