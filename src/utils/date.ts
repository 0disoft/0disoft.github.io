/**
 * 주어진 Date 객체를 "Month Day, Year" 형식의 문자열로 포맷합니다.
 * 예: 2023년 7월 14일 -> "July 14, 2023"
 * @param date - 포맷할 Date 객체
 * @returns 포맷된 날짜 문자열
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}